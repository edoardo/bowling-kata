function BowlingGame(scoring) {
    this.scoring = scoring;

    this.rollsScoreList = this.formatScoring(scoring).split('');
}

BowlingGame.prototype.formatScoring = function (scoring) {
    // convert '-' in '0'
    scoring = scoring.replace(/-/g, '0');

    return scoring;
};

BowlingGame.prototype.computeBonus = function (roll1, roll2) {
    var bonus = 0;

    // initialize 2nd bonus roll to 0 if not present
    // (bonus for a spare) so we can always use the loop below
    if (roll2 === undefined) {
        roll2 = 0;
    }
    // if the 2 bonus rolls are a spare,
    // compute the 2nd roll
    else if (roll2 === '/') {
        roll2 = 10 - parseInt(roll1);
    }

    var bonusRolls = [roll1, roll2];

    for (var i = 0; i < 2; i++) {
        var roll = bonusRolls[i];

        // X is a 10 from Rome ;)
        if (roll === 'X') {
            bonus += 10;
        }
        else {
            bonus += parseInt(roll);
        }
    }

    return bonus;
};

BowlingGame.prototype.computeScore = function () {
    var rollsScoreList = this.rollsScoreList;
    var score = 0;
    var i = 0;
    var f = 0;

    while (f < 10) {
        if (rollsScoreList[i] === 'X') {
            score += (10 + this.computeBonus(rollsScoreList[i+1], rollsScoreList[i+2]));
            i++;
        }
        else if (rollsScoreList[i+1] === '/') {
            score += (10 + this.computeBonus(rollsScoreList[i+2]));
            i += 2;
        }
        else {
            score += parseInt(rollsScoreList[i]) + parseInt(rollsScoreList[i+1]);
            i += 2;
        }

        f++;
    }

    return score;
};

module.exports = BowlingGame;
