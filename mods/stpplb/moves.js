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
}