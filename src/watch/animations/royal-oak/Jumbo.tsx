import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export const JumboAnimation = ({ time, ...props }: { time: Date }) => {
    console.log('JumboAnimation', time);
    const ref = useRef<any>();
    const dimensions: any = {
        width: 500,
        height: 500,
        margin: {
            top: 50,
            right: 0,
            bottom: 50,
            left: 0
        }
    };

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.left;
    dimensions.boundedheight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const smh = (time: Date): { day: number, date: number, month: number, year: number, seconds: number, minutes: number, hours: number, millis: number } => {
        return {
            day: time.getDay(),
            date: time.getDate(),
            month: time.getMonth(),
            year: time.getFullYear(),
            seconds: time.getSeconds(),
            minutes: time.getMinutes(),
            hours: time.getHours(),
            millis: time.getMilliseconds()
        }
    };

    const initChart = () => {
        const svg = d3.select(ref.current);
        svg.attr('width', dimensions.width).attr('height', dimensions.height);
        const stage = svg.append('g').attr('class', 'stage').style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);;
        const dateWheelGroup = stage.append('g').attr('class', 'date-wheel');
    };

    const updateChart = (time: any) => {
        const st: any = d3.select(ref.current);
        const stage = st.select('.stage');
        const dateWheelGroup = stage.select('.date-wheel');

        stage.selectAll('.time').data([time]).join((enter: any) => {
            return enter.append('text').attr('class', 'time').attr('x', 0).attr('y', 0).text((d: any) => d);
        }, (update: any) => {
            return update.text((d: any) => d);
        }, (exit: any) => {
            return exit.remove();
        });

        stage.selectAll('.seconds').data([[time, time.getMilliseconds()]]).join((enter: any) => {
            const cir = enter.append('circle')
                .attr('class', 'seconds')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 25)
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')
                .style('transform', (d: any) => {
                    console.log('>>>>> ',d);
                    
                    const s = Number(smh(d[0]).seconds + '.' + d[1]);
                    const degs = 360 / 60;
                    return `rotate(${degs*s}deg)`;
                });

            return enter;
        }, (update: any) => {
            return update
                .style('transform', (d: any) => {
                    const s = Number(smh(d[0]).seconds + '.' + d[1]);
                    const degs = 360 / 60;
                    return `rotate(${degs * s}deg)`;
                });
        }, (exit: any) => {
            return exit.remove();
        });

        stage.selectAll('.minutes').data([time]).join((enter: any) => {
            const cir = enter.append('circle')
                .attr('class', 'minutes')
                .attr('cx', 50)
                .attr('cy', 100)
                .attr('fill', 'red')
                .attr('r', 50)
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')
                .style('transform', (d: any) => {
                    const m = smh(d).minutes;
                    const degs = 360 / 60;
                    return `rotate(${degs * m}deg)`;
                });

            return enter;
        }, (update: any) => {
            return update
                .style('transform', (d: any) => {
                    const m = smh(d).minutes;
                    const degs = 360 / 60;
                    return `rotate(${degs * m}deg)`;
                });
        }, (exit: any) => {
            return exit.remove();
        });

        stage.selectAll('.hours').data([time]).join((enter: any) => {
            const cir = enter.append('circle')
                .attr('class', 'hours')
                .attr('cx', 50)
                .attr('cy', 200)
                .attr('fill', 'green')
                .attr('r', 50)
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')
                .style('transform', (d: any) => {
                    const h = smh(d).hours;
                    const degs = 360 / 12;
                    const twentyFourHourDegrees = (degs * h) % 360;
                    return `rotate(${twentyFourHourDegrees}deg)`;
                });

            return enter;
        }, (update: any) => {
            return update
                .style('transform', (d: any) => {
                    const h = smh(d).hours;
                    const degs = 360 / 12;
                    const twentyFourHourDegrees = (degs * h) % 360;
                    return `rotate(${twentyFourHourDegrees}deg)`;
                });
        }, (exit: any) => {
            return exit.remove();
        });


        const dateScale = d3.scaleLinear()
            .domain([1, 31])
            .range([0, 360]);

        dateWheelGroup.selectAll('.date-disc').data([time]).join((enter: any) => {
            const cir = enter.append('circle')
                .attr('class', 'date-disc')
                .attr('cx', 250)
                .attr('cy', 250)
                .attr('fill', 'orange')
                .attr('r', 50)
                .style('transform-box', 'fill-box')
                .style('transform-origin', 'center')
                .style('transform', (d: any) => {
                    const date = smh(time).date;
                    return `rotate(${dateScale(date)}deg)`;
                });

            return enter;
        }, (update: any) => {
            return update
                .style('transform', (d: any) => {
                    const date = smh(time).date;
                    return `rotate(${dateScale(date)}deg)`;
                });
        }, (exit: any) => {
            return exit.remove();
        });

        //Dynamic dates attached to the date wheel (so they can flick in)
        // const allDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        // dateWheelGroup.append('path')
        //     .attr("id", "wavy") //Unique id of the path
        //     .attr("d", "M 25, 50a 25, 25 0 1, 1 50, 0 a 25, 25 0 1, 1 - 50, 0") //SVG path
        //     .style("fill", "none")
        //     .style("stroke", "#AAAAAA");

        // dateWheelGroup.selectAll('.dynamic-date').data([allDates]).join((enter: any) => {
        //     const cir = enter.append('text')
        //         .append("textPath")
        //         .attr("xlink:href", "#wavy")
        //         .style("text-anchor", "middle")
        //         .attr("startOffset", "50%")
        //         .attr('class', 'dynamic-date')
        //         .text((d: any) => {
        //             return d;
        //         });

        //     return cir;
        // }, (update: any) => {
        //     return update
        //         .text((d: any) => {
        //             return d;
        //         });
        // }, (exit: any) => {
        //     return exit.remove();
        // });

        //Date change via changing text prop rather than using date disc above
        // dateWheelGroup.selectAll('.dates').data([time]).join((enter: any) => {
        //     const cir = enter.append('text')
        //         .attr('class', 'dates')
        //         .attr('cx', 250)
        //         .attr('cy', 250)
        //         .attr('fill', 'purple')
        //         .attr('r', 50)
        //         .style('transform-box', 'fill-box')
        //         .style('transform-origin', 'center')
                // .text((d: any) => {
                //     const date = smh(d).date;
                //     return date;
                // });

        //     return enter;
        // }, (update: any) => {
        //     return update
        //         .text((d: any) => {
        //             const date = smh(d).date;
        //             return date;
        //         });
        // }, (exit: any) => {
        //     return exit.remove();
        // });
    };

    useEffect(() => {
        console.log('initChart');
        initChart();
    }, []);

    useEffect(() => {
        console.log('updateChart');
        updateChart(time);
    }, [time, time.getMilliseconds()]);

    return (
        <>
            <svg ref={ref}></svg>
        </>
    )
}