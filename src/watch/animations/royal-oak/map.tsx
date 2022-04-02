import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import * as topojson from 'topojson-client';

export const MapAnimation = (props: any) => {
    const ref = useRef<any>();

    function cb(mapData: any): void {
        console.log(mapData);
        
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

        const dataArea = stage.append('g')
            .attr('class', 'data');

        const overlay = stage.append('g')
            .attr('class', 'data-overlay')
            .style('transform', 'translate(-10px, 0px)');

        var cantons: any = topojson.feature(mapData, mapData.objects.cantons);

        // const [minX, minY, maxX, maxY] = cantons.bbox;
        console.log(cantons);
        
        // const x = d3.scaleLinear()
        //     .range([0, dimensions.width])
        //     .domain([minX, maxX]);

        // const y = d3.scaleLinear()
        //     .range([0, dimensions.height])
        //     .domain([maxY, minY]);

        var projection = d3.geoAlbers()
            .rotate([0, 0])
            .center([8.3, 46.8])
            .scale(7000)
            .translate([width / 2, dimensions.height / 2])
            .precision(.1);

        var circle = d3.geoCircle()
                .precision(.1)
                .center([6.3, 46.55]);
                
        var path: any = d3.geoPath()
            .projection(projection);

       

        dataArea.selectAll("path")
            .data(cantons.features)
            .join((enter) => {
                enter
                    .append("path")
                    .attr("class", (d: any) => {
                        console.log(d);
                        return `canton-boundary ${d.properties.name === 'Vaud' ? 'canton-boundary--highlight' : ''}`.trim();
                    })
                    .attr('fill', (d: any) => {
                        return d.properties.name === 'Vaud' ? `url('#hatchMap')` : '#F2F1E8';
                    })
                    .attr("d", path)
                    .on("mouseover", function (d, i) {
                        d3.select(this)
                            .transition()
                            .style("fill", "#d7ece3");
                    })
                    .on("mouseout", function (d, i) {
                        d3.select(this)
                            .transition()
                            .style("fill", "");
                    });

                return enter.append("path")
                    .attr("fill", "#09251f")
                    .attr("d", path(circle.radius(0.05)()));
            }, (update) => {
                return update;
            }, (exit) => {
                return exit.remove();
            });

            

        // svg.append("path")
        //     .datum(cantons)
        //     .attr("class", "canton")
        //     .attr("d", path);

        // svg.append("path")
        //     .datum(topojson.mesh(mapData, mapData.objects.cantons, function (a: any, b: any) { return a !== b; }))
        //     .attr("class", "canton-boundary")
        //     .attr("d", path);
        
        overlay.selectAll("text")
            .data(cantons.features)
            .join((enter) => {
                enter.append("rect")
                    .attr('width', (d: any) => {
                        const length = d.properties.name.length;
                        const width = 8 * length;
                        return width;
                    })
                    .attr('height', 13)
                    .attr('class', (d: any) => {
                        return `canton-text__background ${d.properties.name === 'Vaud' ? 'canton-text__background--highlight' : ''}`.trim();
                    })
                    .attr("transform", function (d: any) {
                        const OFFSET_X = 2;
                        const OFFSET_Y = 7;
                        const g = path.centroid(d).map((c: any, i: any) => i === 0 ? c - OFFSET_X : c - OFFSET_Y);
                        return "translate(" + g + ")"; 
                    })
 
                return enter.append("text")
                    .attr("transform", function (d: any) { return "translate(" + path.centroid(d) + ")"; })
                    .attr("dy", ".3em")
                    .style("pointer-events", "none")
                    .attr("class", (d: any) => {
                        return `canton-text ${d.properties.name === 'Vaud' ? 'canton-text--highlight' : ''}`.trim();
                    })
                    .text(function (d: any) { return d.properties.name; });
            }, (update) => {
                return update;
            }, (exit) => {
                return exit.remove();
            });
    }

    async function t() {
        // return await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        // return await import('swiss-maps/2021/ch-combined.json');
        // return await d3.json('https://bl.ocks.org/mbostock/raw/4207744/readme-swiss.json');
        return await d3.json(`${process.env.PUBLIC_URL}/swiss-cantons.json`);
    }

    useEffect(() => {
        t().then((r: any) => {
            // r.features = r.features.filter((d: any) => { return d.properties.name == "Switzerland" })

            cb(r);
        });
    });

    return (
        <div>
            <svg ref={ref}>
                <defs>
                    <pattern id="hatchMap" width="3" height="3" patternTransform="rotate(205)" patternUnits="userSpaceOnUse">
                        <rect width="2" height="3" style={{ fill: '#a7a593' }}></rect>
                    </pattern>
                </defs>
            </svg>
        </div>
    )
}
