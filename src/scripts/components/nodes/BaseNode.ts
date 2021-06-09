import { BaseScene } from "../../scenes/BaseScene";
import { NODE_SIZE } from "../../constants";

// TODO: Remove Button
export class BaseNode extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public liftSmooth: number;
	public hover: boolean;
	public hold: boolean;
	// public callback?: () => void;
	// public image: any;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.hover = false;
		this.hold = false;

		this.liftSmooth = 0;

		// this.callback = callback;

		// this.image = scene.add.image(0, 0, image);
		// this.image.origScale = size / this.image.height;
		// this.image.setScale(this.image.origScale);
		// // this.image.setScrollFactor(0);
		// this.add(this.image);

		// this.onOut();
	}

	bindInteractive(gameObject, draggable=false) {
		gameObject.removeInteractive();
		gameObject.setInteractive({ useHandCursor: true, draggable: draggable })
			.on('pointerout', this.onOut.bind(this))
			.on('pointerover', this.onOver.bind(this))
			.on('pointerdown', this.onDown.bind(this))
			.on('pointerup', this.onUp.bind(this))
			.on('dragstart', this.onDragStart.bind(this))
			.on('drag', this.onDrag.bind(this))
			.on('dragend', this.onDragEnd.bind(this));
	}

	onOut(pointer: Phaser.Input.Pointer, event: Phaser.Types.Input.EventData) {
		this.hover = false;
		this.hold = false;
	}

	onOver(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		this.hover = true;
	}

	onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		this.hold = true;
	}

	onUp(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		if (this.hold) {
			this.hold = false;
			// if (this.callback) {
				// this.callback();
			// }
		}
	}

	onDragStart(pointer, dragX, dragY) {}

	onDrag(pointer, dragX, dragY) {}

	onDragEnd(pointer, dragX, dragY, dropped) {}


	isInsidePlayingField(): boolean {
		return false;
	}

	get alive(): boolean {
		return false;
	}

	getWidth(): number {
		return NODE_SIZE;
	}
}