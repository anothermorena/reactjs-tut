import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //the app component is the default component created  by a new react project

ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root') //this is where reacts inject our app.
);


