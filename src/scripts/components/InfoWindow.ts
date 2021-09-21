import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";

export class InfoWindow extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private box: Phaser.GameObjects.Container;
	private lines: (Phaser.GameObjects.Text | null)[];

	private fontSize: number;
	private sep: number;
	private pad: number;
	private alphaGoal: number;

	constructor(scene) {
		super(scene, scene.CX, scene.CY);
		this.scene = scene;
		scene.add.existing(this);

		this.alphaGoal = 0;
		this.setAlpha(0);
		this.setVisible(false);

		this.width = 0.6 * scene.W;
		this.height = 0.65 * scene.H;
		this.fontSize = 12;
		this.sep = 1 * this.fontSize;
		this.pad = 3 * this.fontSize;

		let outside = scene.add.rectangle(0, 0, scene.W, scene.H, 0x000000, 0.6);
		this.add(outside);

		this.box = this.scene.add.container(0, 0);
		this.add(this.box);

		let bg = new RoundRectangle(scene, 0, 0, this.width, this.height, 10, 0x331F0A, 0.5);
		this.box.add(bg);

		let w = scene.weights;
		let lines = [
			{ weight: w.regular, color: "#FF9933", text: "info_welcome" },
			{ weight: w.bold, size: 4, text: "info_title" },
			{ weight: w.regular, text: "info_pitch" },
			null,
			{ weight: w.bold, size: 1, text: "info_how_1" },
			{ weight: w.regular, text: "info_how_2" },
			null,
			{ weight: w.bold, size: 1, text: "info_data_1" },
			{ weight: w.regular, text: "info_data_2" },
			// { weight: w.regular, text: "info_data_3" },
			null,
			{ weight: w.bold, size: 1, text: "info_who_1" },
			{ weight: w.regular, text: "info_who_2" },
			// { weight: w.regular, text: "info_who_3" },
			null,
			{ weight: w.bold, size: 1, text: "info_model_1" },
			{ weight: w.regular, text: "info_model_2" },
			null,
			{ weight: w.bold, size: 1, text: "info_rights_1" },
			{ weight: w.regular, text: "info_rights_2" },
		];

		this.lines = [];
		let y = -this.height / 2 + this.pad;
		for (let i = 0; i < lines.length; i++) {
			if (lines[i]) {
				let line = lines[i]!.text;
				let weight = lines[i]!.weight;
				let color = lines[i]!.color || "#FFF";
				let size = 1 + (lines[i]!.size || 0) / 6;
				let x = -this.width / 2 + this.pad;
				let text = scene.createText(x, y, this.fontSize * size, weight, color);
				// text.setLineSpacing(10);
				text.setWordWrapWidth(0.85*this.width-2*this.pad, true);
				language.bind(text, line);
				this.lines.push(text);
				this.box.add(text);
				y += text.height;
			}
			else {
				this.lines.push(null);
			}
			y += this.sep;
		}
		this.repositionText();

		let qx = 0.35 * this.width;
		let qy = -0.20 * this.height;
		let qr = scene.add.image(qx, qy, "qr");
		qr.setScale(1.3);
		qr.setOrigin(0, 1.25);
		this.box.add(qr);
		let qrText = scene.createText(qx, qy, 0.9*this.fontSize, scene.weights.regular, "#FFF");
		qrText.setWordWrapWidth(0.10 * this.width);
		language.bind(qrText, "info_qr");
		this.box.add(qrText);

		let cx = -this.width/2 + this.pad;
		let cy = this.height/2 - this.pad;
		let copyright = scene.createText(cx, cy, this.fontSize, scene.weights.light, "#FFF");
		language.bind(copyright, "info_copyright", this.repositionText.bind(this));
		copyright.setOrigin(0, 1);
		this.box.add(copyright);

		// Dismiss on any clicks
		outside.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				if (this.isOpen) {
					this.hide();
				}
			}, this);
	}


	repositionText() {
		let y = -this.height / 2 + this.pad;
		for (let i = 0; i < this.lines.length; i++) {
			if (this.lines[i]) {
				this.lines[i]!.y = y;
				y += this.lines[i]!.height;
			}
			y += this.sep;
		}
	}

	show() {
		this.alphaGoal = 1;
	}

	hide() {
		this.alphaGoal = 0;
		this.emit("closeInfo");
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
	}
}