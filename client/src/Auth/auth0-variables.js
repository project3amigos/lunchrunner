export const AUTH_CONFIG = {
  domain: 'project3amigos.auth0.com',
  clientId: 'aO3VTrwPSzq4pFruLMLJ9BNrm1DEKA1H',
  callbackUrl: window.location.host.includes("localhost") ? "http://localhost:3000/callback": "https://project-3-amigos-lunch-runner.herokuapp.com/callback"
}
