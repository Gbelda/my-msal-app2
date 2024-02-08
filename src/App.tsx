
import './App.css';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import { msalInstance } from './app/auth/msalProvider';
import { InteractionType } from '@azure/msal-browser';
import * as Config from './app/auth/config';
import Main from './Main';

function App() {

  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={{
          scopes: Config.environment[window.location.host].scopes,
        }}
      >
        <Main/>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
}



export default App;
