import React from 'react';
import ReactDOM from 'react-dom';

import {getApplication} from './components/application';

const backendURL = process.env.BACKEND_URL;

if (!backendURL) {
  throw new Error(`'BACKEND_URL' environment variable is missing`);
}

(async () => {
  let content;

  try {
    const Application = await getApplication({
      name: 'Conduit',
      description: 'A place to share your knowledge.',
      backendURL
    });

    if (process.env.NODE_ENV !== 'production') {
      window.Application = Application; // For debugging
    }

    await Application.Session.loadUser();

    content = <Application.Main />;
  } catch (err) {
    console.error(err);

    content = <pre>{err.stack}</pre>;
  }

  ReactDOM.render(content, document.getElementById('root'));
})();
