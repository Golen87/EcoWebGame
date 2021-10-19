import { BaseScene } from "../scenes/BaseScene";
import { language } from "../language/LanguageManager";
import { QUESTION_TIME } from "../constants";

export class AttractionView extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private outside: Phaser.GameObjects.Rectangle;
	private container: Phaser.GameObjects.Container;
	private title: Phaser.GameObjects.Text;
	private heading: Phaser.GameObjects.Text;

	private questionKeys: string[];
	private questionTimer: number;
	private questionIndex: number;
	private questionTexts: Phaser.GameObjects.Text[];
	private questionSmooth: number[];
	private previousY: number;

	private alphaGoal: number;

	constructor(scene: BaseScene, textColor: string) {
		super(scene, scene.CX, scene.CY);
		this.scene = scene;
		scene.add.existing(this);

		this.alphaGoal = 1;
		this.setAlpha(1);
		this.setVisible(true);

		// Dismiss on any clicks
		this.outside = scene.add.rectangle(0, 0, scene.W, scene.H, 0, 0.001);
		this.add(this.outside);
		this.outside.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.emit("click");
			}, this);


		this.container = this.scene.add.container(0, 0);
		this.add(this.container);

		this.title = this.scene.createText(0, -0.35*scene.H, 35, this.scene.weights.bold, textColor, "Title");
		language.bind(this.title, "attraction_title");

		this.heading = this.scene.createText(0, -0.28*scene.H, 80, this.scene.weights.bold, textColor, "Heading");
		language.bind(this.heading, "attraction_heading");

		this.questionTexts = [];
		this.questionSmooth = [];
		for (let i = 0; i < 3; i++) {

			let text = this.scene.createText(0, 0, 60, this.scene.weights.regular, textColor, "Question?");
			text.setVisible(false);
			// text.setWordWrapWidth(0.45*scene.W);
			text.setOrigin(0.5);
			text.setPadding(30);
			text.setShadow(0, 0, "#FFF", 15);
			text.setStroke("#FFA", 1);

			this.container.add(text);
			this.questionTexts.push(text);
			this.questionSmooth.push(0);
		}


		let texts = [this.title, this.heading];
		for (let text of texts) {
			this.container.add(text);
			text.setOrigin(0.5);
			text.setPadding(30);
			text.setShadow(0, 0, "#FFF", 15);
			text.setStroke("#FFA", 1);
		}


		this.questionKeys = ["attraction_question_1", "attraction_question_2", "attraction_question_3"];
		this.questionTimer = 0;
		this.questionIndex = 0;
		this.previousY = 0;

		this.newQuestion();
	}

	update(time, delta) {
		const duration = 250;
		this.alpha += Phaser.Math.Clamp(this.alphaGoal - this.alpha, -delta/duration, delta/duration);
		this.container.y = -Phaser.Math.Easing.Sine.In(1 - this.alpha) * 20;
		this.setVisible(this.alpha > 0);

		if (this.visible) {
			this.questionTimer += delta / 1000;
			if (this.questionTimer > 0.75 * QUESTION_TIME) {
				this.newQuestion();
				this.questionTimer = 0;
			}

			for (let i = this.questionTexts.length-1; i >= 0; i--) {
				this.questionTexts[i].setScale(0.75 + 0.25 * this.questionSmooth[i]);
				let alpha = Math.min(2 - Math.abs(this.questionSmooth[i]*4 - 2), 1);
				alpha = Phaser.Math.Easing.Cubic.InOut(alpha);
				this.questionTexts[i].setAlpha(alpha);
				this.questionSmooth[i] += delta / 1000 / QUESTION_TIME;
			}
		}
	}

	show() {
		this.alphaGoal = 1;
		this.outside.setVisible(true);

		if (this.alpha == 0) {
			this.questionTimer = 0;
			for (let i = this.questionTexts.length-1; i >= 0; i--) {
				this.questionTexts[i].setVisible(false);
			}
			this.newQuestion();
		}
	}

	hide() {
		this.alphaGoal = 0;
		this.outside.setVisible(false);
	}

	newQuestion() {
		this.questionIndex = (this.questionIndex + 1) % this.questionKeys.length;

		let target = this.questionTexts[this.questionIndex];
		this.sendToBack(target);
		this.questionSmooth[this.questionIndex] = 0;

		target.setVisible(true);
		target.x = (0.5 - Math.random()) * this.scene.W/6;
		target.y = this.previousY;
		let limit = 100;
		while (Math.abs(target.y - this.previousY) < 0.13 * this.scene.H) {
			target.y = (-0.1 + 0.3 * Math.random()) * this.scene.H;
			if (limit-- < 0) { break; }
		}
		this.previousY = target.y;

		language.bind(target, this.questionKeys[this.questionIndex]);
	}
}