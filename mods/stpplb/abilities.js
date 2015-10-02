exports.BattleAbilities = { // define custom abilities here.
	"glitchiate": {
		desc: "This Pokemon's moves become Bird-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's moves become Bird type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.id !== 'struggle' && move.type !== 'Bird') { // don't boost moves if they are already Bird-type (TM56). Also don't mess with Struggle.
				move.type = 'Bird';
				if (move.category !== 'Status') pokemon.addVolatile('glitchiate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]); // not sure how this one works but this was in the Aerilate code in Pokemon Showdown.
			}
		},
		id: "glitchiate",
		name: "Glitchiate",
		rating: 3.5,
		num: 192
	},
	"serenegraceplus": {
		desc: "This Pokemon's moves have their secondary chances multiplied by 3.",
		shortDesc: "This Pokemon's moves have their secondary chances multiplied by 3.",
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries && move.id !== 'secretpower') {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 3;
				}
			}
		},
		id: "serenegraceplus",
		name: "Serene Grace Plus",
		rating: 5,
		num: 193
	},
	'spoopify': {
		desc: "Makes stuff Ghost on switch-in.",
		shortDesc: 'b', // got lazy
		onStart: function(pokemon) {
			activeFoe = pokemon.side.foe.active;
			for (var i = 0; i < activeFoe.length; i++) {
				var pokemon = activeFoe[i];
				var secondarytype = (pokemon.typesData[1] ? pokemon.typesData[1].type : false);
				this.add('-start', pokemon, 'typechange', 'Ghost' + (secondarytype ? '/' + secondarytype : ''));
				pokemon.typesData[0] = {type: 'Ghost', suppressed: false,  isAdded: false};
			}
		},
		id: "spoopify",
		name: "Spoopify",
		rating: 4,
		num: 194
	},
	'scrubterrain': { // MLZekrom pls
	                  // Scrub Terrain was really hacky. Happy it's out of the meta.
		desc: '',
		shortDesc: '',
		onStart: function(pokemon) {
			this.setWeather('scrubterrain');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'scrubterrain' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1, scrubterrain:1})) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (var i = 0; i < this.sides.length; i++) {
				for (var j = 0; j < this.sides[i].active.length; j++) {
					var target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('scrubterrain')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		id: 'scrubterrain',
		name: 'Scrub Terrain',
		rating: 4,
		num: 195
	},
	'proteon': { // Eeveelutionlvr's ability.
		desc: '',
		shortDesc: '',
		onPrepareHit: function (source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				var species = '';
				if (type === 'Electric') {
					species = 'Jolteon';
				} else if (type === 'Normal') {
					species = 'Eevee';
				} else if (type === 'Water') {
					species = 'Vaporeon';
				} else if (type === 'Fire') {
					species = 'Flareon';
				} else if (type === 'Psychic') {
					species = 'Espeon';
				} else if (type === 'Dark') {
					species = 'Umbreon';
				} else if (type === 'Ice') {
					species = 'Glaceon';
				} else if (type === 'Grass') {
					species = 'Leafeon';
				} else if (type === 'Fairy') {
					species = 'Sylveon';
				}
				if (species !== '' && source.template.speciesid !== toId(species)) { // don't transform if type is not an eeveelution type or you are already that eeveelution.
					source.formeChange(species);
					this.add('-formechange', source, species, '[msg]');
					source.setAbility('proteon');
				}
			}
		},
		id: 'proteon',
		name: 'Proteon',
		rating: 4.5,
		num: 196
	},
	'swahahahahaggers': { // Sohippy's ability: con on switch-in.
		onImmunity: function (type) {
			if (type === 'Ground') return false;
		},
		onStart: function(pokemon) {
			activeFoe = pokemon.side.foe.active;
			for (var i = 0; i < activeFoe.length; i++) {
				var pokemon = activeFoe[i];
				pokemon.addVolatile('confusion');
			}
		},
		id: 'swahahahahaggers',
		name: 'Swahahahahaggers',
		rating: 4,
		num: 197
	},
	'psychologist': { // Kooma's ability: immune to all "mental" volatile statuses.
		onUpdate: function (pokemon) {
			var list = ['embargo', 'encore', 'flinch', 'healblock', 'attract', 'nightmare', 'taunt', 'torment', 'confusion'];
			for (var i = 0; i < list.length; i++)
				if (pokemon.volatiles[list[i]])
					pokemon.removeVolatile(list[i]);
		},
		onImmunity: function (type, pokemon) {
			var list = ['embargo', 'encore', 'flinch', 'healblock', 'attract', 'nightmare', 'taunt', 'torment', 'confusion'];
			for (var i = 0; i < list.length; i++)
				if (type === list[i]) {
					this.add('-immune', pokemon, list[i]);
					return false;
				}
		},
		id: 'psychologist',
		name: 'Psychologist',
		rating: 4,
		num: 198
	},
	'seaandsky': { // Kap'n Kooma's ability: Primordial Sea plus Swift Swim.
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (var i = 0; i < this.sides.length; i++) {
				for (var j = 0; j < this.sides[i].active.length; j++) {
					var target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.ability === 'primordialsea' && target.ignore['Ability'] !== true) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		onModifySpe: function (speMod, pokemon) { // the swift swim portion which apparently doesn't work.
			return this.chain(speMod, 2);
		},
		id: 'seaandsky',
		name: 'Sea and Sky',
		rating: 4,
		num: 199
	}
}
"messiah": {
		desc: "This Pokemon blocks certain status moves and instead uses the move against the original user. Increases Sp.Attack by 2",
		shortDesc: "This Pokemon blocks certain status moves and bounces them back to the user. Boosts Sp.Attack by 2",
		id: "messiah",
		name: "Messaiah",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			var newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			var newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		effect: {
			duration: 1
		},
		rating: 4.5,
		num: 200
	},
