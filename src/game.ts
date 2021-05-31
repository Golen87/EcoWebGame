import 'phaser';
import { MainScene } from './scenes/mainScene';
import { PreloadScene } from './scenes/PreloadScene';

const config: GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [
		PreloadScene,
		MainScene
	],
};

const game = new Phaser.Game(config);