import { Map } from 'immutable';
import { useEffect, useState } from 'react';
import { FallbackAnimation } from './Fallback';
import { JumboAnimation } from './royal-oak/Jumbo';
import { LangeAnimation } from './zeitwerk/Lange';

export const WATCH_ANIMATIONS = Map <string, any>()
    .set('Zeitwerk', LangeAnimation)
    .set('Royal Oak', JumboAnimation);

export const WatchAnimationFactory = ({ model, ...props }: { model: string }) => {
    const WatchAnimation = WATCH_ANIMATIONS.get(model) || FallbackAnimation;
    const [time, setTime] = useState(new Date());

    function updateTime() {
        setTime(new Date());
    };

    useEffect(() => {
        // setInterval(() => {
            // setTime(new Date());
        // }, 1000);
    }, []);

    return (
        <>
            <button type="button" onClick={() => updateTime()}>update time</button>
            <WatchAnimation time={time} {...props} />
        </>
    )
}
