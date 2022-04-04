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
                top: 10,
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
        const formatWithLocalisedValues = localisedFormatter.format("$,.2r");
        const xExtent = d3.extent([...dataset.map(yAccessor1), ...dataset.map(yAccessor2) ]) as any;
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

            return `${formatWithLocalisedValues(v)}`;
        });;
        const x = stage.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${dimensions.boundedHeight})`).call(xAxis);

        //y axis
        const ySpreadData = [...dataset.map(xAccessor)];
        const yScale: any = d3.scaleBand().domain(ySpreadData).range([dimensions.boundedHeight, 0]).padding(1);
        const yAxis = d3.axisLeft(yScale).tickPadding(5);
        const y = stage.append('g').attr('class', 'y-axis').call(yAxis);

        const dataUnderlayArea = stage.append('g')
            .attr('class', 'data-underlay');

        const dataArea = stage.append('g')
            .attr('class', 'data');

        dataArea.selectAll('.line').data(dataset).join((enter) => {
            return enter.append('line')
                .attr('class', 'line')
                .attr('x1', (d: any) => xScale(yAccessor1(d)) )
                .attr('x2', (d: any) => xScale(yAccessor2(d)) )
                .attr('y1', (d: any) => yScale(xAccessor(d))  )
                .attr('y2', (d: any) => yScale(xAccessor(d))  )
                .attr('stroke', MAIN_COLOR)
                .attr('stroke-width', '2px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        //https://d3-graph-gallery.com/graph/custom_color.html
        //https://github.com/d3/d3-scale-chromatic
        var colorScale = d3.scaleSequential().domain(xExtent).interpolator(d3.interpolateYlOrRd);

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