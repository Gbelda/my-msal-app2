export const loginUrl = 'https://login.microsoftonline.com/';
export const localTenantId = '77184292-5830-433b-9731-60d4cd6fe68a';

export type ConfigEntry = {
  clientId: string;
  redirectUri: string;
  scopes: string[];
//   apiUrl: string;
  authority: string;
};

export const environment: Record<string, ConfigEntry> = {
  'localhost:3001': {
    clientId: '6a6553a7-9780-46d4-bfbe-5e683c721a9b',
    redirectUri: 'http://localhost:3001/',
    scopes: ['User.Read', 'Mail.Read', 'Calendars.Read', 'Files.Read', 'Sites.Read.All'],
    // apiUrl: 'https://localhost:44381/',
    authority: `${loginUrl}${localTenantId}`,
  },
  'webappmsal2.azurewebsites.net': {
    clientId: '6a6553a7-9780-46d4-bfbe-5e683c721a9b',
    redirectUri: 'https://webappmsal2.azurewebsites.net/',
    scopes: ['User.Read', 'Mail.Read', 'Calendars.Read', 'Files.Read', 'Sites.Read.All'],
    // apiUrl: 'https://localhost:44381/',
    authority: `${loginUrl}${localTenantId}`,
  },
};
