import { BaseScene } from "../../scenes/BaseScene";
import { NODE_SIZE } from "../../constants";

export class BaseNode extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public liftSmooth: number;
	private hover: boolean;
	public hold: boolean;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.hover = false;
		this.hold = false;

		this.liftSmooth = 0;
	}

	bindInteractive(gameObject, draggable=false) {
		gameObject.removeInteractive();
		gameObject.setInteractive({ useHandCursor: true, draggable: draggable })
			.on('pointerout', this.onOut, this)
			.on('pointerover', this.onOver, this)
			.on('pointerdown', this.onDown, this)
			.on('pointerup', this.onUp, this)
			.on('dragstart', this.onDragStart, this)
			.on('drag', this.onDrag, this)
			.on('dragend', this.onDragEnd, this);
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


	update(time, delta) {
		this.setDepth(1 + this.liftSmooth);
	}
}