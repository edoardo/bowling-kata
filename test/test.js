var assert = require('assert');
var BowlingGame = require('../lib/bowling-game');

var formatTests = [
    { scoring: 'XXXXXXXXXXXX', parsedScoring: 'XXXXXXXXXXXX' },
    { scoring: '9-9-9-9-9-9-9-9-9-9-', parsedScoring: '90909090909090909090' },
    { scoring: '5/5/5/5/5/5/5/5/5/5/5', parsedScoring: '5/5/5/5/5/5/5/5/5/5/5' },
    { scoring: '-123456-7-8/9-X1-42', parsedScoring: '01234560708/90X1042' }
];

var bonusTests = [
    { rolls: ['X'], bonus: 10 },
    { rolls: ['X','1'], bonus: 11 },
    { rolls: ['4'], bonus: 4 },
    { rolls: ['5','/'], bonus: 10 },
    { rolls: ['1','3'], bonus: 4 },
    { rolls: ['9','0'], bonus: 9 }
];

var scoreTests = [
    { scoring: 'XXXXXXXXXXXX', score: 300 },
    { scoring: '9-9-9-9-9-9-9-9-9-9-', score: 90 },
    { scoring: '5/5/5/5/5/5/5/5/5/5/5', score: 150 },
    { scoring: '-123456-7-8/9-X1-42', score: 74 }
];

// mocha style
describe('BowlingGame', function () {
    describe('.formatScoring()', function () {
        formatTests.forEach(function (t) {
            var game = new BowlingGame(t.scoring);
            it('should return ' + t.parsedScoring + ' when the scoring is ' + t.scoring, function () {
                assert.deepEqual(game.formatScoring(t.scoring), t.parsedScoring);
            })
        })
    });
    describe('.computeBonus()', function () {
        var game = new BowlingGame('----------');

        bonusTests.forEach(function (t) {
            it('should return ' + t.bonus + ' when the rolls are ' + t.rolls.join(', '), function () {
                assert.strictEqual(game.computeBonus(t.rolls[0], t.rolls[1]), t.bonus);
            })
        })
    });
    describe('.computeScore()', function () {
        scoreTests.forEach(function (t) {
            var game = new BowlingGame(t.scoring);

            it('should return ' + t.score + ' when the rolls scoring is ' + t.scoring, function () {
                assert.strictEqual(game.computeScore(), t.score);
            })
        })
    })
});
