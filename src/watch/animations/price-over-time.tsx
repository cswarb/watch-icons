import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

export const PriceOverTimeAnimation = (props: any) => {
    console.log('PriceOverTimeAnimation');
    const ref = useRef<any>();
    const RRP = 13567;

    function cb(dataset: any): void {
        var parseTime = d3.timeParse('%Y-%m-%d');

        const xAccessor = (d: any): any => parseTime(d.date);
        const yAccessor1 = (d: any) => d.price;

        //2: Setup boundaries
        const width = 1000;
        let dimensions: any = {
            width: width,
            height: 300,
            margin: {
                top: 35,
                right: 0,
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
            .attr('height', dimensions.height);

        const stage = svg
            .append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        const dataArea = stage.append('g')
            .attr('class', 'data');

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
        const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.boundedHeight, 0]).nice();
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

        //grid
        dataArea.selectAll('.grid-line').data(dataset).join((enter) => {
            return enter.append('line')
                .attr('class', 'grid-line')
                .attr('x1', (d: any) => xScale(xAccessor(d)))
                .attr('x2', (d: any) => xScale(xAccessor(d)))
                .attr('y1', (d: any) => 0)
                .attr('y2', (d: any) => dimensions.boundedHeight)
                .attr('opacity', '0.1')
                .attr('stroke', 'black')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        //zero line
        dataArea.selectAll('.zero-line').data([dataset]).join((enter) => {
            return enter.append('line')
                .attr('class', 'zero-line')
                .attr('stroke', 'black')
                .attr('x1', '0')
                .attr('x2', dimensions.boundedWidth)
                .attr('y1', yScale(RRP))
                .attr('y2', yScale(RRP))
        })

        //generate gradient
        stage.selectAll('#myGradient2').data([dataset]).join((enter) => {
            const linearG = enter
                .append('defs')
                .append('linearGradient')
                .attr('id', 'myGradient2')
                .attr('gradientTransform', 'rotate(90)')
                .attr('x1', '0%')
                .attr('x2', '100%')
                .attr('y1', '0') //must the the same value to fade the graidient at the right point
                .attr('y2', '0'); //must the the same value to fade the graidient at the right point

            //top
            linearG.append('stop')
                .attr('offset', '0%')
                .attr('stop-opacity', '1')
                .attr('stop-color', '#1B9CFC')

            function getPercentbetweenRanges(x: number, min: number, max: number) {
                const HIGH_PERCENT = 100;
                const percentify = d3.format('.0%');
                const pointInRange = ((x - min) / (max - min));
                const res = (HIGH_PERCENT - (pointInRange * HIGH_PERCENT)) / HIGH_PERCENT;
                return percentify(res);
            }

            linearG.append('stop')
                .attr('offset', `${getPercentbetweenRanges(RRP, yExtent[0], yExtent[1])}`)
                .attr('stop-opacity', '1')
                .attr('stop-color', 'transparent')

            //end
            linearG.append('stop')
                .attr('offset', '100%')
                .attr('stop-opacity', '1')
                .attr('stop-color', '#6D214F')

            return linearG;
        });

        const area = d3.area()
            .x((d: any) => xScale(xAccessor(d)))
            .y0((d: any) => yScale(RRP))
            .y1((d: any) => yScale(yAccessor1(d)));

        dataArea.selectAll('.area').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'area')
                .attr('fill', 'transparent')
                .attr('fill', 'url(#myGradient2)')
                // .attr('clip-path', 'url(#svgPath)')
                .attr('d', (d) => area(d))
        });

        const line1 = d3.line()
            .x((d: any) => xScale(xAccessor(d)))
            .y((d: any) => yScale(yAccessor1(d)));

        dataArea.selectAll('.line-1').data([dataset]).join((enter) => {
            return enter.append('path')
                .attr('class', 'line-1')
                .attr('d', (d: any) => line1(d))
                .attr('fill', 'transparent')
                .attr('stroke', 'black')
                .attr('stroke-width', '1.5px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });
    };

    useEffect(() => {
        const data: any[] = [
            { date: '2018-06-01', price: 9000 },
            { date: '2018-07-01', price: 8250 },
            { date: '2018-08-01', price: 8500 },
            { date: '2018-09-01', price: 9500 },
            { date: '2018-10-01', price: 7500 },
            { date: '2018-11-01', price: 5999 },
            { date: '2018-12-01', price: 8500 },
            { date: '2019-01-01', price: 7500 },
            { date: '2019-02-01', price: 8000 },
            { date: '2019-03-01', price: 9000 },
            { date: '2019-04-01', price: 11000 },
            { date: '2019-05-01', price: 11250 },
            { date: '2019-06-01', price: 12000 },
            { date: '2019-07-01', price: 12100 },
            { date: '2019-08-01', price: 12200 },
            { date: '2019-09-01', price: 12500 },
            { date: '2019-10-01', price: 15000 },
            { date: '2019-11-01', price: 15500 },
            { date: '2019-12-01', price: 15250 },
            { date: '2020-01-01', price: 15000 },
            { date: '2020-02-01', price: 16000 },
            { date: '2020-03-01', price: 17000 },
            { date: '2020-04-01', price: 18500 },
            { date: '2020-05-01', price: 17500 },
            { date: '2020-06-01', price: 25600 },
        ];
        cb(data);
    });

    return (
        <React.Fragment>
            <svg ref={ref}></svg>
        </React.Fragment>
    )
}