import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.jsx';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;  // This is required for API authentication

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: audience,  // Needed for getAccessTokenSilently()
            scope: "openid profile email read:ingredients write:ingredients update:ingredients delete:ingredients"  // Define scopes for API calls
        }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);

