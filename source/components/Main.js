import React from 'react';
import { Link } from 'react-router';
import Poster from './Poster';
import Guess from './Guess';
import Score from './Score';
import CountdownTimer from './CountdownTimer2';
import fetch from 'isomorphic-fetch';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
 };

var id;
var showMovie;
const defaultPoster = './source/img/default_poster.jpg';

const Main = React.createClass({
	getInitialState: function () {
	    return {
	      game:  false,
	      ratingInput: false,
	      timeInput: false,
	      posterTitle: '',
	      posterUrl: '',
	      rating: '',
	      time: '',
	      score: 0
	    };
  	},
  	getMovie: function() {
  		console.log('getting new movie');
  		this.setState({game: false, ratingInput: false, timeInput: false });
		var page = getRandomInt(1, 250);
		var searchurl = 'https://api.themoviedb.org/3/movie/popular?api_key=342d326aba75ee271f3e2cb0fbfa3584&language=en-US&page=' + page;
		return fetch(searchurl)
		      .then((response) => response.json())
		      .then((responseJson) => {
		     	var oneMovie = responseJson.results[getRandomInt(0, responseJson.results.length)];
		     	console.log(oneMovie);
		     	this.setState({ game: false, posterUrl: 'https://image.tmdb.org/t/p/w320' + oneMovie.poster_path, posterTitle: oneMovie.title});
		      })
		      .then((movieDetail) => {
		      	console.log(this.state.posterTitle);
		      	let detailUrl =  'https://www.omdbapi.com/?t=' + this.state.posterTitle + '&plot=full&type=movie&tomatoes=true&r=json';
		      	fetch(detailUrl)
		      		.then((resp) => resp.json())
		      		.then((respJson) => {
		      			showMovie = respJson;
		      			console.log(showMovie);

		      			var rating = showMovie.tomatoRating;
		      			rating = (rating === 'N/A' ? showMovie.imdbRating : rating);
		      			rating = (rating === 'N/A' || rating === 'null' ? getRandomInt(1, 9) + '.' + getRandomInt(1,10) : rating);

		      			var time = showMovie.Runtime;
		      			time = (time === 'N/A' || time === 'null' ? getRandomInt(1, 160) + ' min' : time);

		      			this.setState({ game: true, rating: rating, time: time});
		      			return showMovie;
		      		});
		      }) 
		      .catch((error) => {
		        console.error(error);
		      });
  	},
  	addScore: function(add) {
  		var score = this.state.score;

  		if (this.state.timeInput == true && this.state.ratingInput == true) {
  			console.log('call new game here');
  		};
  		this.setState({ score: score += parseInt(add)});

  	},
  	disable: function(type) {
  		this.setState({ [type]: true });
  	},
  	getTimer: function(timer) {
  		var x = timer
  		return x;
  	},
	render() {
		return (
			<div className='main'>
				<h1>TomatoTime!</h1>
				< Score score={this.state.score} />
				< Poster getMovie={this.getMovie}  url={this.state.posterUrl} title={this.state.posterTitle} />
				< CountdownTimer  initialTimeRemaining='100000' />
				< Guess disable={this.disable} addScore={this.addScore} rating={this.state.rating} time={this.state.time} ratingInput={this.state.ratingInput} timeInput={this.state.timeInput} />
			</div>
		)
	}
});

export default Main;