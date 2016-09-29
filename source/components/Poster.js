import React from 'react';
import { Link } from 'react-router';

const Poster = React.createClass({
	render(){
		return (
			<div className="poster">
				<h2>{this.props.title}</h2>
				<img src={this.props.url}/>
				<button onClick={this.props.getMovie} type='button'>Begin</button>
			</div>
		)
	}
});

export default Poster;