import { Map } from 'immutable';
import { FallbackAnimation } from './Fallback';
import { JumboAnimation } from './Jumbo';
import { LangeAnimation } from './Lange';

export const WATCH_ANIMATIONS = Map <string, any>()
    .set('Zeitwerk', LangeAnimation)
    .set('Royal Oak 15202', JumboAnimation);

export const WatchAnimationFactory = ({ model, ...props }: { model: string }) => {
    const WatchAnimation = WATCH_ANIMATIONS.get(model) || FallbackAnimation;

    return (
        <WatchAnimation {...props} />
    )
}


