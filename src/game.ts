import 'phaser';
import { MainScene } from './scenes/mainScene';
import { PreloadScene } from './scenes/PreloadScene';
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

const config: GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [
		PreloadScene,
		MainScene
	],
	plugins: {
		global: [
			{
				key: "rexRoundRectanglePlugin",
				plugin: RoundRectanglePlugin,
				start: true
			}
		]
	}
};

const game = new Phaser.Game(config);