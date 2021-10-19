import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";
import { BaseNode } from "./nodes/BaseNode";
import { RoundRectangle } from "../components/RoundRectangle";

export class StoryWindow extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private box: Phaser.GameObjects.Container;
	private lines: (Phaser.GameObjects.Text | null)[];

	private fontSize: number;
	private sep: number;
	private pad: number;
	private alphaGoal: number;

	private chapterText: Phaser.GameObjects.Text;
	private titleText: Phaser.GameObjects.Text;
	private descText: Phaser.GameObjects.Text;

	private okButton: BaseNode;
	private okBg: RoundRectangle;
	private okText: Phaser.GameObjects.Text;

	constructor(scene) {
		super(scene, scene.CX, scene.CY);
		this.scene = scene;
		scene.add.existing(this);

		this.alphaGoal = 0;
		this.setAlpha(0);
		this.setVisible(false);

		this.width = 0.6 * scene.W;
		this.height = 0.65 * scene.H;
		this.fontSize = 24;
		this.sep = 1 * this.fontSize;
		this.pad = 2 * this.fontSize;

		let outside = scene.add.rectangle(0, 0, scene.W, scene.H, 0x000000, 0.3);
		this.add(outside);

		this.box = this.scene.add.container(0, 0);
		this.add(this.box);

		let bg = new RoundRectangle(scene, 0, 0, this.width, this.height, 10, 0x120B03, 0.5);
		this.box.add(bg);

		let y = -this.height / 2 + this.pad;

		this.chapterText = scene.createText(0, y, this.fontSize, scene.weights.regular, "#FFFFFF");
		this.chapterText.setOrigin(0.5, 0.0);
		this.box.add(this.chapterText);
		y += 1.5*this.sep;

		this.titleText = scene.createText(0, y, 2*this.fontSize, scene.weights.bold, "#FFFFFF");
		this.titleText.setOrigin(0.5, 0.0);
		this.box.add(this.titleText);
		y += 4*this.sep;

		this.descText = scene.createText(0, y, this.fontSize, scene.weights.regular, "#FFFFFF");
		this.descText.setOrigin(0.5, 0.0);
		this.descText.setWordWrapWidth(0.85*this.width-2*this.pad, true);
		this.box.add(this.descText);


		let bSize = 60;
		let bY = this.height / 2 - this.pad - bSize / 2;

		this.okButton = new BaseNode(this.scene, 0, bY);
		this.box.add(this.okButton);

		this.okBg = new RoundRectangle(this.scene, 0, 0, 3*bSize, bSize, bSize/2, 0x6B8B2F, 1.0);
		this.okButton.add(this.okBg);
		this.okButton.bindInteractive(this.okBg);

		this.okText = this.scene.createText(0, 0, 0.5*bSize, this.scene.weights.bold, "#FFF", "OK");
		this.okText.setOrigin(0.5);
		this.okButton.add(this.okText);

		this.okButton.on("click", () => {
			if (this.isOpen) {
				this.hide();
			}
		}, this);


		// Dismiss on any clicks
		outside.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				if (this.isOpen) {
					this.hide();
				}
			}, this);
	}


	show(story: number) {
		this.alphaGoal = 1;

		const num = story.toString();

		language.bind(this.titleText, "challenge_title_" + num);
		language.bind(this.descText, "challenge_desc_" + num);
		language.bind(this.chapterText, "chapter", () => {
			this.chapterText.setText(`${this.chapterText.text} ${num}`);
			language.unbind(this.chapterText); // Hack to prevent error check
		});

		// "challenge_title_1"
		// "challenge_title_2"
		// "challenge_title_2b"
		// "challenge_title_3"
		// "challenge_title_4"
		// "challenge_title_5"
		// "challenge_desc_1"
		// "challenge_desc_2"
		// "challenge_desc_2b"
		// "challenge_desc_3"
		// "challenge_desc_4"
		// "challenge_desc_5"
	}

	hide() {
		this.alphaGoal = 0;
		this.emit("close");
	}

	get isOpen(): boolean {
		return this.alpha == 1;
	}

	get isClosed(): boolean {
		return this.alpha == 0;
	}

	update(time: number, delta: number) {
		const duration = 250;
		this.alpha += Phaser.Math.Clamp(this.alphaGoal - this.alpha, -delta/duration, delta/duration);
		this.box.y = Phaser.Math.Easing.Cubic.In(1 - this.alpha) * 20;
		this.setVisible(this.alpha > 0);

		this.okButton.update(time, delta);
		this.okButton.setScale(1.0 - 0.1 * this.okButton.holdSmooth);
	}
}