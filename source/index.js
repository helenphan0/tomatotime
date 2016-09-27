import React from 'react';
import { render } from 'react-dom';

// import css

// import components
import App from './components/App';
import Main from './components/Main';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const router = (
	<Main/>
);

render(router, document.getElementById('root'));


