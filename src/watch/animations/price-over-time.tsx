import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ENTERING } from 'react-transition-group/Transition';
import { debug } from '../../shared/debug/debug';

export const PriceOverTimeAnimation = (props: any) => {
    console.log('PriceOverTimeAnimation');
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
            // .attr('width', dimensions.width)
            // .attr('height', dimensions.height)
            .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

        const stage = svg
            .append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        //x axis
        const xExtent = d3.extent(dataset.map(xAccessor)) as any;
        const xScale = d3.scaleTime().domain(xExtent).range([0, dimensions.boundedWidth])
        const xAxis = d3.axisBottom(xScale);
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
        const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.boundedHeight, 0])
        //.nice();
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
        });
        const y = stage.append('g').attr('class', 'y-axis').call(yAxis);
        
        const gridArea = stage.append('g')
            .attr('class', 'grid');

        const dataUnderlayArea = stage.append('g')
            .attr('class', 'data-underlay');

        const dataArea = stage.append('g')
            .attr('class', 'data');

        const lineArea = stage.append('g')
            .attr('class', 'line-data');

        const tooltipArea = stage.append('g')
            .attr('class', 'tooltip');

        //grid
        gridArea.selectAll('.grid-line').data(dataset).join((enter) => {
            return enter.append('line')
                .attr('class', 'grid-line')
                .attr('x1', (d: any) => xScale(xAccessor(d)))
                .attr('x2', (d: any) => xScale(xAccessor(d)))
                .attr('y1', (d: any) => 0)
                .attr('y2', (d: any) => dimensions.boundedHeight)
                .attr('opacity', '1')
                .attr('stroke', '#edf1f5')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        // dataArea.selectAll('.grid-line-2').data(dataset).join((enter) => {
        //     return enter.append('line')
        //         .attr('class', 'grid-line-2')
        //         .attr('x1', (d: any) => 0)
        //         .attr('x2', (d: any) => dimensions.boundedWidth)
        //         .attr('y1', (d: any) => yScale(yAccessor1(d)))
        //         .attr('y2', (d: any) => yScale(yAccessor1(d)))
        //         .attr('opacity', '1')
        //         .attr('stroke', '#edf1f5')
        // }, (update) => {
        //     return update;
        // }, (exit) => {
        //     return exit;
        // });

        //zero line
        // dataArea.selectAll('.zero-line').data([dataset]).join((enter) => {
        //     return enter.append('line')
        //         .attr('class', 'zero-line')
        //         .attr('stroke', '#dee2e7')
        //         .attr('x1', '0')
        //         .attr('x2', dimensions.boundedWidth)
        //         .attr('y1', yScale(RRP))
        //         .attr('y2', yScale(RRP))
        // })

        //generate gradient
        // stage.selectAll('#myGradient2').data([dataset]).join((enter) => {
        //     const linearG = enter
        //         .append('defs')
        //         .append('linearGradient')
        //         .attr('id', 'myGradient2')
        //         .attr('gradientTransform', 'rotate(90)')
        //         .attr('x1', '0%')
        //         .attr('x2', '100%')
        //         .attr('y1', '0') //must the the same value to fade the graidient at the right point
        //         .attr('y2', '0'); //must the the same value to fade the graidient at the right point

        //     //top
        //     linearG.append('stop')
        //         .attr('offset', '0%')
        //         .attr('stop-opacity', '1')
        //         .attr('stop-color', '#4FB12C')

        //     function getPercentbetweenRanges(x: number, min: number, max: number) {
        //         const HIGH_PERCENT = 100;
        //         const percentify = d3.format('.0%');
        //         const pointInRange = ((x - min) / (max - min));
        //         const res = (HIGH_PERCENT - (pointInRange * HIGH_PERCENT)) / HIGH_PERCENT;
        //         return percentify(res);
        //     }

        //     linearG.append('stop')
        //         .attr('offset', `${getPercentbetweenRanges(RRP, yExtent[0], yExtent[1])}`)
        //         .attr('stop-opacity', '1')
        //         .attr('stop-color', 'white')

        //     //end
        //     linearG.append('stop')
        //         .attr('offset', '100%')
        //         .attr('stop-opacity', '1')
        //         .attr('stop-color', '#6D214F')

        //     return linearG;
        // });

        // const area = d3.area()
        //     .x((d: any) => xScale(xAccessor(d)))
        //     .y0((d: any) => yScale(RRP))
        //     .y1((d: any) => yScale(yAccessor1(d)));

        // dataArea.selectAll('.area').data([dataset]).join((enter) => {
        //     return enter.append('path')
        //         .attr('class', 'area')
        //         .attr('fill', 'transparent')
        //         .attr('fill', 'url(#myGradient2)')
        //         // .attr('clip-path', 'url(#svgPath)')
        //         .attr('d', (d) => area(d))
        // });








        //new area
        const area = d3.area()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(xAccessor(d)))
            .y0((d: any) => yScale(yExtent[0]))
            .y1((d: any) => yScale(yAccessor1(d)));

        dataUnderlayArea.selectAll('.area-u').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area-u')
                .attr('fill', '#ffffff')
                .attr('d', (d) => area(d))
        })
        
        dataArea.selectAll('.area').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area')
                .attr('fill', `url('#hatchMarket')`)
                // .attr('fill', '#FE7701')
                .attr('opacity', '0.5')
                .attr('d', (d) => area(d))
                // .on('mouseenter', (e, d) => {
                //     d3.select(e.target).attr('opacity', 0.9).raise();
                // })
                // .on('mouseleave', (e, d) => {
                //     d3.select(e.target).attr('opacity', 0.5).lower();
                // });
        });

        dataArea.selectAll('.area-fade').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area-fade')
                .attr('fill', `url('#hatchFade')`)
                .attr('opacity', '0.75')
                .attr('d', (d) => area(d))
            // .on('mouseenter', (e, d) => {
            //     d3.select(e.target).attr('opacity', 0.9).raise();
            // })
            // .on('mouseleave', (e, d) => {
            //     d3.select(e.target).attr('opacity', 0.5).lower();
            // });
        });

        // const area2 = d3.area()
        //     .curve(d3.curveBumpX)
        //     .x((d: any) => xScale(xAccessor(d)))
        //     .y0((d: any) => yScale(yExtent[0]))
        //     .y1((d: any) => yScale(yAccessor2(d)));

        // dataUnderlayArea.selectAll('.area-u-2').data([dataset]).join((enter) => {
        //     return enter.append('path')
        //         .attr('class', 'area2')
        //         .attr('fill', '#ffffff')
        //         .attr('d', (d) => area2(d))
        // })
        // dataArea.selectAll('.area2').data([dataset]).join((enter) => {
        //     return enter.append('path')
        //         .attr('class', 'area2')
        //         .attr('fill', 'transparent' || `url('#blueGradient')`)
        //         // .attr('fill', '#1B57C2')
        //         .attr('opacity', '0.5')
        //         .attr('d', (d) => area2(d))
        //         .on('mouseenter', (e, d) => {
        //             d3.select(e.target).attr('opacity', 0.9).raise();
        //         })
        //         .on('mouseleave', (e, d) => {
        //             d3.select(e.target).attr('opacity', 0.5).order();
        //         });
        // });




        //Lines
        const line1 = d3.line()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(xAccessor(d)))
            .y((d: any) => yScale(yAccessor1(d)));

        dataArea.selectAll('.line-1').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'line-1')
                .attr('d', (d: any) => line1(d))
                .attr('fill', 'transparent')
                .attr('opacity', '1')
                .attr('stroke', '#a7a593')
                .attr('stroke-width', '2.5px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        //rrp line
        const line2 = d3.line()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(xAccessor(d)))
            .y((d: any) => yScale(yAccessor2(d)));

        dataArea.selectAll('.line-2').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'line-2')
                .attr('d', (d: any) => line2(d))
                .attr('fill', 'transparent')
                .attr('pointer-events', 'none')
                .attr('opacity', '0.8')
                .attr('stroke', '#195649')
                .attr('stroke-width', '2.5px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });



        //Dots
        dataArea.selectAll('.dots').data(dataset).join((enter) => {
            enter.append('circle')
                .attr('class', 'dots')
                // .attr('fill', '#FE7701')
                .attr('fill', `url('#goldGradient')`)
                .attr('cx', (d) => xScale(xAccessor(d)))
                .attr('cy', (d) => yScale(yAccessor1(d)))
                .attr('r', '4');

            return enter.append('circle')
                .attr('class', 'dots dots-sub')
                .attr('fill', 'white')
                .attr('cx', (d) => xScale(xAccessor(d)))
                .attr('cy', (d) => yScale(yAccessor1(d)))
                .attr('r', '2');
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        dataArea.selectAll('.dots-2').data(dataset).join((enter) => {
             enter.append('circle')
                .attr('class', 'dots-2')
                 .attr('fill', `url('#greenGradient')`)
                // .attr('fill', '#1B57C2')
                .attr('cx', (d) => xScale(xAccessor(d)))
                .attr('cy', (d) => yScale(yAccessor2(d)))
                .attr('r', '4');

            return enter.append('circle')
                .attr('class', 'dots-2 dots-2-sub')
                .attr('fill', 'white')
                .attr('cx', (d) => xScale(xAccessor(d)))
                .attr('cy', (d) => yScale(yAccessor2(d)))
                .attr('r', '2');
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });


    //     .domain([...data.map(d => xAccessor(d))])
    // .range([0, dimensions.boundedWidth]).paddingInner(0.02);

        // const enterTransition = (enter: any): any => {
        //     enter.transition()
        //         .delay((d: any, i: number) => i * 200)
        //         .duration(500)
        //         .attr('opacity', 1)
        //         .attr('height', (d: any) => dimensions.boundedHeight - yScale(yAccessor(d)))
        // }

        // //tooltips
        // const xBarScale = d3.scaleBand().range([0, dimensions.boundedWidth]).domain(dataset);
        // tooltipArea.selectAll('.tooltip-markers').data(dataset, (d: any) => d).join((enter) => {
        //     return enter.append('rect')
        //         .attr('class', 'tooltip-markers')
        //         .attr('x', (d: any): any => xScale(xAccessor(d)))
        //         .attr('y', (d: any) => 0)
        //         .attr('width', xBarScale.bandwidth())
        //         .attr('height', dimensions.boundedHeight)
        //         .attr('fill', 'transparent')
        //         .on('mouseenter', (e, d: any) => {
        //             // setTooltipData(d);
        //             // setOpen(true);
        //         })
        //         .on('mouseleave', (e, d: any) => {
        //             // setTooltipData(null);
        //             // setOpen(false);
        //         });
        // });



        
        


        //Legend
        const legend = svg.append('g').classed('legend', true);

        var keys = ["RRP", "Market Price"]

        var color = d3.scaleOrdinal()
            .domain(keys)
            .range(['#195649', `url('#hatchMarket')`]);
        var textColor = d3.scaleOrdinal()
            .domain(keys)
            .range(['#195649', '#a7a593']);

        

        legend.selectAll(".legend-dot")
            .data(keys)
            .enter()
            .append('circle')
            .attr('class', 'legend-dot')
            .attr('cx', (d: any, i:any) => xScale(xAccessor(dataset[dataset.length - 1])) - 85 + (i * 50))
            .attr('cy', (d: any, i: any) => { return yScale(yExtent[0]) + 70 })
            .attr('r', 7)
            .style('fill', (d: any) => {
                return color(d) as string;
             })

        legend.selectAll('legend-label')
            .data(keys)
            .enter()
            .append('text')
            .attr('class', 'legend-label')
            .attr('x', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - 75  + (i * 50))
            .attr('y', (d: any, i) => { return yScale(yExtent[0]) + 70 })
            .style('fill', (d: any) => {
                return textColor(d) as string;
             })
            .text((d) => { return d })
            .attr('text-anchor', 'left')
            .style('alignment-baseline', 'middle')

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
        <div>
            <svg ref={ref}>
                <defs>
                    <linearGradient id="goldGradient">
                        <stop offset="0%" stopColor="#a7a593" />
                        <stop offset="100%" stopColor="#a7a593" />
                    </linearGradient>
                    <linearGradient id="orangeGradient">
                        <stop offset="0%" stopColor="#f79f60" />
                        <stop offset="100%" stopColor="#FE7701" />
                    </linearGradient>
                    <linearGradient id="greenGradient">
                        <stop offset="0%" stopColor="#195649" />
                        <stop offset="100%" stopColor="#195649" />
                    </linearGradient>
                    <linearGradient id="blueGradient">
                        <stop offset="0%" stopColor="#5472bc" />
                        <stop offset="100%" stopColor="#184ca9" />
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

            <Tooltip open={open} title={
                <>
                    <p>Date: {tooltipData?.date}</p>
                    <p>Market price: {tooltipData?.price}</p>
                    <p>RRP: {tooltipData?.rrp}</p>
                </>
            }>
                <p></p>
            </Tooltip>
        </div>
    )
}
