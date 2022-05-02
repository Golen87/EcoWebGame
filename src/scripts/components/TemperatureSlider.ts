import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";
import { Slider } from "../components/Slider";
import { RoundRectangle } from "../components/RoundRectangle";
import { iconsMap } from "../assets/assetMaps";

export class TemperatureSlider extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private slider: Slider;
	private leftImage: Phaser.GameObjects.Image;
	private leftText: Phaser.GameObjects.Text;
	private rightImage: Phaser.GameObjects.Image;
	private rightText: Phaser.GameObjects.Text;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

		let tempOffset = 10;
		this.slider = new Slider(this.scene, 0, tempOffset, 250, 30, 8, 9);
		this.slider.setRange(0, 1);
		this.add(this.slider);

		let tempSep = 2.0 * this.slider.height;
		let topText = this.scene.createText(0, -40, 24, this.scene.weights.bold);
		topText.setOrigin(0.5, 1.0);
		this.add(topText);
		language.bind(topText, "temperature_slider");

		this.leftImage = this.scene.add.image(- this.slider.width/2 - tempSep, -tempOffset, "icons", iconsMap["icon-temperature-1"]);
		this.leftImage.setScale(55 / this.leftImage.width);
		this.add(this.leftImage);
		this.rightImage = this.scene.add.image(this.slider.width/2 + tempSep, -tempOffset, "icons", iconsMap["icon-temperature-4"]);
		this.rightImage.setScale(55 / this.rightImage.width);
		this.add(this.rightImage);

		this.leftText = this.scene.createText(- this.slider.width/2 - tempSep, 40, 20, this.scene.weights.regular, "#FFF", "+0°C");
		this.leftText.setOrigin(0.5);
		this.add(this.leftText);
		this.rightText = this.scene.createText(this.slider.width/2 + tempSep, 40, 20, this.scene.weights.regular, "#FFF", "+3°C");
		this.rightText.setOrigin(0.5);
		this.add(this.rightText);

		let tempBg = new RoundRectangle(this.scene, 0, -tempOffset, this.slider.width + 2*tempSep + this.leftImage.width + 30, this.slider.height + 2*40 + 50, 12, 0x000000);
		tempBg.setAlpha(0.3);
		this.add(tempBg);
		this.sendToBack(tempBg);

		this.slider.value = 0;
		this.slider.on('onChange', (value) => {
			this.emit('onChange', value);
		}, this);
	}


	update(time: number, delta: number) {
		this.slider.update(time, delta);
	}

	setStory(key: string) {
		this.rightText.setText((key == "2b") ? "+2°C" : "+4°C");
		this.rightImage.setTint((key == "2b") ? 0xFF8888 : 0xFF6666);
	}

	set value(x: number) {
		this.slider.value = x;
	}

	get value(): number {
		return this.slider.value;
	}
}