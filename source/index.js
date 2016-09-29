import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import components
import App from './components/App';
import Main from './components/Main';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import store from './store';

const router = (

		<Main />

);

render(router, document.getElementById('root'));


