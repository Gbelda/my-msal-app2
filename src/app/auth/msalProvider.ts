import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';
import * as Config from './config';

const configEnv = Config.environment[window.location.host];

export const msalConfig = {
  auth: {
    authority: configEnv.authority,
    clientId: configEnv.clientId,
    redirectUri: configEnv.redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export async function getTokenAccessAsync() {
  const accounts = msalInstance.getAllAccounts();
  let token = '';

  if (accounts.length > 0) {
    const request = {
      scopes: configEnv.scopes,
      account: msalInstance.getActiveAccount() || accounts[0],
    };

    msalInstance.setActiveAccount(accounts[0]);

    try {
      const response = await msalInstance.acquireTokenSilent(request);

      token = 'Bearer ' + response.accessToken;
      localStorage.setItem('token', response.accessToken);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance.acquireTokenRedirect(request);
      }
    }
  }

  return token;
}

export async function getUserIdAsync() {
  try {
    const accounts = msalInstance.getAllAccounts();
    
    if (accounts.length > 0) {
      const activeAccount = accounts[0];
      msalInstance.setActiveAccount(activeAccount);

      const userId = activeAccount.username || ''; // Assuming username is the userId
      localStorage.setItem('userId', userId);

      return userId;
    } else {
      console.error('No accounts found.');
      return '';
    }
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    return '';
  }
}


msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;

    if (account) {
      msalInstance.setActiveAccount(account);
    }
  }
});
