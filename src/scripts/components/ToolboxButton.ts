import { BaseNode } from "./nodes/BaseNode";

export class ToolboxButton extends BaseNode {
	private image: Phaser.GameObjects.Image;
	private size: number;

	constructor(scene, x: number, y: number, size: number, image: string) {
		super(scene, x, y);
		this.size = size;

		this.image = scene.add.image(0, 0, image);
		this.image.setScale(size / this.image.height);
		this.image.setAlpha(0.65);
		this.add(this.image);

		this.bindInteractive(this.image);
		let sep = 1.75/2 * size;
		this.image.input.hitArea.setTo(-sep, -sep, this.image.width+2*sep, this.image.height+2*sep);
	}

	update(time, delta) {
		this.setScale(1 - 0.1 * this.holdSmooth);
	}

	setTexture(key: string) {
		this.image.setTexture(key);
		let sep = 0.75/2;
	}
}