import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

const RRP_COLOR = '#072830';
const MARKET_COLOR = '#a7a593';

export const PriceOverTimeAnimation = ({ loadTooltipData, ...props }: any) => {
    const ref = useRef<any>();
    const [open, setOpen] = React.useState(false);
    const [tooltipData, setTooltipData]: [any, any] = useState(null);

    function cb(dataset: any): void {
        var parseTime = d3.timeParse('%Y-%m-%d');

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

        const svg = d3
            .select<any, any>(ref.current)
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)
            // .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

        const stage = svg
            .append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        var formatMillisecond = d3.timeFormat(".%L"),
            formatSecond = d3.timeFormat(":%S"),
            formatMinute = d3.timeFormat("%I:%M"),
            formatHour = d3.timeFormat("%I %p"),
            formatDay = d3.timeFormat("%a %d"),
            formatWeek = d3.timeFormat("%b %d"),
            formatMonth = d3.timeFormat("%b"),
            formatYear = d3.timeFormat("%Y");

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
        const x = stage.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${dimensions.boundedHeight})`).call(xAxis);

        //y axis
        //formatting
        var en_GB = {
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["£", ""],
        } as any;
        var localisedFormatter = d3.formatLocale(en_GB);
        const formatWithLocalisedValues = localisedFormatter.format("$,.2r");

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

        const y = stage.append('g').attr('class', 'y-axis').call(yAxis);
        
        const dataArea = stage.append('g')
            .attr('class', 'data');

        const lineArea = stage.append('g')
            .attr('class', 'line-data');

        const tooltipArea = stage.append('g')
            .attr('class', 'tooltip-area');

        const tt: Element = ref.current.nextSibling.firstChild;

        const drawTooltipIdentifierLine = (data: any) => {
            tooltipArea
                .selectAll('.grid-line--tooltip')
                .data([data])
                .join((enter) => {
                    return enter.append('line')
                        .attr('class', 'grid-line grid-line--tooltip')
                        .attr('x1', '0')
                        .attr('x2', '0')
                        .attr('y1', '0')
                        .attr('y2', dimensions.boundedHeight)
                        .attr('opacity', 0);
                }, (update) => {
                    return update
                        .attr('y2', dimensions.boundedHeight);
                }, (exit) => {
                    return exit.remove();
                });
        };

        const drawTooltipAreas = (data: any) => {
            tooltipArea
                .selectAll('.hover-area')
                .data(data)
                .join((enter) => {
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
                        .on('mousemove touchmove', function (event: MouseEvent, d) {
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
                }, (update) => {
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
                }, (exit) => {
                    return exit.remove();
                });
        };

        const drawArea = (data: any) => {
            const area = d3.area()
                .curve(d3.curveBumpX)
                .x((d: any) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                .y0((d: any) => yScale(yExtent[0]))
                .y1((d: any) => yScale(yAccessor1(d)));

            dataArea.selectAll('.area-u').data([data]).join((enter) => {
                enter.append('path')
                    .attr('class', 'area-u')
                    .attr('fill', '#ffffff')
                    .attr('d', (d) => area(d));

                enter.append('path')
                    .attr('class', 'area')
                    .attr('fill', `url('#hatchMarket')`)
                    .attr('opacity', '0.5')
                    .attr('d', (d) => area(d));

                return enter.append('path')
                    .attr('class', 'area-fade')
                    .attr('fill', `url('#hatchFade')`)
                    .attr('opacity', '0.75')
                    .attr('d', (d) => area(d))
            }, (update) => {
                update.select('.area-u').attr('d', (d) => area(d));
                update.select('.area').attr('d', (d) => area(d));
                return update.select('.area-fade').attr('d', (d) => area(d));
            }, (exit) => {
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

            lineArea.selectAll('.line-1').data([data]).join((enter) => {
                return enter.append('path')
                    .attr('class', 'line-1')
                    .attr('d', (d: any) => line1(d))
                    .attr('fill', 'transparent')
                    .attr('opacity', '1')
                    .attr('stroke', `${MARKET_COLOR}`)
                    .attr('stroke-width', '2.5px')
            }, (update) => {
                return update;
            }, (exit) => {
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

            lineArea.selectAll('.line-2').data([data]).join((enter) => {
                return enter.append('path')
                    .attr('class', 'line-2')
                    .attr('d', (d: any) => line2(d))
                    .attr('fill', 'transparent')
                    .attr('pointer-events', 'none')
                    .attr('opacity', '0.8')
                    .attr('stroke', `${RRP_COLOR}`)
                    .attr('stroke-width', '2.5px')
            }, (update) => {
                return update;
            }, (exit) => {
                return exit.remove();
            });

            //Dots
            lineArea.selectAll('.dots').data(data).join((enter) => {
                enter.append('circle')
                    .attr('class', 'dots')
                    .attr('fill', `url('#goldGradient')`)
                    .attr('cx', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d) => yScale(yAccessor1(d)))
                    .attr('r', '4');

                return enter.append('circle')
                    .attr('class', 'dots dots-sub')
                    .attr('fill', 'white')
                    .attr('cx', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d) => yScale(yAccessor1(d)))
                    .attr('r', '2');
            }, (update) => {
                return update;
            }, (exit) => {
                return exit.remove();
            });

            lineArea.selectAll('.dots-2').data(data).join((enter) => {
                enter.append('circle')
                    .attr('class', 'dots-2')
                    .attr('fill', `url('#greenGradient')`)
                    .attr('cx', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d) => yScale(yAccessor2(d)))
                    .attr('r', '4');

                return enter.append('circle')
                    .attr('class', 'dots-2 dots-2-sub')
                    .attr('fill', 'white')
                    .attr('cx', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
                    .attr('cy', (d) => yScale(yAccessor2(d)))
                    .attr('r', '2');
            }, (update) => {
                return update;
            }, (exit) => {
                return exit.remove();
            });
        };

        const drawLegend = (data: any) => {
            const legend = svg
                .append('g')
                .classed('legend', true);

            var keys = ['RRP', 'Market Price']

            var color = d3.scaleOrdinal()
                .domain(keys)
                .range([`${RRP_COLOR}`, `url('#hatchMarket')`]);
            var textColor = d3.scaleOrdinal()
                .domain(keys)
                .range([`${RRP_COLOR}`, `${MARKET_COLOR}`]);

            legend.selectAll('.legend-item')
                .data(keys)
                .join((enter) => {
                    const item = enter.append('g').attr('class', 'legend-item');

                    item.append('text')
                        .attr('class', 'legend-label')
                        .attr('x', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - 75 + (i * 50))
                        .attr('y', (d: any, i) => { return yScale(yExtent[0]) + 75 })
                        .style('fill', (d: any) => {
                            return textColor(d) as string;
                        })
                        .text((d) => d)
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
                }, (update) => {
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
                }, (exit) => {
                    return exit.remove();
                });
        };

        drawArea(dataset);
        drawLines(dataset);
        drawTooltipIdentifierLine(dataset);
        drawTooltipAreas(dataset);
        drawLegend(dataset);
    };

    useEffect(() => {
        const data: any[] = [
            { date: '2018-06-01', price: 9000, rrp: 8000 },
            { date: '2018-07-01', price: 8250, rrp: 8000 },
            { date: '2018-08-01', price: 8500, rrp: 8000 },
            { date: '2018-09-01', price: 9500, rrp: 8000 },
            { date: '2018-10-01', price: 7500, rrp: 8000 },
            { date: '2018-11-01', price: 5999, rrp: 8000 },
            { date: '2018-12-01', price: 8500, rrp: 8000 },
            { date: '2019-01-01', price: 7500, rrp: 8000 },
            { date: '2019-02-01', price: 8000, rrp: 8000 },
            { date: '2019-03-01', price: 9000, rrp: 8000 },
            { date: '2019-04-01', price: 11000, rrp: 8000 },
            { date: '2019-05-01', price: 11250, rrp: 8000 },
            { date: '2019-06-01', price: 12000, rrp: 8000 },
            { date: '2019-07-01', price: 12100, rrp: 8000 },
            { date: '2019-08-01', price: 12200, rrp: 10000 },
            { date: '2019-09-01', price: 12500, rrp: 10000 },
            { date: '2019-10-01', price: 15000, rrp: 10000 },
            { date: '2019-11-01', price: 15500, rrp: 10000 },
            { date: '2019-12-01', price: 15250, rrp: 10000 },
            { date: '2020-01-01', price: 15000, rrp: 10000 },
            { date: '2020-02-01', price: 16000, rrp: 10000 },
            { date: '2020-03-01', price: 17000, rrp: 10000 },
            { date: '2020-04-01', price: 18500, rrp: 13500 },
            { date: '2020-05-01', price: 17500, rrp: 13500 },
            { date: '2020-06-01', price: 20600, rrp: 13500 },
        ];
        cb(data);
    });

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
