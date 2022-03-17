import { useWatchListing } from './watch-list.hook';

export const Home = (props: any) => {
    const watchState = useWatchListing();

    const list = watchState.map((item) => { 
        return (
            <div key={item._id}>
                <p>{item.make} {item.model} '{item.shortname}'</p>
            </div>
        )
    });

    return (
        <div>{ list }</div>
    )
}