import { BaseScene } from "../scenes/BaseScene";
import { Node } from "./nodes/Node";
import { Path } from "./Path";
import { NODE_SIZE } from "../constants";
import { iconsMap } from "../assets/assetMaps";

export class PathParticle extends Phaser.GameObjects.Image {
	public scene: BaseScene;

	private path: Path;
	private duration: number;

	private progress: number;
	private offset: Phaser.Math.Vector2;
	private offsetDist: number;

	private baseScale: number;

	constructor(scene: BaseScene) {
		super(scene, 0, 0, "icons", iconsMap["icon-sun"]);
		this.scene = scene;
		scene.add.existing(this);

		this.offset = new Phaser.Math.Vector2(0, 0);

		this.baseScale = 18 / this.height;
		this.setScale(this.baseScale);
	}

	activate(path: Path, texture: string, tint: number) {
		this.setVisible(true);
		this.path = path;
		this.duration = Phaser.Math.Clamp(path.curve.getLength(), 100, (this.path.isGrounded ? 200 : 500)) / (70 + 10 * Math.random());

		this.progress = 0;

		if (this.path.isGrounded) {
			let x = this.scene.time.now/1000 * 4.0;
			let f = NODE_SIZE/4 * Math.sin(x);
			if (texture == "icon-sun") {
				f -= 3/4*NODE_SIZE;
			}
			if (texture == "icon-co2-text") {
				f += 3/4*NODE_SIZE;
			}
			// let w = NODE_SIZE;
			// let flip = texture == "icon-sun" ? -1 : 1;
			let flip = 1;
			// this.offsetDist = w * f * flip;
			this.offsetDist = f * flip;
		}
		else {
			let x = this.scene.time.now/1000 * 1.7;
			let f = Math.sin(x);
			let v = Math.sign(f) * Math.pow(Math.abs(f), 0.5);
			let w = 16;
			this.offsetDist = w * v;
		}

		this.setFrame(iconsMap[texture]);
		this.setTint(tint);

		this.updatePosition(0, 0);
	}

	update(time: number, delta: number) {
		this.progress += delta / this.duration;

		if (this.progress >= 1.0) {
			this.emit("complete");
			this.setVisible(false);
		}

		else {
			this.updatePosition(time, delta);
		}
	}

	updatePosition(time: number, delta: number) {
		const p = this.path.curve.getPoint(1-this.progress);
		// const t = Math.sin(2*time/1000+7*this.progress);

		if (this.path.isGrounded) {
			// Follow line with horizontal offset
			this.offset.set(this.offsetDist * (1-0.5*this.progress), 0);
		}
		else {
			// Follow tangent with sideway offset
			this.path.curve.getTangent(1-this.progress, this.offset);
			this.offset.rotate(0.5 * Math.PI);
			this.offset.scale(this.offsetDist);
		}

		this.x = p.x + this.offset.x;
		this.y = p.y + this.offset.y;

		// this.offset.rotate(6*delta);

		let pathAlpha = this.path.alpha * (this.path.isGrounded ? 0.9 : 1.0);
		let easing = this.getEasing();// * (this.path.isGrounded ? this.progress : 1.0);
		// if (this.path.isGrounded) {
			// pathAlpha = Math.min(this.path.node1.aliveValue, this.path.node2.aliveValue);
		// }

		this.setAlpha(pathAlpha * easing);
		this.setScale(this.baseScale * easing);
		if (pathAlpha <= 0) {
			this.setVisible(false);
		}
	}

	getEasing() {
		const x = Math.pow(this.progress, this.path.isGrounded ? 2 : 1);
		const l = this.path.isGrounded ? 0.6 : 0.2;
		const r = 0.2;

		if (x <= 0 || x >= 1) {
			return 0;
		}
		else if (x >= l && x <= 1-r) {
			return 1;
		}
		else {
			const f = (x < l) ?
				x / l : // left
				(x - 1 + 2*r) / r; // right
			return 1 - (1 - f) * (1 - f);
		}
	}
}