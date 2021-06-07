import { Button } from "./Button";

export class CircleButton extends Button {
	public callback: () => void;
	public image: any;

	constructor(scene, x, y, size, callback, image='circle') {
		super(scene, x, y);
		// scene.add.existing(this);
		this.callback = callback;

		this.image = scene.add.image(0, 0, image);
		this.image.origScale = size / this.image.height;
		this.image.setScale(this.image.origScale);
		// this.image.setScrollFactor(0);
		this.add(this.image);

		this.onOut();
	}

	onUp() {
		this.callback();
		this.onOver();
	}
}