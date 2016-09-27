import React from 'react';
import { Link } from 'react-router';
import Poster from './Poster';
import Guess from './Guess';
import Score from './Score';

const Main = React.createClass({
	render() {
		return (
			<div className="main">
				<h1>TomatoTime!</h1>
				< Score />
				< Poster />
				< Guess />
			</div>
		)
	}
});

export default Main;