import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from "@react-oauth/google"

import App from './App';

ReactDOM.render(
    <GoogleOAuthProvider clientId='165461974597-f3rjo7k88q4etvuscbi8vakorule7p7l.apps.googleusercontent.com'>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </GoogleOAuthProvider>,
    document.getElementById('root')
);