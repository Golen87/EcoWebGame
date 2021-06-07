import { BaseScene } from "../scenes/BaseScene";
import { Button } from "./Button";
import { NODE_SIZE } from "../constants";

// TODO: Remove Button
export class BaseNode extends Button {
	public scene: BaseScene;
	public liftSmooth: number;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.liftSmooth = 0;
	}

	isInsidePlayingField(): boolean {
		return false;
	}

	get alive(): boolean {
		return false;
	}

	getWidth(): number {
		return NODE_SIZE;
	}
}