import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AboutContainerWithPageContainer } from '../about/about';
import { WithAppLoader } from '../app-loader/AppLoader';
import { Footer } from '../footer/footer';
import { HomeContainerWithPageContainer } from '../home/HomeContainer';
import { LibraryContainerWithPageContainer } from '../library/LibraryContainer';
import { Nav } from '../nav/Nav';
import { WatchContainerWithPageContainer } from '../watch/WatchContainer';

export const Routing = () => {
    return (
        <Router>
            <Nav />

            <Routes>
                <Route path="/" element={<HomeContainerWithPageContainer />}></Route>
                <Route path="/watch/:watchId" element={<WatchContainerWithPageContainer />}></Route>
                <Route path="/library" element={<LibraryContainerWithPageContainer />}></Route>
                <Route path="/about" element={<AboutContainerWithPageContainer />}></Route>
                <Route path="*" element={<Navigate replace to="/" />}></Route>
            </Routes>

            <Footer />
        </Router>
    )
}

export const RoutingWithAppLoader = WithAppLoader(Routing);
