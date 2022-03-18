import styled from 'styled-components';
import { LoadingState } from './app-loader/model';
import './App.css';
import { ErrorBoundary } from './shared/error/ErrorBoundary';
import { RoutingWithAppLoader } from './routing/routing';
import { useWatchListing } from './home/watch-list.hook';

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
  
  return (
    // <RelayEnvironmentProvider environment={Environment}>
      <StyledContainer>
        <ErrorBoundary>
          <RoutingWithAppLoader loaderState={ LoadingState.LOADED } />
        </ErrorBoundary>
      </StyledContainer>
    // </RelayEnvironmentProvider>

  )
}

export default App;
