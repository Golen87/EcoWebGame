export class BaseScene extends Phaser.Scene {
	constructor(config: Phaser.Types.Scenes.SettingsConfig) {
		super(config);
	}


	// Creates Phaser text object
	createText(x=0, y=0, size=20, color="#FFF", text=""): Phaser.GameObjects.Text {
		return this.add.text(x, y, text, {
			fontFamily: "Mukta",
			fontSize: Math.max(size, 1) + "px",
			color: color
		});
	}

	// The image keeps its aspect ratio, but is resized to fit within the given dimension
	fitToScreen(image: Phaser.GameObjects.Image): void {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}

	// The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit
	containToScreen(image: Phaser.GameObjects.Image): void {
		image.setScale(Math.min(this.W / image.width, this.H / image.height));
	}


	// Returns width of screen
	get W(): number {
		return this.cameras.main.displayWidth;
	}

	// Returns height of screen
	get H(): number {
		return this.cameras.main.displayHeight;
	}

	// Returns horizontal center of screen
	get CX(): number {
		return this.cameras.main.centerX;
	}

	// Returns vertical center of screen
	get CY(): number {
		return this.cameras.main.centerY;
	}
}