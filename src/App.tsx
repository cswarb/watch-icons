import { RelayEnvironmentProvider } from 'react-relay';
import styled from 'styled-components';
import './App.css';
import { Routing } from './routing/routing';

import Environment from './createRelayEnvironment';

const StyledContainer = styled.div`
    margin: 0 32px;
    font-family: sans-serif;
`;

function App() {
  const pth = window.location.pathname;

  return (
    <RelayEnvironmentProvider environment={Environment}>
      <StyledContainer>
        <Routing />
      </StyledContainer>
    </RelayEnvironmentProvider>

  )
}

export default App;
