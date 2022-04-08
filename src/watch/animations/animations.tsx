import { Map } from 'immutable';
import { useEffect, useState } from 'react';
import { FallbackAnimation } from './Fallback';
import { JumboAnimation } from './royal-oak/Jumbo';
import { ZeitwerkAnimation } from './zeitwerk/Lange';

export const WATCH_ANIMATIONS = Map <string, any>()
    .set('Zeitwerk', ZeitwerkAnimation)
    .set('Royal Oak', JumboAnimation);

export const WatchAnimationFactory = ({ model, ...props }: { model: string }) => {
    const WatchAnimation = WATCH_ANIMATIONS.get(model) || FallbackAnimation;
    const [time, setTime] = useState(new Date());
    const [powerReserve, setPowerReserve] = useState({ percent: 100, totalHours: 72 });
    const [HERTZ] = useState(4);

    function updateTime() {
        setTime(new Date());
    };

    function pauseTime() {
        setTime(time);
    }

    function resumeTime() {
        setTime(new Date());
    }

    /*
        Updates will be streamed to the animation component at 4hz, but it's up 
        to the d3 code as to whether it listens and updates it's elements
        based on this beat rate
    */
    const BEATS_PER_SECOND = 1000 / HERTZ;

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setTime(new Date());
        // }, BEATS_PER_SECOND);

        // return () => {
        //     clearInterval(interval);
        // };
    }, []);

    return (
        <>
            <button type="button" onClick={() => updateTime()}>update time</button>
            <button type="button" onClick={() => pauseTime()}>pause time</button>
            <button type="button" onClick={() => resumeTime()}>resume time</button>
            <WatchAnimation time={time} powerReserve={powerReserve} {...props} />
        </>
    )
}
