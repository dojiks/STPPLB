exports.BattleStatuses = {
	scrubterrain: {
		effectType: 'Weather',
		duration: 0,
		onAccuracy: function(accuracy, target, source, move) {
			if (source.hasAbility('keeneye')) return;
			return this.chainModify(0.6);
		},
		onStart: function() {
			this.add('-weather', 'ScrubTerrain');
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'ScrubTerrain', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function () {
			this.add('-weather', 'none');
		}
	}
}