import React from 'react';
import { Link } from 'react-router';
import Poster from './Poster';
import Guess from './Guess';
import Score from './Score';
import fetch from 'isomorphic-fetch';

var movieaurl = 'https://www.omdbapi.com/?t=batman&plot=full&type=movie&tomatoes=true&r=json'

const Main = React.createClass({
	getInitialState: function () {
	    return {
	      game:    false,
	    };
  	},
  	getMovie: function() {
  		console.log('button clicked, getMovie function triggered');
  		this.setState({game: true});
  		return fetch(movieaurl).then(function(response) {
  			if (response.status < 200 || response.status >= 300) {
  				var error = new Error(response.statusText)
  				error.response = response;
  				console.log(error);
  				throw error;
  			}
  			console.log(response);
  			return response;
  		});
  	},
	render() {
		return (
			<div className="main">
				<h1>TomatoTime!</h1>
				< Score />
				< Poster getMovie={this.getMovie} />
				< Guess />
			</div>
		)
	}
});

export default Main;