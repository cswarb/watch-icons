import styled from 'styled-components';
import './App.css';
import { ErrorBoundary } from './shared/error/ErrorBoundary';
import { RoutingWithAppLoader } from './routing/routing';
import { useWatchListing } from './home/watch-list.hook';
import { useSelector } from 'react-redux';
import { selectStatus } from './store/watch/selectors';


function App() {
  useWatchListing();
  const loadingStatus = useSelector(selectStatus);
  
  return (
    // <RelayEnvironmentProvider environment={Environment}>
      <div className="container">
        <ErrorBoundary>
        <RoutingWithAppLoader loaderState={loadingStatus} />
        </ErrorBoundary>
      </div>
    // </RelayEnvironmentProvider>
  )
}

export default App;
