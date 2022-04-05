import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

const RRP_COLOR = '#072830';
const MARKET_COLOR = '#a7a593';

export const PriceOverTimeAnimation = ({ data, loadTooltipData, ...props }: any) => {
    console.log('PriceOverTimeAnimation');
    
    const ref = useRef<any>();
    // const [open, setOpen] = React.useState(false);
    // const [tooltipData, setTooltipData]: [any, any] = useState(null);

    let parseTime = d3.timeParse('%Y-%m-%d');
    const xAccessor = (d: any): any => parseTime(d.date);
    const yAccessor1 = (d: any) => d.price;
    const yAccessor2 = (d: any) => d.rrp;

    //2: Setup boundaries
    const width = 1000;
    let dimensions: any = {
        width: width,
        height: 400,
        margin: {
            top: 35,
            right: 10,
            bottom: 50,
            left: 50,
        },
    };

    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom;

    var formatMillisecond = d3.timeFormat(".%L"),
        formatSecond = d3.timeFormat(":%S"),
        formatMinute = d3.timeFormat("%I:%M"),
        formatHour = d3.timeFormat("%I %p"),
        formatDay = d3.timeFormat("%a %d"),
        formatWeek = d3.timeFormat("%b %d"),
        formatMonth = d3.timeFormat("%b"),
        formatYear = d3.timeFormat("%Y");

    //formatting
    var en_GB = {
        "decimal": ".",
        "thousands": ",",
        "grouping": [3],
        "currency": ["£", ""],
    } as any;
    var localisedFormatter = d3.formatLocale(en_GB);
    const formatWithLocalisedValues = localisedFormatter.format("$,.2r");

    useEffect(() => {
        console.log('initChart');
        initChart();
    }, []);

    useEffect(() => {
        console.log('updateChart');
        updateChart(data);
    }, [data]);

    function initChart() {
        const svg = d3
            .select<any, any>(ref.current)
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)
        // .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

        const stage = svg
            .append('g')
            .attr('class', 'stage')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        const xAxis = stage.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${dimensions.boundedHeight})`);
        const yAxis = stage.append('g').attr('class', 'y-axis');
        const dataArea = stage.append('g')
            .attr('class', 'data');
        const lineArea = stage.append('g')
            .attr('class', 'line-data');
        const tooltipArea = stage.append('g')
            .attr('class', 'tooltip-area');
        const legend = svg
            .append('g')
            .classed('legend', true);
    };

    function updateChart(dataset: any): void {
        const st: any = d3.select(ref.current);
        const stage = st.select('.stage');
        const x = stage.select('.x-axis');
        const y = stage.select('.y-axis');
        const dataArea = stage.select('.data');
        const lineArea = stage.select('.line-data');
        const tooltipArea = stage.select('.tooltip-area');
        const legend = st.select('.legend');

        function multiFormat(date: any) {
            return (d3.timeSecond(date) < date ? formatMillisecond
                : d3.timeMinute(date) < date ? formatSecond
                    : d3.timeHour(date) < date ? formatMinute
                        : d3.timeDay(date) < date ? formatHour
                            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                : d3.timeYear(date) < date ? formatMonth
                                    : formatYear
            )(date);
        };

        //x axis
        const xScale: any = d3.scaleBand()
            .range([0, dimensions.boundedWidth])
            .domain(dataset.map(xAccessor));
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(multiFormat)
            .tickPadding(10);
        x.call(xAxis);

        //y axis
        const ySpreadData = [...dataset.map(yAccessor1)];
        const yExtent = d3.extent(ySpreadData) as any;
        let yScale = d3.scaleLinear().domain(yExtent).range([dimensions.boundedHeight, 0]).nice();
        const roundedHigh = yScale.domain()[1];
        //Reset the domain to make sure the lower is clamped, but the higher is rounded
        yScale = yScale.domain([yExtent[0], roundedHigh]);

        const yAxis = d3.axisLeft(yScale).tickFormat((v: any) => {
            let formattedValue: any = v;
            if (v > 999 && v < 100000) {
                if (v % 1000 < 50) {
                    formattedValue = localisedFormatter.format('$,.0s')(v);
                } else {
                    formattedValue = localisedFormatter.format('$,.2s')(v);
                }
            } else if (v >= 100000) {
                formattedValue = localisedFormatter.format('$,.3s')(v);
            };

            return `${formatWithLocalisedValues(v)}`;
        }).tickSizeInner(-dimensions.boundedWidth);

        y.call(yAxis);
        
        const tt: Element = ref.current.nextSibling.firstChild;

        const drawTooltipIdentifierLine = (data: any) => {
            tooltipArea
                .selectAll('.grid-line--tooltip')
                .data([data])
                .join((enter: any) => {
                    return enter.append('line')
                        .attr('class', 'grid-line grid-line--tooltip')
                        .attr('x1', '0')
                        .attr('x2', '0')
                        .attr('y1', '0')
                        .attr('y2', dimensions.boundedHeight)
                        .attr('opacity', 0);
                }, (update: any) => {
                    return update
                        .attr('y2', dimensions.boundedHeight);
                }, (exit: any) => {
                    return exit.remove();
                });
        };

        const drawTooltipAreas = (data: any) => {
            tooltipArea
                .selectAll('.hover-area')
                .data(data)
                .join((enter: any) => {
                    return enter.append('rect')
                        .classed('hover-area', true)
                        .attr('fill', () => {
                            return 'rgba(0,0,0,0)';
                        })
                        .attr('width', () => {
                            return xScale.bandwidth();
                        })
                        .attr('height', () => {
                            return dimensions.boundedHeight;
                        })
                        .attr('x', (d: any) => {
                            return xScale(xAccessor(d)) as any;
                        })
                        .attr('y', () => {
                            return 0;
                        })
                        .on('mouseover touchstart', function (event: MouseEvent, d: any) {
                            const { width, height } = tt.getBoundingClientRect();
                            const touchPosition = d3.pointer(event);
                            const xPos = touchPosition[0];
                            const yPos = touchPosition[1];

                            loadTooltipData(d);
                            tt.classList.add('tooltip--show');

                            (tt as any).style.transform = `translate(${xPos + dimensions.margin.right + dimensions.margin.left - (width / 2)}px, ${yPos - (height / 2)}px)`;

                            d3
                                .select('.grid-line--tooltip')
                                .attr('opacity', 1)
                                .raise()
                                .attr('x1', (xScale(xAccessor(d)) as any) + xScale.bandwidth() / 2)
                                .attr('x2', (xScale(xAccessor(d)) as any) + xScale.bandwidth() / 2);
                        })
                        .on('mousemove touchmove', function (event: MouseEvent, d: any) {
                            const touchPosition = d3.pointer(event);
                            const xPos = touchPosition[0];
                            const yPos = touchPosition[1];
                            const { width, height } = tt.getBoundingClientRect();

                            (tt as any).style.transform = `translate(${xPos + dimensions.margin.right + dimensions.margin.left - (width / 2)}px, ${yPos - (height / 2)}px)`;

                            d3
                                .select('.grid-line--tooltip')
                                .attr('opacity', 1)
                                .raise()
                                .attr('x1', (xScale(xAccessor(d)) as any) + xScale.bandwidth() / 2)
                                .attr('x2', (xScale(xAccessor(d)) as any) + xScale.bandwidth() / 2);
                        })
                        .on('mouseleave touchleave', function () {
                            tt.classList.remove('tooltip--show');
                           
                            d3
                                .select('.grid-line--tooltip')
                                .attr('opacity', 0);
                        });
                }, (update: any) => {
                    return update.attr('width', () => {
                        return xScale.bandwidth();
                    })
                    .attr('width', () => {
                        return xScale.bandwidth();
                    })
                    .attr('height', () => {
                        return dimensions.boundedHeight;
                    })
                    .attr('x', (d: any) => {
                        return xScale(xAccessor(d)) as any;
                    })
                }, (exit: any) => {
                    return exit.remove();
                });
        };

        const drawArea = (data: any) => {
            const area = d3.area()
                .curve(d3.curveBumpX)
                .x((d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                .y0((d: any) => yScale(yExtent[0]))
                .y1((d: any) => yScale(yAccessor1(d)));

            dataArea.selectAll('g').data([data]).join((enter: any) => {
                const g = enter;

                const group = g.append('g');

                group.append('path')
                    .attr('class', 'area area-u')
                    .attr('fill', '#ffffff')
                    .attr('d', (d: any) => area(d));

                group.append('path')
                    .attr('class', 'area area-d')
                    .attr('fill', `url('#hatchMarket')`)
                    .attr('opacity', '0.5')
                    .attr('d', (d: any) => area(d));

                group.append('path')
                    .attr('class', 'area area-fade')
                    .attr('fill', `url('#hatchFade')`)
                    .attr('opacity', '0.75')
                    .attr('d', (d: any) => area(d));

                return group;
            }, (update: any) => {
                console.log(update);
                const u = update;
                
                u.select('.area-u').attr('d', (d: any) => area(d));
                u.select('.area-d').attr('d', (d: any) => area(d));
                u.select('.area-fade').attr('d', (d: any) => area(d));

                return u;
            }, (exit: any) => {
                exit.remove();
            });
        };

        const drawLines = (data: any) => {
            const line1 = d3.line()
                .curve(d3.curveBumpX)
                .defined((d: any) => {
                    return d && Boolean(d.price);
                })
                .x((d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                .y((d: any) => yScale(yAccessor1(d)));

            lineArea.selectAll('.line-1').data([data]).join((enter: any) => {
                return enter.append('path')
                    .attr('class', 'line-1')
                    .attr('d', (d: any) => line1(d))
                    .attr('fill', 'transparent')
                    .attr('opacity', '1')
                    .attr('stroke', `${MARKET_COLOR}`)
                    .attr('stroke-width', '2.5px')
            }, (update: any) => {
                return update.attr('d', (d: any) => line1(d));
            }, (exit: any) => {
                return exit.remove();
            });

            //rrp line
            const line2 = d3.line()
                .curve(d3.curveBumpX)
                .defined((d: any) => {
                    return d && Boolean(d.rrp);
                })
                .x((d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                .y((d: any) => yScale(yAccessor2(d)));

            lineArea.selectAll('.line-2').data([data]).join((enter: any) => {
                return enter.append('path')
                    .attr('class', 'line-2')
                    .attr('d', (d: any) => line2(d))
                    .attr('fill', 'transparent')
                    .attr('pointer-events', 'none')
                    .attr('opacity', '0.8')
                    .attr('stroke', `${RRP_COLOR}`)
                    .attr('stroke-width', '2.5px')
            }, (update: any) => {
                return update.attr('d', (d: any) => line2(d));
            }, (exit: any) => {
                return exit.remove();
            });

            //Dots
            lineArea.selectAll('.dots').data(data).join((enter: any) => {
                return enter.append('circle')
                    .attr('class', 'dots')
                    .attr('stroke', `url('#goldGradient')`)
                    .attr('stroke-width', `2px`)
                    .attr('fill', `#ffffff`)
                    .attr('cx', (d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d: any) => yScale(yAccessor1(d)))
                    .attr('r', '4');
            }, (update: any) => {
                return update
                    .attr('cx', (d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d: any) => yScale(yAccessor1(d)));
            }, (exit: any) => {
                return exit.remove();
            });

            lineArea.selectAll('.dots-2').data(data).join((enter: any) => {
                return enter.append('circle')
                    .attr('class', 'dots-2')
                    .attr('fill', `#ffffff`)
                    .attr('stroke', `url('#greenGradient')`)
                    .attr('stroke-width', `2px`)
                    .attr('cx', (d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d: any) => yScale(yAccessor2(d)))
                    .attr('r', '4');
            }, (update: any) => {
                return update
                    .attr('cx', (d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d: any) => yScale(yAccessor2(d)));
            }, (exit: any) => {
                return exit.remove();
            });
        };

        const drawLegend = (data: any) => {
            var keys = ['RRP', 'Market Price']

            var color = d3.scaleOrdinal()
                .domain(keys)
                .range([`${RRP_COLOR}`, `url('#hatchMarket')`]);
            var textColor = d3.scaleOrdinal()
                .domain(keys)
                .range([`${RRP_COLOR}`, `${MARKET_COLOR}`]);

            legend.selectAll('.legend-item')
                .data(keys)
                .join((enter: any) => {
                    const item = enter.append('g').attr('class', 'legend-item');

                    item.append('text')
                        .attr('class', 'legend-label')
                        .attr('x', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - 75 + (i * 50))
                        .attr('y', (d: any, i: any) => { return yScale(yExtent[0]) + 75 })
                        .style('fill', (d: any) => {
                            return textColor(d) as string;
                        })
                        .text((d: any) => d)
                        .attr('text-anchor', 'left')
                        .style('alignment-baseline', 'middle');

                    return item.append('circle')
                        .attr('class', 'legend-dot')
                        .attr('cx', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - 85 + (i * 50))
                        .attr('cy', (d: any, i: any) => { return yScale(yExtent[0]) + 75 })
                        .attr('r', 7)
                        .style('fill', (d: any) => {
                            return color(d) as string;
                        });
                }, (update: any) => {
                    const group = update.selectAll('.legend-item') as any;
                    const labels = group.selectAll('.legend-label') as any;
                    const dots = group.selectAll('.legend-dot') as any;

                    labels.text((d: any) => d)
                        .attr('x', (d: any, i: number) => xScale(xAccessor(dataset[dataset.length - 1])) - 75 + (i * 50))
                        .attr('y', (d: any, i: number) => { return yScale(yExtent[0]) + 75 })
                        .style('fill', (d: any) => {
                            return textColor(d) as string;
                        });

                    dots.attr('cx', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - 85 + (i * 50))
                        .attr('cy', (d: any, i: any) => { return yScale(yExtent[0]) + 75 })
                        .style('fill', (d: any) => {
                            return color(d) as string;
                        });

                    return group;
                }, (exit: any) => {
                    return exit.remove();
                });
        };

        drawArea(dataset);
        drawLines(dataset);
        drawTooltipIdentifierLine(dataset);
        drawTooltipAreas(dataset);
        drawLegend(dataset);
    };

    return (
        <div style={{
            position: 'relative',
            textAlign: 'center'
        }}>
            <svg ref={ref}>
                <defs>
                    <linearGradient id="goldGradient">
                        <stop offset="0%" stopColor={MARKET_COLOR} />
                        <stop offset="100%" stopColor={MARKET_COLOR} />
                    </linearGradient>
                    <linearGradient id="greenGradient">
                        <stop offset="0%" stopColor={RRP_COLOR} />
                        <stop offset="100%" stopColor={RRP_COLOR} />
                    </linearGradient>
                    <linearGradient id="hatchFade" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#ffffff" stop-opacity="0" />
                        <stop offset="50%" stopColor="#ffffff" stop-opacity="0" />
                        <stop offset="100%" stopColor="#ffffff" stop-opacity="1" />
                    </linearGradient>
                    <pattern id="hatchMarket" width="3" height="3" patternTransform="rotate(205)" patternUnits="userSpaceOnUse">
                        <rect width="2" height="3" style={{fill: '#a7a593'}}></rect>
                    </pattern>
                    <pattern id="hatchRrp" width="3" height="3" patternTransform="rotate(205)" patternUnits="userSpaceOnUse">
                        <rect width="2" height="3" style={{ fill: '#a7a593' }}></rect>
                    </pattern>
                </defs>
            </svg>

            {props.children}
        </div>
    )
}
