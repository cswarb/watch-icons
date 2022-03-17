import { RelayEnvironmentProvider } from 'react-relay';
import styled from 'styled-components';
import { AppLoader, WithAppLoader } from './app-loader/AppLoader';
import { LoadingState } from './app-loader/model';
import './App.css';
import { ErrorBoundary } from './error/ErrorBoundary';
import { Routing, RoutingWithAppLoader } from './routing/routing';

// import Environment from './createRelayEnvironment';

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
