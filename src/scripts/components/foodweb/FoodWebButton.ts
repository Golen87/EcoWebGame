import { BaseNode } from "../nodes/BaseNode";
import { speciesMap } from "../../assets/assetMaps";

export class FoodWebButton extends BaseNode {
	private circle: Phaser.GameObjects.Ellipse;
	private image: Phaser.GameObjects.Image;
	private selectionValue: number;

	constructor(scene, x: number, y: number, size: number, image: string) {
		super(scene, x, y);


		this.selectionValue = 0;

		// Colored background circle
		this.circle = scene.add.ellipse(0, 0, size+6, size+6, 0xFFFFFF);
		this.add(this.circle);

		// Image of species
		this.image = scene.add.image(0, 0, "species", speciesMap[image]);
		this.image.setScale(size / this.image.height);
		// this.image.setAlpha(0.65);
		this.add(this.image);

		this.bindInteractive(this.image);
		// this.image.input.hitArea.setTo(-15, -15, this.image.width+2*15, this.image.height+2*15);
		// this.scene.input.enableDebug(this.image);
	}

	update(time, delta) {
		this.setScale(1 - 0.1 * this.holdSmooth - 0.1 + 0.25 * this.selectionValue);
	}

	updateCircle(selection: number, alpha: number, color: number) {
		this.selectionValue = selection;
		this.circle.setAlpha(alpha);
		this.circle.fillColor = color;
	}

	onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		super.onDown(pointer, localX, localY, event);
		this.emit("hold");
	}
}