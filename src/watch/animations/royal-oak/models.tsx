import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const MAIN_COLOR = '#460237';

export const ModelsAnimation = (props: any) => {
    const ref = useRef<any>();

    function cb(dataset: any): void {
        const xAccessor = (d: any): any => d.model;
        const yAccessor1 = (d: any) => d.priceLow;
        const yAccessor2 = (d: any) => d.priceHigh;

        //2: Setup boundaries
        const width = 500;
        let dimensions: any = {
            width: width,
            height: 300,
            margin: {
                top: 50,
                right: 10,
                bottom: 50,
                left: 100,
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
            .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

        const stage = svg
            .append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        //x axis
        var en_GB = {
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["£", ""],
        } as any;
        var localisedFormatter = d3.formatLocale(en_GB);
        const xExtent = d3.extent([ ...dataset.map(yAccessor1), ...dataset.map(yAccessor2) ]) as any;
        const xScale = d3.scaleLinear().domain(xExtent).range([0, dimensions.boundedWidth]).nice();
        const xAxis = d3.axisBottom(xScale).tickFormat((v: any) => {
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

            return `${formattedValue}`;
        }).ticks(dataset.length);
        const x = stage.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${dimensions.boundedHeight})`).call(xAxis);

        //y axis
        const ySpreadData = [...dataset.map(xAccessor)];
        const yExtent = d3.extent(ySpreadData);
        const yScale: any = d3.scaleBand().domain(ySpreadData).range([dimensions.boundedHeight, 0]).padding(1);
        const yAxis = d3.axisLeft(yScale).tickPadding(5);
        const y = stage.append('g').attr('class', 'y-axis').call(yAxis);

        const dataUnderlayArea = stage.append('g')
            .attr('class', 'data-underlay');

        const dataArea = stage.append('g')
            .attr('class', 'data');

        const legend = stage.append('g')
            .attr('class', 'legend');

        dataArea.selectAll('.line').data(dataset).join((enter) => {
            return enter.append('line')
                .attr('class', 'line')
                .attr('x1', (d: any) => xScale(yAccessor1(d)) )
                .attr('x2', (d: any) => xScale(yAccessor2(d)) )
                .attr('y1', (d: any) => yScale(xAccessor(d))  )
                .attr('y2', (d: any) => yScale(xAccessor(d))  )
                .attr('stroke', 'url(#modelstsx)')
                .attr('stroke-width', '2px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        //https://d3-graph-gallery.com/graph/custom_color.html
        //https://github.com/d3/d3-scale-chromatic
        var colorScale = d3.scaleSequential().domain(xExtent).interpolator(d3.interpolateYlOrRd);
        const grd = legend.append('defs').append('linearGradient');
        grd.attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('id', 'modelstsx');

        const recty = legend.append('rect')
            .attr('fill', (d: any) => {
                return 'url(#modelstsx)';
            })
            .attr('width', dimensions.boundedWidth)
            .attr('height', '10px')
            .attr('x', '0')
            .attr('y', -dimensions.margin.top / 1.5);

        grd.selectAll('stop').data(xExtent).join((enter) => {
            return enter.append('stop')
            .attr('offset', (d: any, i: number) => {
                return 100 * (i / (xExtent.length - 1)) + '%';
            }).attr('stop-color', (d: any) => colorScale(d))
        });

        const keyLeftGroup = legend.append('g').attr('class', 'key key--left').attr('transform', `translate(0, ${-dimensions.margin.top / 5})`);
        const keyRightGroup = legend.append('g').attr('class', 'key key--right').attr('transform', `translate(${dimensions.boundedWidth - 15}, ${-dimensions.margin.top / 5})`);
        keyLeftGroup.append('text').text('$').attr('font-size', '0.6rem');
        keyRightGroup.append('text').text('$$$').attr('font-size', '0.6rem');

        dataArea.selectAll('.circle').data(dataset).join((enter) => {
            enter.append('circle')
                .attr('class', 'circle')
                .attr('fill', (d: any) => colorScale(yAccessor1(d)))
                .attr('cx', (d: any) => xScale(yAccessor1(d)))
                .attr('cy', (d: any) => yScale(xAccessor(d)) )
                .attr('r', '4');

            return enter
                .append('circle')
                .attr('class', 'circle')
                .attr('fill', (d: any) => colorScale(yAccessor2(d)))
                .attr('cx', (d: any) => xScale(yAccessor2(d)))
                .attr('cy', (d: any) => yScale(xAccessor(d)) )
                .attr('r', '4');
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });


        const drawLegend = (data: any) => {
            var keys = ['Price']

            legend.selectAll('.legend-item')
                .data(keys)
                .join((enter: any) => {
                    const item = enter.append('g').attr('class', 'legend-item');

                    return item.append('text')
                        .attr('class', 'legend-label')
                        .attr('x', (d: any, i: any) => dimensions.boundedWidth / 2)
                        .attr('y', (d: any, i: any) => dimensions.boundedHeight + 35)
                        .style('fill', 'black')
                        .text((d: any) => d)
                        .attr('text-anchor', 'left')
                        .style('alignment-baseline', 'middle');
                }, (update: any) => {
                    const group = update.selectAll('.legend-item') as any;
                    const labels = group.selectAll('.legend-label') as any;

                    labels.text((d: any) => d);

                    return group;
                }, (exit: any) => {
                    return exit.remove();
                });
        };

        drawLegend(dataset);
    };

    useEffect(() => {
        const data: any[] = [
            { model: '15202ST Jumbo', priceLow: 16900, priceHigh: 200000 },
            { model: 'Flying tourb', priceLow: 95000, priceHigh: 110000 },
            { model: 'Minute repeater', priceLow: 150000, priceHigh: 155000 },
            { model: 'Openworked', priceLow: 55000, priceHigh: 250000 },
            { model: '5402', priceLow: 16000, priceHigh: 186000 },
        ];
        cb(data);
    });

    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
