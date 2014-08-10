/*
   index.js - Given a string with the rolls scoring, computes the score of a bowling game.

   Example usage:
   node index.js '5/5/5/5/5/5/5/5/5/5/5'
*/

var BowlingGame = require('./lib/bowling-game');

var scoring = process.argv[2];

var game = new BowlingGame(scoring);

var score = game.computeScore();
console.log('rolls scoring:', scoring, '-> game score:', score);
