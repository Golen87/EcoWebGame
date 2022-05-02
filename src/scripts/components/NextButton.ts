import { BaseScene } from "../scenes/BaseScene";
import { BaseNode } from "./nodes/BaseNode";
import { RoundRectangle } from "./RoundRectangle";
import { language } from "../language/LanguageManager";
import { interpolateColor } from "../utils";

export class NextButton extends BaseNode {
	public scene: BaseScene;

	private bgOuter: RoundRectangle;
	private bgInner: RoundRectangle;
	private text: Phaser.GameObjects.Text;
	private color: number;

	constructor(scene: BaseScene, x: number, y: number, size: number, color: number) {
		super(scene, x, y);
		this.scene = scene;
		this.color = color;
		scene.add.existing(this);

		this.bgOuter = new RoundRectangle(scene, 0, 0, 0, 0, size/2+5, 0, color > 0 ? 0.5 : 0.01);
		this.add(this.bgOuter);

		this.bgInner = new RoundRectangle(scene, 0, 0, size, size, size/2, color, color > 0 ? 0.9 : 0.4);
		this.bindInteractive(this.bgInner);
		this.add(this.bgInner);

		this.text = scene.createText(0, 0, size/2, scene.weights.bold, "#FFF", "...");
		this.text.setOrigin(0.5);
		this.add(this.text);
	}

	update(time, delta) {
		this.setScale(1.0 - 0.1 * this.holdSmooth);
	}

	setText(key: string) {
		language.bind(this.text, key, this.resize.bind(this));
	}

	badSetText(text: string) {
		this.text.setText(text);
		this.resize();
	}

	resize() {
		this.bgInner.setWidth(this.text.width + 2*this.bgInner.height);
		this.bgOuter.setWidth(this.bgInner.width + 10);

		// Add padding to button for easier clicking
		this.bgInner.input.hitArea.setTo(-20, -20, this.bgInner.width+2*20, this.bgInner.height+2*20);
	}

	get enabled() {
		return this.bgInner.input.enabled;
	}

	set enabled(value: boolean) {
		this.text.setAlpha(value ? 1.0 : 0.5);
		this.bgInner.setAlpha(value ? 1.0 : 0.5);
		this.bgInner.setColor(interpolateColor(0x444444, this.color, value ? 1 : 0.7));
		this.bgInner.input.enabled = value;
	}
}