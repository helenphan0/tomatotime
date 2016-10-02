import React from 'react';
import { Link } from 'react-router';

const Poster = React.createClass({
	render(){
		return (
			<div className="poster">
				<h3>{this.props.title}</h3>
				<img src={this.props.url}/>
			</div>
		)
	}
});

export default Poster;