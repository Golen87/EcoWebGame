import { BaseScene } from "./BaseScene";
import { InfoWindow } from "../components/InfoWindow";
import { StoryWindow } from "../components/StoryWindow";
import { ToolboxButton } from "../components/ToolboxButton";
import { AttractionView } from "../components/AttractionView";
import { language } from "../language/LanguageManager";
import { IDLE_TIME, IDLE_FADE } from "../constants";

export class UIScene extends BaseScene {
	private attractionMode: boolean;
	private attractionView: AttractionView;
	private idleTimer: number;
	private fader: Phaser.GameObjects.Rectangle;

	private infoWindow: InfoWindow;
	private storyWindow: StoryWindow;
	private toolButtons: ToolboxButton[];
	private language: string;

	constructor() {
		super({key: "UIScene"});
	}

	create(): void {
		this.fade(false, 200, 0x000000);

		this.language = "Swedish";


		/* Attraction mode */

		this.attractionMode = true;
		this.idleTimer = -2;
		// this.add.rectangle(this.CX, this.CY, this.W, this.H, 0xFFFFFF, 0.3);
		this.attractionView = new AttractionView(this, "#FFF");
		this.attractionView.show();
		// this.attractionView.setVisible(false);
		this.attractionView.on("click", this.wakeUp, this);
		this.events.emit("attraction", true);


		/* Info window (clicking info-button) */

		this.infoWindow = new InfoWindow(this);
		this.infoWindow.on("close", () => {
			this.events.emit("info", false);
		}, this);


		/* Story window */

		this.storyWindow = new StoryWindow(this);
		this.storyWindow.on("close", () => {
			this.events.emit("story", false);
		}, this);


		/* Toolbar */

		let ctW = 0.03 * this.W;
		let sbH = 0.22 * this.H;
		let tbX = this.W - ctW/2;
		let tbY = this.H - sbH/2;

		const toolButtons = [
			// {
				// image: "icon-bookmark-saved",
				// function: this.bookmarkButton
			// },
			{
				image: "icon-info-dot",
				function: this.infoButton
			},
			{
				image: "icon-reset",
				function: this.restartButton
			},
			{
				image: "icon-menu-flag-en",
				function: this.languageButton
			}
		];

		this.toolButtons = [];
		for (let i = 0; i < toolButtons.length; i++) {
			let button = toolButtons[i];
			// let size = 0.024 * this.H;
			let size = 0.028 * this.H;
			let x = tbX;
			let y = tbY + (i - (toolButtons.length-1)/2) * 1.75*size;

			let obj = new ToolboxButton(this, x, y, size, button.image);
			this.add.existing(obj);
			this.toolButtons.push(obj);

			obj.on("click", button.function, this);
		}

		// let land = this.add.image(this.CX, this.H - sbH - NODE_SIZE/2, "bg_land");
		// this.containToScreen(land);


		/* Fader */

		this.fader = this.add.rectangle(this.CX, this.CY, this.W, this.H, 0);
		this.fader.setVisible(false);
		this.fader.setInteractive({ useHandCursor: true })
			.on('pointerdown', this.wakeUp, this);


		/* Escape to reset */
		this.input.keyboard.on("keydown-ESC", this.restartButton, this);

		this.input.on("pointerdown", () => { if (this.idleTimer > 0) this.idleTimer = 0; }, this);
		this.input.on("pointerup", () => { if (this.idleTimer > 0) this.idleTimer = 0; }, this);


		/* From game */
		this.scene.get('SerengetiScene').events.on('openStory', (story: number) => {
			if (this.infoWindow.isClosed && this.storyWindow.isClosed) {
				this.events.emit("story", true);
				this.storyWindow.show(story);
			}
		}, this);
	}

	update(time: number, delta: number): void {
		this.attractionView.update(time, delta);
		this.infoWindow.update(time, delta);
		this.storyWindow.update(time, delta);

		this.attractionView.alpha *= (1 - 0.99 * this.infoWindow.alpha);

		for (let button of this.toolButtons) {
			button.update(time, delta);
		}

		this.idleTimer += delta / 1000;
		if (!this.attractionView.visible || this.infoWindow.isOpen) {
			if (this.idleTimer > IDLE_TIME) {
				this.fader.setVisible(true);
				this.fader.setAlpha(Math.pow((this.idleTimer - IDLE_TIME) / IDLE_FADE, 0.7));

				if (this.idleTimer > IDLE_TIME + IDLE_FADE) {
					this.restartButton();
					this.idleTimer = -2;
				}
			}
			else {
				this.fader.setVisible(false);
			}
		}
		else if (this.fader.visible) {
			this.fader.setAlpha(- this.idleTimer / 2);
			if (this.fader.alpha <= 0) {
				this.fader.setVisible(false);
			}
		}
	}

	// bookmarkButton() {
	// }

	infoButton() {
		if (this.infoWindow.isClosed && this.storyWindow.isClosed) {
			this.events.emit("info", true);
			this.infoWindow.show();
		}
		else if (this.infoWindow.isOpen) {
			this.events.emit("info", false);
			this.infoWindow.hide();
		}
	}

	restartButton() {
		if (!this.attractionView.visible || this.infoWindow.isOpen) {
			this.infoWindow.hide();
			this.storyWindow.hide();
			this.attractionView.show();

			this.events.emit("restart");
			this.events.emit("attraction", true);
			this.events.emit("info", false);
			this.events.emit("story", false);
		}

		if (this.language == "English") {
			this.languageButton();
		}
	}

	languageButton() {
		if (this.language == "Swedish") {
			this.language = "English";
			language.setLanguage("English");
			this.toolButtons[2].setTexture("icon-menu-flag-se");
		}
		else {
			this.language = "Swedish";
			language.setLanguage("Swedish");
			this.toolButtons[2].setTexture("icon-menu-flag-en");
		}
	}

	wakeUp() {
		if (this.attractionView.visible) {
			this.attractionView.hide();
			this.events.emit("attraction", false);
		}
		this.fader.setVisible(false);
		this.idleTimer = 0;
	}
}