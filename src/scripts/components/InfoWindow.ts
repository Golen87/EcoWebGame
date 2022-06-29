import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";
import { RoundRectangle } from "./RoundRectangle";
import { ScrollArea } from "./ScrollArea";
import { ScrollBar } from "./ScrollBar";
import { VERSION } from "../constants";

export class InfoWindow extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private box: Phaser.GameObjects.Container;
	private lines: (Phaser.GameObjects.Text | null)[];
	private scrollArea: ScrollArea;
	private scrollBar: ScrollBar;

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

		this.width = 0.7 * scene.W;
		this.height = 0.8 * scene.H;
		this.fontSize = 12*1.6;
		this.sep = this.fontSize;
		this.pad = 3 * this.fontSize;

		let outside = scene.add.rectangle(0, 0, scene.W, scene.H, 0x000000, 0.6);
		this.add(outside);

		this.box = this.scene.add.container(0, 0);
		this.add(this.box);

		let bg = new RoundRectangle(scene, 0, 0, this.width, this.height, 10, 0x331F0A, 0.6);
		this.box.add(bg);


		this.scrollArea = new ScrollArea(this.scene,
			// 0,0,
			-this.width / 2 + this.pad,
			-this.height / 2 + this.pad,
			0.85*this.width-2*this.pad,
			this.height-2*this.pad - this.fontSize-this.sep,
			50
		);
		this.box.add(this.scrollArea);

		this.scrollBar = new ScrollBar(this.scene, -this.width/2 + this.pad/2, -this.fontSize, 6, this.scrollArea.height)
		this.box.add(this.scrollBar);


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
			// null,
			// { weight: w.bold, size: 1, text: "info_rights_1" },
			// { weight: w.regular, text: "info_rights_2" },
		];

		this.lines = [];
		// let y = -this.height / 2 + this.pad;
		let y = 0;
		for (let i = 0; i < lines.length; i++) {
			if (lines[i]) {
				let line = lines[i]!.text;
				let weight = lines[i]!.weight;
				let color = lines[i]!.color || "#FFF";
				let size = 1 + (lines[i]!.size || 0) / 6;
				// let x = -this.width / 2 + this.pad;
				let x = 0;
				let text = scene.createText(x, y, this.fontSize * size, weight, color);
				// text.setLineSpacing(10);
				// text.setPadding(30);
				text.setShadow(0, 0, "#000", 6);
				text.setWordWrapWidth(0.85*this.width-2*this.pad);
				language.bind(text, line);
				this.lines.push(text);
				// this.box.add(text);
				this.scrollArea.apply(text);
				y += text.height;
			}
			else {
				this.lines.push(null);
			}
			y += this.sep;
		}
		this.repositionText();


		let qw = 0.15*this.width - this.pad;
		let qx = 0.5 * this.width - this.pad;
		let qy = -0.5 * this.height + this.pad;

		let qrBg = new RoundRectangle(scene, qx-qw/2, qy+qw/2, qw, qw, 4, 0xFFFFFF);
		this.box.add(qrBg);

		let qrImage = scene.add.image(qx, qy, "lutra_logo");
		qrImage.setScale(qw / qrImage.width);
		qrImage.setOrigin(1, 0);
		this.box.add(qrImage);

		let qrText = scene.createText(qx-qw, qy+qw+this.sep, 0.9*this.fontSize, scene.weights.regular, "#FFF");
		qrText.setShadow(0, 0, "#000", 6);
		qrText.setWordWrapWidth(qw);
		language.bind(qrText, "info_qr");
		this.box.add(qrText);


		let cx = this.width/2 - this.pad;
		let cy = this.height/2 - this.pad;
		let copyright = scene.createText(cx, cy, this.fontSize, scene.weights.light, "#FFF");
		copyright.setShadow(0, 0, "#000", 6);
		language.bind(copyright, "info_copyright", this.repositionText.bind(this));
		copyright.setOrigin(1, 1);
		this.box.add(copyright);

		let version = scene.createText(cx, cy-1.4*this.fontSize, this.fontSize, scene.weights.light, "#FFF", VERSION);
		version.setShadow(0, 0, "#000", 6);
		version.setOrigin(1, 1);
		this.box.add(version);



		// Dismiss on any clicks
		outside.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				if (this.isOpen) {
					this.hide();
				}
			}, this);
	}


	repositionText() {
		// let y = -this.height / 2 + this.pad;
		let y = 0;
		for (let i = 0; i < this.lines.length; i++) {
			if (this.lines[i]) {
				this.lines[i]!.y = y;
				y += this.lines[i]!.height;
			}
			y += this.sep;
		}

		this.scrollArea.updateSize();
	}

	show() {
		this.alphaGoal = 1;
		this.scrollArea.reset();
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
		this.scrollArea.update(time, delta);
		this.scrollBar.set(this.scrollArea.getScroll());
	}
}