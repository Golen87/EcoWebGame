import { BaseScene } from "../scenes/BaseScene";

export class Slider extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private _value: number;
	private background: Phaser.GameObjects.Rectangle;
	private button: Phaser.GameObjects.Ellipse;
	private maxV: number;
	private maxX: number;
	private minV: number;
	private minX: number;
	private targetX: number;
	private steps: number;
	private thinHeight: number;

	constructor(scene: BaseScene, x: number, y: number, width: number, height: number, thinHeight: number, steps: number=0) {
		super(scene, x, y);
		this.scene = scene;
		this.width = width;
		this.height = height;
		this.thinHeight = thinHeight;
		this.steps = steps;


		// Slider background
		this.background = (scene.add as any).rexRoundRectangle(0, 0, width + thinHeight, thinHeight, thinHeight/2, 0XFFFFFF);
		this.background.setAlpha(0.5);
		this.add(this.background);

		const padding = thinHeight + height;
		this.background.setInteractive({ hitArea: this.background, useHandCursor: true, draggable: true })
			.on('pointerdown', this.onDown.bind(this))
			.on('drag', this.onDrag.bind(this));
		this.background.input.hitArea.setTo(-padding, -padding, this.background.width+2*padding, this.background.height+2*padding);
		// this.scene.input.enableDebug(this.background);


		// Step notches
		if (steps > 0) {
			for (let i = 0; i < steps; i++) {
				let x = -width/2 + i / (steps - 1) * width;
				let y = 0;
				let size = 0.75 * thinHeight;

				let notch = scene.add.ellipse(x, y, size, size, 0x000000);
				notch.setAlpha(0.5);
				this.add(notch);
			}
		}


		// Slider button
		this.button = scene.add.ellipse(0, 0, height, height, 0xFFFFFF);
		this.targetX = this.button.x;
		this.add(this.button);

		this.minX = -width/2;
		this.maxX = width/2;
		this.minV = 0;
		this.maxV = 1;
		this._value = 0.5;
	}


	setRange(min: number, max: number) {
		this.minV = min;
		this.maxV = max;
		this.value = this._value; // Will clamp
	}

	set value(value: number) {
		value = Phaser.Math.Clamp(value, this.minV, this.maxV);
		this._value = value;
		this.emit('onChange', this._value);

		let fac = (value - this.minV) / (this.maxV - this.minV);
		let x = this.minX + fac * (this.maxX - this.minX);
		this.button.x = this.targetX = x;
	}

	get value(): number {
		return this._value;
	}


	onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		let x = localX - this.background.width/2;
		this.background.input.dragStartX = x;
		this.onDrag(pointer, x, 0);
	}

	onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
		// Clamp x-coord
		dragX = Phaser.Math.Clamp(dragX, this.minX, this.maxX);

		// If slider is segmented, find value, round it to step, and convert back to position
		if (this.steps > 0) {
			let value = (dragX - this.minX) / (this.maxX - this.minX);
			value = Math.round(value * (this.steps-1)) / (this.steps-1);
			dragX = this.minX + value * (this.maxX - this.minX);
		}

		this.targetX = dragX;

		// Update value based on button's x-coord
		let baseValue = (dragX - this.minX) / (this.maxX - this.minX);
		let scaledValue = this.minV + baseValue * (this.maxV - this.minV);
		this._value = scaledValue;

		this.emit('onChange', this._value);
	}

	lock() {
		this.button.removeInteractive();
		this.button.fillColor = 0x555555;
		this.background.fillColor = 0x555555;
	}

	update(time: number, delta: number) {
		// Approach target position gradually
		this.button.x += 0.5 * (this.targetX - this.button.x);
	}
}