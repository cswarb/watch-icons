import { Map } from 'immutable';
import { FallbackAnimation } from './Fallback';
import { JumboAnimation } from './royal-oak/Jumbo';
import { LangeAnimation } from './zeitwerk/Lange';

export const WATCH_ANIMATIONS = Map <string, any>()
    .set('Zeitwerk', LangeAnimation)
    .set('Royal Oak 15202', JumboAnimation);

export const WatchAnimationFactory = ({ model, ...props }: { model: string }) => {
    console.log('called');
    
    const WatchAnimation = WATCH_ANIMATIONS.get(model) || FallbackAnimation;

    return (
        <WatchAnimation {...props} />
    )
}
