import { Map } from 'immutable';
import { FallbackAnimation } from './Fallback';
import { JumboAnimation } from './Jumbo';
import { LangeAnimation } from './Lange';

export const WATCH_ANIMATIONS = Map <string, any>()
    .set('zeitwerk', LangeAnimation)
    .set('jumbo', JumboAnimation);

export const RenderWatchAnimation = (props: { watchId: string }) => {
    const WatchAnimation = WATCH_ANIMATIONS.get(props.watchId) || FallbackAnimation;

    return (
        <WatchAnimation {...props} />
    )
}


