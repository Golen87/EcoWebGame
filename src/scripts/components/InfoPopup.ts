import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";

export class InfoPopup extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	private text: Phaser.GameObjects.Text;
	private box: Phaser.GameObjects.Rectangle;
	private tween: Phaser.Tweens.Tween;
	private isActive: boolean;
	private dir: number;

	constructor(scene) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);

		this.setAlpha(0);
		this.setDepth(1);
		this.isActive = false;

		this.box = (this.scene.add as any).rexRoundRectangle(0, 0, 10, 10, 5, 0X555555);
		this.box.setAlpha(0.5);
		this.box.setOrigin(0.5);
		this.add(this.box);
		this.sendToBack(this.box);

		this.text = this.scene.createText(0, 0, 20, this.scene.weights.bold, "#FFF", "Warning text");
		this.text.setOrigin(0.5);
		this.text.setLineSpacing(10);
		this.text.setWordWrapWidth(0.15*this.scene.W, true);
		language.bind(this.text, "popup_1");
		this.add(this.text);
	}


	show(x: number, y: number, key: string) {
		if (!this.isActive) {
			language.bind(this.text, key, () => {
				let sep = 1.5 * 20;
				this.box.width = this.text.displayWidth + sep;
				this.box.height = this.text.displayHeight + sep;
			});

			let w = this.box.displayWidth;
			let h = this.box.displayHeight;
			let offset = 20;
			let isOutside = (x - 1.7*w < 0);

			this.isActive = true;
			this.dir = (isOutside ? 1 : -1);
			this.setAlpha(0);
			this.setPosition(
				x + this.dir * ( 0.8 * w + offset ),
				y
			);

			this.tween = this.scene.tweens.add({
				targets: this,
				alpha: { from: 0, to: 1 },
				x: (this.dir == 1 ? '-' : '+') + '=' + offset,
				ease: 'Cubic',
				duration: 800
			});
		}
	}

	dismiss(animated: boolean) {
		if (this.isActive) {
			let w = this.box.displayWidth;
			let offset = 10;

			if (this.tween) {
				this.tween.stop();
			}

			if (animated) {
				this.scene.tweens.add({
					targets: this,
					alpha: { from: this.alpha, to: 0 },
					x: (this.dir == 1 ? '+' : '-') + '=' + offset,
					ease: 'Cubic.In',
					duration: 300
				});
			}
			else {
				this.alpha = 0;
			}

			this.isActive = false;
		}
	}
}