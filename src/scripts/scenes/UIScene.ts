import { BaseScene } from "./BaseScene";
import { InfoWindow } from "../components/InfoWindow";
import { language } from "../language/LanguageManager";

export class UIScene extends BaseScene {
	private infoWindow: InfoWindow;

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
				function: () => {}
			},
			{
				image: 'icon-info',
				function: () => {
					if (this.infoWindow.isClosed) {
						this.events.emit('openInfo');
						this.infoWindow.show();
					}
					else if (this.infoWindow.isOpen) {
						this.events.emit('closeInfo');
						this.infoWindow.hide();
					}
				}
			},
			{
				image: 'icon-reset',
				function: this.restart
			},
			{
				image: 'icon-menu-flag-se',
				function: () => {
					language.setLanguage("Swedish");
				}
			},
			{
				image: 'icon-menu-flag-en',
				function: () => {
					language.setLanguage("English");
				}
			}
		];

		for (let i = 0; i < toolButtons.length; i++) {
			let button = toolButtons[i];
			let size = 0.02 * this.H;
			let x = tbX;
			let y = tbY + (i - (toolButtons.length-1)/2) * 1.75*size;

			let image = this.add.image(x, y, button.image);
			image.setScale(size / image.height);
			image.setAlpha(0.65);
			image.setInteractive({ useHandCursor: true })
				// .on('pointerover', () => {image.setAlpha(1.0);})
				// .on('pointerout', () => {image.setAlpha(0.5);})
				.on('pointerup', button.function, this);
		}

		// this.add.image(100, 100, 'icon-backToBeginning');
		// this.add.image(200, 100, 'icon-backward');
		// this.add.image(300, 100, 'icon-forward');
		// this.add.image(400, 100, 'icon-play');
		// this.add.image(100, 300, 'icon-soil');
		// this.add.image(300, 300, 'icon-sun');
		// this.add.image(200, 300, 'icon-rain');
		// 'icon-annualFlower'
		// 'icon-grass'
		// 'icon-herb'
		// 'icon-shrub'
		// 'icon-tree'
		// let land = this.add.image(this.CX, this.H - sbH - NODE_SIZE/2, 'bg_land');
		// this.containToScreen(land);


		/* Escape to reset */
		this.input.keyboard.on("keydown-ESC", this.restart, this);
	}

	update(time: number, delta: number): void {
		this.infoWindow.update(time, delta);
	}


	restart() {
		if (this.infoWindow.isClosed) {
			this.events.emit('restart');
		}
		else if (this.infoWindow.isOpen) {
			this.events.emit('closeInfo');
			this.events.emit('restart');
			this.infoWindow.hide();
		}
	}
}