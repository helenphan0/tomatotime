import React from 'react';
import { Link } from 'react-router';

var leaderBoard = [
	{ name: 'MH Van Hauten', score: 373567 },
	{ name: 'Chester Copperpot', score: 167210 },
	{ name: 'Thomas Bundchen', score: 919802 },
	{ name: 'NWBZPWNR', score: 9999999 },
	{ name: '8yr old coding guru', score: 62810 },
	{ name: 'I LOVE U ZAK MORRIS!! XOXO', score: 209413 },
	{ name: 'asfljdf', score: 131090 },
	{ name: "Last Year's Hotdog Eating Contest Champion", score: 421573 },
	{ name: 'Mrs. Doubefire', score: 98251 }
];
var player = {
	name: '',
	score: 0
};

// sort by value
leaderBoard.sort(function (a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
});

const Highscore = React.createClass({
	submitScore: function(e) {
		e.preventDefault();

	},
	render() {
		return (
			<div className='grey-out'>
				<div className='window'>
					<form>
						<input ref='playerName' type='text' placeholder='Enter your name' />
						<button type='button'>Submit</button>
					<form>
				</div>
			<div>
		)
	}
});

export default Highscore;
