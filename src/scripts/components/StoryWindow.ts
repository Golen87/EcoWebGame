import { language } from "../language/LanguageManager";
import { BaseScene } from "../scenes/BaseScene";
import { BaseNode } from "./nodes/BaseNode";
import { RoundRectangle } from "../components/RoundRectangle";
import { ScrollArea } from "./ScrollArea";
import { ScrollBar } from "./ScrollBar";
import { iconsMap } from "../assets/assetMaps";

export class StoryWindow extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private box: Phaser.GameObjects.Container;
	private lines: (Phaser.GameObjects.Text | null)[];
	private scrollArea: ScrollArea;
	private scrollBar: ScrollBar;

	private showTab: boolean;
	private tab: Phaser.GameObjects.Container;
	private tabAfrica: Phaser.GameObjects.Container;
	private tabIcon: Phaser.GameObjects.Image;
	private tabText: Phaser.GameObjects.Text;

	private fontSize: number;
	private sep: number;
	private pad: number;

	public visValue: number;
	public visGoal: number;

	private descriptions: string[];

	// private chapterText: Phaser.GameObjects.Text;
	private titleText: Phaser.GameObjects.Text;
	private descText: Phaser.GameObjects.Text;

	private okButton: BaseNode;
	private okBg: RoundRectangle;
	private okText: Phaser.GameObjects.Text;

	constructor(scene) {
		const m = 0.05*scene.H;
		const width = 0.23 * scene.W;
		// this.height = k * scene.H;
		const height = 0.65 * scene.H;

		super(scene, width/2, 0.78*scene.H - height/2 - m);
		this.scene = scene;
		scene.add.existing(this);

		this.visGoal = 0;
		this.visValue = 0;
		// this.setAlpha(0);
		// this.setVisible(false);

		this.width = width;
		this.height = height;
		this.fontSize = 22;
		this.sep = 1 * this.fontSize;
		this.pad = 1.2 * this.fontSize;

		// let outside = scene.add.rectangle(0, 0, scene.W+100, scene.H+100, 0x000000, 0.3);
		// outside.setVisible(false);
		// this.add(outside);

		this.box = this.scene.add.container(0, 0);
		this.add(this.box);

		let bg = new RoundRectangle(scene, -50, 0, this.width+100, this.height, 10, 0x0A0601, 0.7);
		this.box.add(bg);


		let y = -this.height / 2 + this.pad + this.sep/2;

		// this.chapterText = scene.createText(0, y, this.fontSize, scene.weights.regular, "#FFFFFF");
		// this.chapterText.setOrigin(0.5, 0.0);
		// this.box.add(this.chapterText);
		// y += 1.5*this.sep;

		this.titleText = scene.createText(0, y, 1.5*this.fontSize, scene.weights.bold, "#FFFFFF");
		this.titleText.setOrigin(0.5, 0.0);
		this.box.add(this.titleText);
		y += 3*this.sep;



		// let w = 0.85*this.width-2*this.pad;
		let w = this.width - 2*this.pad - 0.5*this.sep;

		this.scrollArea = new ScrollArea(this.scene,
			-w/2 + 0.5*this.sep,
			y,
			w,
			this.height - 2*this.pad - (y - (-this.height / 2 + this.pad)),
			50
		);
		this.box.add(this.scrollArea);

		this.scrollBar = new ScrollBar(this.scene, this.scrollArea.x + 0*this.scrollArea.width - this.pad, this.scrollArea.y + this.scrollArea.height/2, 3, this.scrollArea.height)
		this.box.add(this.scrollBar);


		this.descText = scene.createText(0, 0*y, this.fontSize, scene.weights.regular, "#FFFFFF");
		this.descText.setOrigin(0.0, 0.0);
		this.descText.setWordWrapWidth(this.scrollArea.width);
		// this.box.add(this.descText);
		this.scrollArea.apply(this.descText);


		let tabW = 0.03 * this.scene.W;
		let tabH = 0.17 * this.scene.H;

		this.showTab = false;

		this.tab = this.scene.add.container(this.width/2+tabW/2, this.height/2 - 0.5*tabH - 0.5*tabW);
		this.box.add(this.tab);

		let tabBg = new RoundRectangle(scene, 0, 0, tabW, tabH, 10, 0x0A0601, 0.7, true, false, false, true);
		this.tab.add(tabBg);

		this.tabIcon = this.scene.add.image(-tabW/8, 0, "icons", iconsMap["icon-arrow-leftwards"]);
		this.tabIcon.setScale(0.5*tabW / this.tabIcon.width);
		this.tab.add(this.tabIcon);

		this.tabText = this.scene.createText(0, 0, 18, this.scene.weights.bold, "#FFF", "Chapter");
		this.tabText.setOrigin(0.5);
		this.tabText.setAngle(-90);
		this.tab.add(this.tabText);
		language.bind(this.tabText, "story_button");


		// Temp
		this.tabAfrica = this.scene.add.container(this.width/2+tabW/2, -this.height/2 + 0.5*tabH);
		this.box.add(this.tabAfrica);

		let afrBg = new RoundRectangle(scene, 0, 0, tabW, tabH, 10, 0x0A0601, 0.7, true, false, false, true);
		this.tabAfrica.add(afrBg);

		let afrText = this.scene.createText(0, 0, 18, this.scene.weights.bold, "#FFF", "Chapter");
		afrText.setOrigin(0.5);
		afrText.setAngle(-90);
		this.tabAfrica.add(afrText);
		language.bind(afrText, "map_title");



		// let bSize = 1.5*this.fontSize;
		// let bY = this.height / 2 - this.pad - bSize / 2;

		// this.okButton = new BaseNode(this.scene, 0, bY);
		// this.box.add(this.okButton);

		// this.okBg = new RoundRectangle(this.scene, 0, 0, 4*bSize, bSize, bSize/2, 0x6B8B2F, 1.0);
		// this.okButton.add(this.okBg);
		// this.okButton.bindInteractive(this.okBg);

		// this.okText = this.scene.createText(0, 0, 0.5*bSize, this.scene.weights.bold, "#FFF", "OK");
		// this.okText.setOrigin(0.5);
		// this.okButton.add(this.okText);

		// this.okButton.on("click", () => {
		// 	if (this.isOpen) {
		// 		this.nextPage();
		// 	}
		// }, this);



		// let globe = this.scene.add.image(this.width/2, 0, "globe-melting");
		// this.box.add(globe);



		// Prevent inside from closing
		// bg.setInteractive();

		// Dismiss on any clicks
		bg.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				if (this.isOpen) {
					this.hide();
				}
			}, this);

		tabBg.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				if (this.isOpen) {
					this.hide();
				}
				else if (this.isClosed) {
					this.emit("open");
				}
			}, this);

		const padding = 40;
		tabBg.input.hitArea.setTo(-padding, -padding, tabBg.width+2*padding, tabBg.height+2*padding);
		// this.scene.input.enableDebug(tabBg);
	}


	show(chapter) {
		this.visGoal = 1;
		this.showTab = true;

		if (chapter) {
			this.descriptions = [...chapter.descriptions];

			language.bind(this.titleText, chapter.title);
			// language.bind(this.chapterText, "chapter", () => {
				// this.chapterText.setText(`${this.chapterText.text} ${chapter.number}`);
				// language.unbind(this.chapterText); // Hack to prevent error check
			// });
		}

		this.scrollArea.reset();

		this.nextPage();
	}

	nextPage() {
		let desc = this.descriptions.shift();

		if (desc) {
			// this.descText.setFontSize(this.fontSize);
			language.bind(this.descText, desc, () => {
				this.scrollArea.updateSize();
			});
			// const size = (this.descText.height < this.height/2) ? this.fontSize : 0.75 * this.fontSize;
			// this.descText.setFontSize(size);
		}
		else {
			this.hide();
		}

		// language.bind(this.okText, this.descriptions.length > 0 ? "next" : "ok");
	}

	clear() {
		this.showTab = false;
		this.hide();
	}

	hide() {
		this.visGoal = 0;
		this.emit("close");
	}

	get isOpen(): boolean {
		return this.visValue == 1;
	}

	get isClosed(): boolean {
		return this.visValue == 0;
	}

	update(time: number, delta: number) {
		const duration = 350;
		this.visValue += Phaser.Math.Clamp(this.visGoal - this.visValue, -delta/duration, delta/duration);
		this.alpha = 0.6 + 0.4 * this.visValue;
		this.box.x = -Phaser.Math.Easing.Cubic.In(1 - this.visValue) * this.width;
		// this.setVisible(this.visValue > 0);

		this.tabIcon.setAlpha(0.6 * Math.pow(this.visValue, 4));
		this.tabText.setAlpha(Math.pow(1-this.visValue, 4));

		this.tabAfrica.setAlpha(this.tabText.alpha);

		this.tab.setVisible(this.showTab);
		this.tabAfrica.setVisible(this.showTab);

		// this.okButton.update(time, delta);
		// this.okButton.setScale(1.0 - 0.1 * this.okButton.holdSmooth);

		this.scrollArea.update(time, delta);
		this.scrollBar.set(this.scrollArea.getScroll());
	}
}