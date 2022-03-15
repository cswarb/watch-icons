import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WithAppLoader } from '../app-loader/AppLoader';
import { Home } from "../home/Home"
import { Library } from "../Library/Library"
import { Nav } from '../nav/Nav';
import { Watch } from "../watch/Watch"
// import { NoMatch } from './NoMatch';

export const Routing = () => {
    return (
        <Router>
            <Nav />

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/watch/:watchId" element={<Watch />}></Route>
                <Route path="/library" element={<Library />}></Route>
                <Route path="*" element={<Navigate replace to="/" />}></Route>
            </Routes>
        </Router>
    )
}

export const RoutingWithAppLoader = WithAppLoader(Routing);
