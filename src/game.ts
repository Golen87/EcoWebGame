import "phaser";
import { PreloadScene } from "./scripts/scenes/PreloadScene";
import { SerengetiScene } from "./scripts/scenes/SerengetiScene";
import { EcowebScene } from "./scripts/scenes/EcowebScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL, // Phaser.AUTO
	// width: 16*70*1.5,
	// height: 9*70*1.5,
	width: 1920,
	height: 1080,
	scale: {
		mode: Phaser.Scale.FIT
		// mode: Phaser.Scale.RESIZE
	},
	scene: [
		PreloadScene,
		SerengetiScene,
		EcowebScene,
	],
	plugins: {
		global: [
		]
	}
};

const game = new Phaser.Game(config);