import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WithAppLoader } from '../app-loader/AppLoader';
import { Home, HomeWithPageContainer } from "../home/Home"
import { Library, LibraryWithPageContainer } from "../library/Library"
import { Nav } from '../nav/Nav';
import { Watch, WatchWithPageContainer } from "../watch/Watch"

export const Routing = () => {
    return (
        <Router>
            <Nav />

            <Routes>
                <Route path="/" element={<HomeWithPageContainer />}></Route>
                <Route path="/watch/:watchId" element={<WatchWithPageContainer />}></Route>
                <Route path="/library" element={<LibraryWithPageContainer />}></Route>
                <Route path="*" element={<Navigate replace to="/" />}></Route>
            </Routes>
        </Router>
    )
}

export const RoutingWithAppLoader = WithAppLoader(Routing);
