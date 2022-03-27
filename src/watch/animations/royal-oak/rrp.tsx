import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ENTERING } from 'react-transition-group/Transition';
import { debug } from '../../../shared/debug/debug';

const MAIN_COLOR = '#315AFE';

export const RrpAnimation = (props: any) => {
    console.log('PriceOverTimeAnimation');
    const ref = useRef<any>();
    const [open, setOpen] = React.useState(false);
    const [tooltipData, setTooltipData]: [any, any] = useState(null);

    function cb(dataset: any): void {
        var parseTime = d3.timeParse('%Y-%m-%d');

        const xAccessor = (d: any): any => parseTime(d.date);
        const yAccessor2 = (d: any) => d.rrp;

        //2: Setup boundaries
        const width = 500;
        let dimensions: any = {
            width: width,
            height: 300,
            margin: {
                top: 10,
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

        const ySpreadData = [...dataset.map(yAccessor2)];
        const yExtent = d3.extent(ySpreadData) as any;
        const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.boundedHeight, 0]);
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

        // new area
        const area = d3.area()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(xAccessor(d)))
            .y0((d: any) => yScale(yExtent[0]))
            .y1((d: any) => yScale(yAccessor2(d)));

        dataUnderlayArea.selectAll('.area-u').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area-u')
                .attr('fill', '#ffffff')
                .attr('d', (d) => area(d))
        })
        dataArea.selectAll('.area').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area')
                .attr('fill', `url('#gg')`)
                .attr('opacity', '1')
                .attr('d', (d) => area(d))
        });

        //line
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
                .attr('opacity', '1')
                .attr('stroke', MAIN_COLOR)
                .attr('stroke-width', '2.5px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        dataArea.selectAll('.dots-2').data(dataset).join((enter) => {
             enter.append('circle')
                .attr('class', 'dots-2')
                 .attr('fill', MAIN_COLOR)
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


        //Legend
        const legend = svg.append('g').classed('legend', true);

        var keys = ["RRP"]

        var color = d3.scaleOrdinal()
            .domain(keys)
            .range([MAIN_COLOR]);
        var textColor = d3.scaleOrdinal()
            .domain(keys)
            .range([MAIN_COLOR]);


        legend.selectAll('.legend-dot')
            .data(keys)
            .enter()
            .append('circle')
            .attr('class', 'legend-dot')
            .attr('cx', (d: any, i:any) => xScale(xAccessor(dataset[dataset.length - 1])) - -10 + (i * 50))
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
            .attr('x', (d: any, i: any) => xScale(xAccessor(dataset[dataset.length - 1])) - -20  + (i * 50))
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
            { date: '2019-01-01', price: 7500, rrp: 8000 },
            { date: '2019-02-01', price: 8000, rrp: 8000 },
            { date: '2019-04-01', price: 12000, rrp: 10000 },
            { date: '2019-06-01', price: 18500, rrp: 13500 },
            { date: '2019-08-01', price: 20600, rrp: 13500 },
        ];
        cb(data);
    });

    return (
        <div>
            <svg ref={ref}>
                <defs>
                   
                    <linearGradient id="gg" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor={MAIN_COLOR} />
                        <stop offset="100%" stopColor="#ffffff" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
