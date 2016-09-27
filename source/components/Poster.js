import React from 'react';
import { Link } from 'react-router';

// https://www.omdbapi.com/?t={ movie }&plot=full&type=movie&tomatoes=true&r=json
// 

const Poster = React.createClass({
	posterFunction: function(){
		console.log('poster function');
	},
	render(){
		return (
			<div className="poster">
				<button onClick={this.posterFunction} type="button">Begin</button>
				<img />
				This will be a movie poster. (it will be taller)
			</div>
		)
	}
});

export default Poster;