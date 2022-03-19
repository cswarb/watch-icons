import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export const JumboAnimation = (props: any) => {
    console.log('JumboAnimation');
    const ref = useRef<any>();

    return (
        <>
            <svg ref={ref}></svg>
        </>
    )
}