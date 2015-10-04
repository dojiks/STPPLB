exports.BattleFormats = {
	superglitchclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Super Glitch Clause: Every pokemon must hold a Leppa Berry and know Recycle and Super Glitch. No Fun Allowed is banned.');
		},
		validateSet: function(set) {
			issues = [];
			set.item = 'Leppa Berry';
			var metronomeFound = false;
			var recycleFound = false;
			var i;
			var movesLength = set.moves.length;
			for (i = 0; i < movesLength; i++) {
				var move = set.moves[i];
				switch (move.toLowerCase()) {
				case 'superglitch':
					if (metronomeFound) {
						issues.push(set.species + " cannot have more than one Super Glitch.");
					}
					metronomeFound = true;
					break;
				case 'recycle':
					if (recycleFound) {
						issues.push(set.species + " cannot have more than one Recycle.");
					}
					recycleFound = true;
					break;
				// Allow empty move.
				case '':
					break;
				default:
					issues.push(set.species + " cannot have " + move + ".");
					break;
				}
			}
			if (!metronomeFound) {
				set.moves = set.moves.concat('superglitch');
			}
			if (!recycleFound) {
				set.moves.push("Recycle");
			}
			if (toId(set.ability) === 'nofunallowed')
				issues.push(set.species + " has No Fun Allowed.");
			var totalEV = 0;
			for (var k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				issues.push(set.species + " has more than 510 total EVs.");
			}
			return issues;
		}
	},
	
	noswitchingclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Switching Clause: Cannot switch');
		},
		onModifyPokemon: function (pokemon) {
			if (!pokemon.volatiles['imprison']) {
				pokemon.tryTrap();
			}
			else {
				pokemon.side.switchFlag = true;
			}
		}
	},
	
	norecycleclause: {
		effectType: 'rule',
		onStart: function () {
			this.add('rule', 'No Recycle Clause: Cannot use Recycle while holding Leppa Berry');
		},
		onModifyPokemon: function (pokemon) {
			if ((pokemon.item || !pokemon.lastItem) && !(pokemon.volatiles.torment && pokemon.lastMove === 'metronome')) {
				var moves = pokemon.moveset;
				var pp = 0;
				var recycle = null;
				for (var i = 0; i < moves.length; i++) {
					if (moves[i].id === 'recycle') {
						recycle = i;
					}
					else {
						pp += moves[i].pp * !moves[i].disabled;
					}
				}
				if (pp && recycle !== null) {
					moves[recycle].disabled = true;
				}
			}
		}
	},
	
	abilityclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Ability Clause: Limit one of each ability');
		},
		validateTeam: function (team, format) {
			var abilityTable = {};
			for (var i = 0; i < team.length; i++) {
				var ability = toId(team[i].ability);
				if (!ability) continue;
				if (ability in abilityTable) {
					if (abilityTable[ability] >= 1) {
						return ["You are limited to one of each ability by the Ability Clause.", "(You have more than one " + this.getAbility(ability).name + ")"];
					}
					abilityTable[ability]++;
				} else {
					abilityTable[ability] = 1;
				}
			}
		}
	}
}