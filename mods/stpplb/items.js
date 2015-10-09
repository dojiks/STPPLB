exports.BattleItems = {
	"lunchabylls": {
		id: "lunchabylls",
		name: "Lunchabylls",
		num: 444,
		spritenum: 242,
		fling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (pokemon.status) {
				this.heal(pokemon.maxhp / 8);
			} else {
				this.heal(pokemon.maxhp / 16);
			}
		},
		gen: 7,
		desc: "At the end of every turn, holder restores 1/16 of its max HP. Recovers 1/8th hp if statused"
	}
}