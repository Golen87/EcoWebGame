import { nodeImages } from '../data/serengetiData';
import { createText } from "../utils";


export class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'PreloadScene'});
	}

	public preload() {
		// Loading bar
		let width = 0.5 * this.W;
		let x = this.CX - width/2;
		let y = this.CY;
		let bg = this.add.rectangle(x, y, width, 4, 0x444444).setOrigin(0, 0.5);
		let bar = this.add.rectangle(x, y, width, 6, 0xBBBBBB).setOrigin(0, 0.5);

		// Loading text
		let text = createText(this, x, y, 14, "#BBB", "Loading...").setOrigin(0, 1.5);

		// Listener
		this.load.on('progress', (progress) => {
			bar.width = progress * width;
		});


		// Load images
		for (let image of nodeImages) {
			this.load.image(image.key, image.path);
		}
	}

	public create() {
		//web.startScenario(0);
		// window.simulator.loadScenario(database.scenarios[0]);
		// window.simulator2.loadScenario(database.scenarios[0]);
		// this.scene.start("TitleScene");
		// this.scene.start("WorldScene");
		// this.scene.start("LevelScene2");
		// this.scene.start("LevelScene3");
		this.scene.start("MainScene");

		// for (let image of nodeImages) {
			// this.add.image(Math.random()*800, Math.random()*600, image.key).setScale(1.0);
		// }
	}

	public update(time, delta) {
	}


	private get W() { return this.cameras.main.displayWidth; }
	private get H() { return this.cameras.main.displayHeight; }
	private get CX() { return this.cameras.main.centerX; }
	private get CY() { return this.cameras.main.centerY; }

	private fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}

	private containToScreen(image) {
		image.setScale(Math.min(this.W / image.width, this.H / image.height));
	}
}