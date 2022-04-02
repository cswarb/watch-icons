import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRandomWatch } from "../store/watch/selectors";

export const WatchNavigation = () => {
    const randomWatch = useSelector(selectRandomWatch);
    
    return (
        <div className="in-page-nav">
            <p>Next up:</p>

            <Link
                className="nav__anchor"
                to={`/watch/${randomWatch?._id}`}>
                {randomWatch?.make} {randomWatch?.model}
            </Link>
        </div>
    )
};