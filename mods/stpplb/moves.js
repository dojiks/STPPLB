exports.BattleMovedex = {
	"disappointment": {
		num: 622,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user faints and the Pokemon brought out to replace it has its HP fully restored along with having any major status condition cured and getting a boost in all stats. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "User faints. Replacement is fully healed with boosts.",
		id: "disappointment",
		isViable: true,
		name: "Disappointment",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryHit: function (pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfdestruct: true,
		sideCondition: 'disappointment',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Disappointment started on ' + side.name);
				this.effectData.positions = [];
				for (var i = 0; i < side.active.length; i++) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				if (!this.effectData.positions[target.position]) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					this.boost({atk:1,def:1,spa:1,spd:1,spe:1}, target);
					this.add('-heal', target, target.getHealth, '[from] move: Disappointment');
					this.effectData.positions[target.position] = false;
				}
				if (!this.effectData.positions.any(true)) {
					target.side.removeSideCondition('disappointment');
				}
			}
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	'darkfire': {
		num: 623,
		name: 'Darkfire',
		id: 'darkfire',
		basePower: 90,
		accuracy: 100,
		category: 'Special',
		target: 'any',
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fire', type); // includes Fire in its effectiveness.
		},
		self: {
			onHit: function(pokemon) { // Mega evolves dfg
					var temp = pokemon.item;
					pokemon.item = 'houndoominite'; // in order to make it mega evolvable, add a Houndoomite temporarily.
					if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon); // don't mega evolve if it's already mega
					if (pokemon.canMegaEvo) this.runMegaEvo(pokemon);
					pokemon.item = temp; // give its normal item back.
				}
		},
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		},
		priority: 0,
		pp: 15,
		type: 'Dark'
	},
	'superglitch': {
		num: 624,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "A random move is selected for use, other than After You, Assist, Belch, Bestow, Celebrate, Chatter, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Diamond Storm, Endure, Feint, Focus Punch, Follow Me, Freeze Shock, Happy Hour, Helping Hand, Hold Hands, Hyperspace Hole, Ice Burn, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Protect, Quash, Quick Guard, Rage Powder, Relic Song, Secret Sword, Sketch, Sleep Talk, Snarl, Snatch, Snore, Spiky Shield, Steam Eruption, Struggle, Switcheroo, Techno Blast, Thief, Thousand Arrows, Thousand Waves, Transform, Trick, V-create, or Wide Guard.",
		shortDesc: "Picks a random move.",
		id: "superglitch",
		name: "(Super Glitch)",
		pp: 10,
		priority: 0,
		multihit: [2, 5],
		flags: {},
		onHit: function (target) {
			var moves = [];
			for (var i in exports.BattleMovedex) {
				var move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				var noMetronome = {
					afteryou:1, assist:1, belch:1, bestow:1, celebrate:1, chatter:1, copycat:1, counter:1, covet:1, craftyshield:1, destinybond:1, detect:1, diamondstorm:1, dragonascent:1, endure:1, feint:1, focuspunch:1, followme:1, freezeshock:1, happyhour:1, helpinghand:1, holdhands:1, hyperspacefury:1, hyperspacehole:1, iceburn:1, kingsshield:1, lightofruin:1, matblock:1, mefirst:1, metronome:1, mimic:1, mirrorcoat:1, mirrormove:1, naturepower:1, originpulse:1, precipiceblades:1, protect:1, quash:1, quickguard:1, ragepowder:1, relicsong:1, secretsword:1, sketch:1, sleeptalk:1, snarl:1, snatch:1, snore:1, spikyshield:1, steameruption:1, struggle:1, switcheroo:1, technoblast:1, thief:1, thousandarrows:1, thousandwaves:1, transform:1, trick:1, vcreate:1, wideguard:1
				};
				if (!noMetronome[move.id]) {
					moves.push(move);
				}
			}
			var move = '';
			if (moves.length) {
				moves.sort(function (a, b) {return a.num - b.num;});
				move = moves[this.random(moves.length)].id;
			}
			if (!move) {
				return false;
			}
			this.useMove(move, target);
		},
		onTryHit: function (target, source) { // can cause TMTRAINER effect randomly
			if (!source.isActive) return null;
			if (this.random(777) !== 42) return; // 1/777 chance to cause TMTRAINER effect
			var opponent = pokemon.side.foe.active[0];
			opponent.setStatus('brn');
			var possibleStatuses = ['confusion', 'flinch', 'attract', 'focusenergy', 'foresight', 'healblock'];
			for (var i = 0; i < possibleStatuses.length; i++) {
				if (this.random(3) === 1) {
					opponent.addVolatile(possibleStatuses[i]);
				}
			}

			function generateNoise() { // make some random glitchy text.
				var noise = '';
				var random = this.random(40, 81);
				for (var i = 0; i < random; i++) {
					if (this.random(4) !== 0) {
						// Non-breaking space
						noise += '\u00A0';
					} else {
						noise += String.fromCharCode(this.random(0xA0, 0x3040));
					}
				}
				return noise;
			}
			// weird effects.
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is frozen solid?)");
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER " + opponent.name + " is hurt by its burn!)");
			this.damage(opponent.maxhp * this.random(42, 96) * 0.01, opponent, opponent);
			var exclamation = source.status === 'brn' ? '!' : '?';
			this.add('-message', "(Enemy " + generateNoise.call(this) + " TMTRAINER @xfix is hurt by its burn" + exclamation + ")");
			this.damage(source.maxhp * this.random(24, 48) * 0.01, source, source);
			return null;
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	'tm56': {
		num: 625,
		name: 'TM56',
		id: 'tm56',
		type: 'Bird',
		basePower: 205,
		accuracy: 37,
		pp: 16,
		category: 'Physical',
		onPrepareHit: function(target, source) { // Turns target and user into Bird-type.
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Calm Mind', source);
			if (!source.hasType('Bird')) { // turn user into Bird-type and spout glitchy nonsense.
				this.add("c|azum4roll|9̜͉̲͇̱̘̼ͬ̈́̒͌̑̓̓7ͩ͊̚5ͨ̆͐͏̪̦6̗͎ͬ̿̍̍̉ͧ͢4̯̠ͤ͛͐̄͒͡2͐ͬ̀d̺͉̜̈ͯ̓x̩̖̥̦̥͛́ͥ͑̈́ͩ͊͠║̛̥̜̱̝͍͒̌ͣ̀͌͌̒'̣͎̗̬̯r̸̗͍ͫ̓͆ͣ̎͊ ̜̻̈D͓̰̳̝̥̙͙͋̀E͉͔̥͇̫͓͍̔ͬͣ͂̓̽x̰̗̬̖͊̏̄̑̒̿͊s̜̪̏́f̧̯̼̦̓͌̇̒o̱̾̓ͩ̆̓̀F̟̰͓̩̂̆͛ͤ▓̣̩̝̙̇̓͒͋̈͡1̡̹̹͓̬͖͐̑̉̔̏xͥ̀'̻͖͍̠̉͡v̫̼̹̳̤̱͉▓̄̏͂ͤͭ̋ͫ͏̠̦̝▓̟͉͇̣̠̦̓̄ͫͥ̐̍̂▓͔̦̫̦̜̖́▓͍ͯ͗̾͆▓̮̗̠̜͙̹̟͊̎ͤ̔̽ͬ̃▓̩̟̏ͪ̇̂̂̒▓̖̼̤͉ͤ̾̋ͥͣͬ͒▓̈́̿͂̌̓▓͇̞̗̽̔̂͊̌ͣ͐▓ͬ́ͥ̔͒͒̎▓̰̪̫̩͇̲̇̔̿͢ͅ▓̞̬͎▓̖͍̖̫ͪ͐̆̅̍̂ͨͅ▓̡̭̠̗̳̬̜̝▓̤͙̥̆̌ͨͪ̆͌▓̴͉̩̈́▓ͩ̌̌̂̿̑̐▓ͨ҉͕̠͍▓̹̌̅̂ͨ͋̃͑▓̯̰̣̝̯ͭͦ̂͋̇̾͠▓̸̺̣̜̯̙̂͋̈ͨ̎̾ͧ▓͢▓͔̚▓̭͎͖̟̼̄̈̃̎́▓̧̌ͧ▓̼̹͈͗̄̆");
				source.setType('Bird');
				this.add('-start', source, 'typechange', 'Bird');
			}
			if (target.hasType('Bird')) return true;
			target.setType('Bird');
			this.add('-start', target, 'typechange', 'Bird');
		},
		onMoveFail: function (target, source, move) {
			this.boost({accuracy:1, evasion:1}, source);
		},
	},
	'hexattack': {
		num: 626,
		name: 'Hex Attack',
		id: 'hexattack',
		type: 'Ghost',
		category: 'Special',
		basePower: 100,
		accuracy: 90,
		pp: 8,
		onPrepareHit: function(target, source, move) { // animation
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Tri Attack', target);
		},
		secondary: {
			chance: 20,
			onHit: function (target, source) { // random status.
				var result = this.random(6);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else if (result === 2) {
					target.trySetStatus('frz', source);
				} else if (result === 3) {
					target.addVolatile('confusion');
				} else if (result === 4) {
					target.addVolatile('attract');
				} else {
					target.trySetStatus('slp', source);
				}
			}
		}
	}
}