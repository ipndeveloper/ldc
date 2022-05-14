// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // frontUrl: 'http://localhost:4200/',
  // apiUrl: 'http://localhost:63109/api',
  tokenKey: 'YardToken',
  tokenExpirationKey: 'YardTokenExpiration',
  permissionsKey: 'Permissions',
  localeIdKey: 'localeId',
  // isLocal: true,
  // idTerminal: 137,
  currentUserKey: 'CurrentUser',
  terminalKey: 'Terminal',
  pageStateKey: 'PageState'
};
