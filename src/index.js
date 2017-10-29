import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import PhoneBook from './PhoneBook/PhoneBook.js';
import registerServiceWorker from './registerServiceWorker';

// create new PhoneBook instance
const phoneBook = new PhoneBook({
  debug: process.env.NODE_ENV === 'development',
});

ReactDOM.render(
  <App phoneBook={phoneBook} />,
  document.getElementById('root')
);

registerServiceWorker();
