exports.BattleScripts = {
	randomtpplbTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				baseSignatureMove: 'darkpulse', signatureMove: 'Darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				baseSignatureMove: 'metronome', signatureMove: "(Super Glitch)",
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				baseSignatureMove: 'drainpunch', signatureMove: 'TM56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				baseSignatureMove: 'triattack', signatureMove: 'Hex Attack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'Poomph': {
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				baseSignatureMove: 'armthrust', signatureMove: 'Projectile Spam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				baseSignatureMove: 'bulkup', signatureMove: 'BULK!!',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				baseSignatureMove: 'shadowsneak', signatureMove: 'Shadow Rush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			/*"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				baseSignatureMove: 'metronome', signatureMove: 'Parting Volt Turn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},*/
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				baseSignatureMove: 'tailslap', signatureMove: 'Evolution Beam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				baseSignatureMove: 'thunderbolt', signatureMove: 'Hyper WAHAHAHAHAHA',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				baseSignatureMove: 'disappointment', signatureMove: 'Disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			/*"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				baseSignatureMove: 'surf', signatureMove: 'Broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},*/
			/*'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				baseSignatureMove: 'flamethrower', signatureMove: 'BEST F-CAR',
				evs: {atk:252,def:4,spe:252}, nature: 'Adamant'
			}*/
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.baseSignatureMove); // always have sig move.
			team.push(set);
		}
		return team;
	},
	randomtpplbpTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				baseSignatureMove: 'darkpulse', signatureMove: 'Darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				baseSignatureMove: 'metronome', signatureMove: "(Super Glitch)",
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				baseSignatureMove: 'drainpunch', signatureMove: 'TM56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				baseSignatureMove: 'triattack', signatureMove: 'Hex Attack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'Poomph': {
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				baseSignatureMove: 'armthrust', signatureMove: 'Projectile Spam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				baseSignatureMove: 'bulkup', signatureMove: 'BULK!!',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				baseSignatureMove: 'shadowsneak', signatureMove: 'Shadow Rush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				baseSignatureMove: 'metronome', signatureMove: 'Parting Volt Turn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				baseSignatureMove: 'tailslap', signatureMove: 'Evolution Beam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				baseSignatureMove: 'thunderbolt', signatureMove: 'Hyper WAHAHAHAHAHA',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				baseSignatureMove: 'disappointment', signatureMove: 'Disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				baseSignatureMove: 'surf', signatureMove: 'Broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			/*'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				baseSignatureMove: 'flamethrower', signatureMove: 'BEST F-CAR',
				evs: {atk:252,def:4,spe:252}, nature: 'Adamant'
			}*/
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.baseSignatureMove); // always have sig move.
			team.push(set);
		}
		return team;
	},
	randomtppbTeam: function(side) {
		var team = [];
		var variant = this.random(2);
		var sets = { // this is where all the movesets are defined. Add new mons here.
			'darkfiregamer': {
				species: "Houndoom", ability: "Dark Aura", item: "Dark Gem", gender: "M",
				moves: ['moonblast', 'hyperbeam', 'fireblast'],
				baseSignatureMove: 'darkpulse', signatureMove: 'Darkfire',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'xfix': {
				species: 'Xatu', ability: 'Magic Bounce', item: 'Focus Sash', gender: 'M',
				moves: ['thunderwave', 'substitute', 'roost'],
				baseSignatureMove: 'metronome', signatureMove: "(Super Glitch)",
				evs: {hp:252, spd:252, def:4}, nature: 'Calm'
			},
			'azum4roll': {
				species: "Azumarill", ability: "Glitchiate", item: "Metronome", gender: 'M',
				moves: ['rollout', 'batonpass', 'swordsdance', 'bellydrum', 'extremespeed', 'playrough', 'thunderwave'],
				baseSignatureMove: 'drainpunch', signatureMove: 'TM56',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant'
			},
			'Iwamiger': {
				species: "Gengar", ability: 'Serene Grace Plus', item: "Life Orb", gender: 'M',
				moves: ['shadowball', 'flamethrower', 'icebeam', 'crunch'],
				baseSignatureMove: 'triattack', signatureMove: 'Hex Attack',
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid'
			},
			'Poomph': {
				species: "Lucario", ability: "Scrappy", item: 'Assault Vest', gender: 'M',
				moves: ['rockwrecker', 'megahorn', 'bulletpunch'],
				baseSignatureMove: 'armthrust', signatureMove: 'Projectile Spam',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly'
			},
			'TieSoul': {
				species: 'Rhyperior', ability: 'Rock Head', item: 'Focus Sash', gender: 'M',
				moves: ['headsmash', 'autotomize', 'earthquake'],
				baseSignatureMove: 'bulkup', signatureMove: 'BULK!!',
				evs: {hp:252, def:252, spe:4}, nature: 'Impish'
			},
			"Soma's Ghost": {
				species: 'Herdier', ability: 'Spoopify', item: 'Leftovers', gender: 'M',
				moves: ['playrough', 'swordsdance', 'substitute'],
				baseSignatureMove: 'shadowsneak', signatureMove: 'Shadow Rush',
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly'
			},
			"Lass zeowx": { // STPPLB+ only
				species: 'Liepard', ability: 'Protean', item: 'Focus Sash', gender: 'F',
				moves: ['suckerpunch', 'shadowsneak', 'bulletpunch', 'playrough', 'spikes', 'acrobatics'].sample(2).concat('fakeout'), // always have Fake Out.
				baseSignatureMove: 'metronome', signatureMove: 'Parting Volt Turn',
				evs: {atk:252, spa:12, spe:244}, nature: 'Hasty'
			},
			"Eeveelutionlvr": {
				species: 'Eevee', ability: 'Proteon', item: 'Eviolite', gender: 'M',
				moves: ['hydropump', 'flareblitz', 'thunderbolt', 'batonpass', 'nastyplot', 'dazzlinggleam', 'energyball', 'leechseed', 'blizzard', 'nightslash', 'psychic', 'hyperbeam'], // azum stop nagging about this moveset.
				baseSignatureMove: 'tailslap', signatureMove: 'Evolution Beam',
				evs: {spa:252, spe:252, hp:4}, nature: 'Timid'
			},
			'sohippy': {
				species: 'Rotom-Wash', ability: 'Swahahahahaggers', item: 'Leftovers', gender: 'M',
				moves: ['scald', 'painsplit', 'destinybond', 'voltswitch', 'swagger', 'taunt', 'foulplay', 'hex', 'hydropump', 'electricterrain'],
				baseSignatureMove: 'thunderbolt', signatureMove: 'Hyper WAHAHAHAHAHA',
				evs: {hp:252, spa:252, spd:4}, nature: 'Modest'
			},
			'Kooma9': {
				species: 'Blastoise-Mega', ability: 'Psychologist', item: 'Focus Sash', gender: 'M',
				moves: ['scald', 'roar', 'toxic'],
				baseSignatureMove: 'disappointment', signatureMove: 'Disappointment',
				evs: {hp:252, def:252, spa:4}, nature: 'Bold'
			},
			"Kap'n Kooma": { // STPPLB+ only
				species: 'Kingdra', ability: 'Sea and Sky', item: 'Choice Specs', gender: 'M',
				moves: ['steameruption', 'dracometeor', 'thunder'],
				baseSignatureMove: 'surf', signatureMove: 'Broadside',
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest'
			},
			'BEST': { // STPPB only
				species: 'Typhlosion', ability: 'Technician', item: 'Life Orb', gender: 'M',
				moves: ['waterpulse', 'hiddenpowerice', 'shockwave'],
				ivs: {atk:30, def:30}, // in order for HP Ice to be a thing.
				baseSignatureMove: 'flamethrower', signatureMove: 'BEST F-CAR',
				evs: {spa:252,def:4,spe:252}, nature: 'Modest'
			}
		};
		var pool = Object.keys(sets).randomize();
		for (var i = 0; i < Math.min(6, pool.length); i++) {
			var set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) { // set 31 for unspecified IVs.
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (var iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.baseSignatureMove); // always have sig move.
			team.push(set);
		}
		return team;
	}
}