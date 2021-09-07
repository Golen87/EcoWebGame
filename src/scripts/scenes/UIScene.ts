import { BaseScene } from "./BaseScene";
import { InfoWindow } from "../components/InfoWindow";
import { ToolboxButton } from "../components/ToolboxButton";
import { language } from "../language/LanguageManager";

export class UIScene extends BaseScene {
	private infoWindow: InfoWindow;
	private toolButtons: ToolboxButton[];
	private language: string;

	constructor() {
		super({key: 'UIScene'});
	}

	create(): void {
		// Info window (clicking info-button)
		this.infoWindow = new InfoWindow(this);
		this.infoWindow.on('closeInfo', () => {
			this.events.emit('closeInfo');
		}, this);


		/* Toolbar */

		let ctW = 0.03 * this.W;
		let sbH = 0.22 * this.H;
		let tbX = this.W - ctW/2;
		let tbY = this.H - sbH/2;

		const toolButtons = [
			{
				image: 'icon-bookmark-saved',
				function: this.bookmarkButton
			},
			{
				image: 'icon-info',
				function: this.infoButton
			},
			{
				image: 'icon-reset',
				function: this.restartButton
			},
			{
				image: 'icon-menu-flag-en',
				function: this.languageButton
			}
		];

		this.toolButtons = [];
		for (let i = 0; i < toolButtons.length; i++) {
			let button = toolButtons[i];
			let size = 0.023 * this.H;
			let x = tbX;
			let y = tbY + (i - (toolButtons.length-1)/2) * 1.75*size;

			let obj = new ToolboxButton(this, x, y, size, button.image);
			this.add.existing(obj);
			this.toolButtons.push(obj);

			obj.on('click', button.function, this);
		}

		// let land = this.add.image(this.CX, this.H - sbH - NODE_SIZE/2, 'bg_land');
		// this.containToScreen(land);


		this.language = "Swedish";


		/* Escape to reset */
		this.input.keyboard.on("keydown-ESC", this.restartButton, this);
	}

	update(time: number, delta: number): void {
		this.infoWindow.update(time, delta);

		for (let button of this.toolButtons) {
			button.update(time, delta);
		}
	}

	bookmarkButton() {
	}

	infoButton() {
		if (this.infoWindow.isClosed) {
			this.events.emit('openInfo');
			this.infoWindow.show();
		}
		else if (this.infoWindow.isOpen) {
			this.events.emit('closeInfo');
			this.infoWindow.hide();
		}
	}

	restartButton() {
		if (this.infoWindow.isClosed) {
			this.events.emit('restart');
		}
		else if (this.infoWindow.isOpen) {
			this.events.emit('closeInfo');
			this.events.emit('restart');
			this.infoWindow.hide();
		}
	}

	languageButton() {
		if (this.language == "Swedish") {
			this.language = "English";
			language.setLanguage("English");
			this.toolButtons[3].setTexture("icon-menu-flag-se");
		}
		else {
			this.language = "Swedish";
			language.setLanguage("Swedish");
			this.toolButtons[3].setTexture("icon-menu-flag-en");
		}
	}
}