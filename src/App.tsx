import styled from 'styled-components';
import './App.css';
import { ErrorBoundary } from './shared/error/ErrorBoundary';
import { RoutingWithAppLoader } from './routing/routing';
import { useWatchListing } from './home/watch-list.hook';
import { useSelector } from 'react-redux';
import { selectStatus } from './store/watch/selectors';

const StyledContainer = styled.div`
    margin: 0 32px;
    font-family: sans-serif;
    overflow: hidden;
    position: relative;
    display: block;
    width: 100%;
    min-height: 100vh;
    margin: 0;
`;

function App() {
  useWatchListing();
  const loadingStatus = useSelector(selectStatus);
  
  return (
    // <RelayEnvironmentProvider environment={Environment}>
      <StyledContainer>
        <ErrorBoundary>
        <RoutingWithAppLoader loaderState={loadingStatus} />
        </ErrorBoundary>
      </StyledContainer>
    // </RelayEnvironmentProvider>
  )
}

export default App;
