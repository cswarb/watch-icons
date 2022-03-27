import Tooltip from '@mui/material/Tooltip';
import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ENTERING } from 'react-transition-group/Transition';
import { debug } from '../../../shared/debug/debug';

const MAIN_COLOR = '#11CF82';

export const ModelsLineAnimation = (props: any) => {
    const ref = useRef<any>();
    const [open, setOpen] = React.useState(false);
    const [tooltipData, setTooltipData]: [any, any] = useState(null);

    function cb(dataset: any): void {
        var parseTime = d3.timeParse('%Y-%m-%d');

        const xAccessor = (d: any): any => d.model;
        const yAccessor1 = (d: any) => d.data;
        const yAccessor2 = (d: any): any => parseTime(d.date);
        const yAccessor3 = (d: any): any => d.price;

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
            .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

        const stage = svg
            .append('g')
            .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

        const allData = dataset.reduce((acc: any, d: any) => acc.concat(d.values), []);
        console.log('alldata: ', allData);

        //x axis
        const xExtent = d3.extent(allData.map(yAccessor2)) as any;
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

        const yExtent = d3.extent([0, ...allData.map(yAccessor3)]) as any;
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

        var keys = dataset.map((d: any) => { return d.key });
        console.log('test', allData, keys);
        
        const COLOURS = ['#e41a1c', '#377eb8', '#4daf4a'];
        var color: any = d3.scaleOrdinal()
            .domain(keys)
            .range(COLOURS);

        //grid
        gridArea.selectAll('.grid-line').data(allData, (d: any) => {
            return d.values;
        }).join((enter) => {
            return enter.append('line')
                .attr('class', 'grid-line')
                .attr('x1', (d: any) => {
                    return xScale(yAccessor2(d))
                })
                .attr('x2', (d: any) => {
                    return xScale(yAccessor2(d));
                })
                .attr('y1', (d: any) => 0)
                .attr('y2', (d: any) => dimensions.boundedHeight)
                .attr('opacity', '1')
                .attr('stroke', '#edf1f5')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit.remove();
        });

        //line
        const line2 = d3.line()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(yAccessor2(d)))
            .y((d: any) => yScale(yAccessor3(d)));

        dataArea.selectAll('.line-2').data(dataset).join((enter) => {
            return enter.append('path')
                .attr('class', 'line-2')
                .attr('d', (d: any) => {
                    return line2(d.values);
                })
                .attr('fill', 'transparent')
                .attr('pointer-events', 'none')
                .attr('opacity', '0.25')
                .attr('stroke', (d: any) => 'grey')
                .attr('stroke-width', '2.5px')
        }, (update) => {
            return update;
        }, (exit) => {
            return exit;
        });

        //selected line
        const selectedLine = d3.line()
            .curve(d3.curveBumpX)
            .x((d: any) => xScale(yAccessor2(d)))
            .y((d: any) => yScale(yAccessor3(d)));            

        const dy = dataset.filter((d: any) => d.key === keys[0]);

        var line = dataArea
            .append('path')
            .datum(dy)
            .attr('d', (d: any) => {
                return selectedLine(d[0].values);
            })
            .attr("stroke", (d: any) => {
                return color(d.key);
            })
            .style("stroke-width", 2.5)
            .style("fill", "none");

        const gValues = dy.reduce((acc: any, d: any) => {
            return acc.concat(d.values)
        }, []);

        var dot = dataArea
            .selectAll('.circle')
            .data(gValues)
            .enter()
            .append('circle')
            .classed('circle', true)
            .attr('cx', (d: any) => {
                return xScale(yAccessor2(d))
            })
            .attr('cy', (d: any) => {
                return yScale(yAccessor3(d))
            })
            .attr('r', 4)
            .attr('fill', (d: any) => {
                return color(d.key);
            });

        // Legend
        const legend = svg.append('g').classed('legend', true);

        legend.selectAll('.legend-dot')
            .data(keys)
            .enter()
            .append('circle')
            .attr('class', 'legend-dot')
            .attr('cx', (d: any, i: any) => 30 + (i * 80))
            .attr('cy', (d: any, i: any) => { return yScale(yExtent[0]) + 40 })
            .attr('r', 5)
            .style('fill', (d: any) => {
                return color(d) as string;
            })

        legend.selectAll('legend-label')
            .data(keys)
            .enter()
            .append('text')
            .attr('class', 'legend-label')
            .attr('x', (d: any, i: any) => 40 + (i * 80))
            .attr('y', (d: any, i) => { return yScale(yExtent[0]) + 40 })
            .style('fill', (d: any) => {
                return color(d) as string;
            })
            .text((d: any) => d)
            .attr('text-anchor', 'left')
            .style('alignment-baseline', 'middle');

        d3.select("#selectButton")
            .selectAll('myOptions')
            .data(keys)
            .enter()
            .append('option')
            .text((d: any) =>  d)
            .attr('value', (d: any) => d)

        function update(selectedGroup: any) {
            var dataFilter = dataset.filter((d: any) => d.key === selectedGroup);

            line
                .datum(dataFilter)
                .transition()
                .duration(500)
                .attr('stroke', (d: any) => {
                    return color(d[0].key);
                })
                .attr('d', (d: any) => {
                    return selectedLine(d[0].values)
                });

            const updated = dataFilter.reduce((acc: any, d: any) => {
                return acc.concat(d.values);
            }, []);

            dot
                .data(updated)
                .transition()
                .duration(500)
                .attr('fill', (d: any) => color(selectedGroup))
                .attr('cx', (d: any) => xScale(yAccessor2(d)))
                .attr('cy', (d: any) => yScale(yAccessor3(d)))
        };

        //Selection
        d3.select("#selectButton").on('change', function (d) {
            var selectedOption = d3.select(this).property('value');
            update(selectedOption);
        });
    };

    useEffect(() => {
        const data: any[] = [
            { key: 'Offshore', values: [
                { date: '2019-01-01', price: 1000, },
                { date: '2019-02-01', price: 1500, },
                { date: '2019-03-01', price: 1100,  },
                { date: '2019-04-01', price: 1200,  },
                { date: '2019-05-01', price: 1250,  },
            ] },
            { key: 'Tourb', values: [
                { date: '2019-01-01', price: 5000, },
                { date: '2019-02-01', price: 7000, },
                { date: '2019-03-01', price: 5000,  },
                { date: '2019-04-01', price: 5100,  },
                { date: '2019-05-01', price: 5150,  },
            ] },
            { key: 'Jumbo', values: [
                { date: '2019-01-01', price: 9750, },
                { date: '2019-02-01', price: 7925, },
                { date: '2019-03-01', price: 21400,  },
                { date: '2019-04-01', price: 16500,  },
                { date: '2019-05-01', price: 19500,  },
            ] },
        ];
        cb(data);
    });

    return (
        <div>
            <select id="selectButton"></select>
            <svg ref={ref}></svg>
        </div>
    )
}
