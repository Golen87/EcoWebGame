import { BaseScene } from "../scenes/BaseScene";
import { BaseNode } from "./nodes/BaseNode";
import { Node } from "./nodes/Node";
import { NODE_SIZE } from "../constants";

export class Path extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public node1: BaseNode;
	public node2: BaseNode;
	// public dotDensity: number;
	public lineThickness: number;
	public curve: Phaser.Curves.CubicBezier;
	public isGrounded: boolean;

	private graphics: Phaser.GameObjects.Graphics;
	private amount: number;
	private speed: number;
	private alphaValue: number;

	constructor(scene: BaseScene, node1: BaseNode, node2: BaseNode, amount: number, isGrounded: boolean=true) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);
		this.setData("test", 4*Math.random());

		this.node1 = node1;
		this.node2 = node2;
		this.amount = Phaser.Math.Easing.Cubic.Out(1*amount);
		this.speed = (1300 - 600 * this.amount) * 6;
		this.speed = 6000;
		this.isGrounded = isGrounded;

		// this.middle = new Phaser.Math.Vector2(
		// 	(node1.x + node2.x) / 2,
		// 	(node1.y + node2.y) / 2
		// );

		this.graphics = this.scene.add.graphics();
		this.graphics.setBlendMode(Phaser.BlendModes.ADD);
		this.add(this.graphics);
		//this.curve = new Phaser.Curves.QuadraticBezier(this.node1, this.middle, this.node2);
		// this.curve = new Phaser.Curves.CubicBezier(
		// 	this.node1,
		// 	new Phaser.Math.Vector2(
		// 		node1.x,
		// 		node1.y + 75 + 20
		// 	),
		// 	new Phaser.Math.Vector2(
		// 		node2.x,
		// 		node1.y + 75 - 20
		// 	),
		// 	this.node2
		// );

		this.curve = new Phaser.Curves.CubicBezier(new Phaser.Math.Vector2(0,0), new Phaser.Math.Vector2(0,0), new Phaser.Math.Vector2(0,0), new Phaser.Math.Vector2(0,0));
		this.updateCurvePosition();


		// this.speed *= this.curve.getLength() / 250;
		// this.dotCount = 1.5 + amount * 3.5; 
		// this.dotDensity = 1.0;

		// this.lineThickness = 2;

		this.drawBezier(0);
	}

	getWidth(): number {
		return (2 + 5 * this.amount) * this.alphaValue;
	}

	isReal(): boolean {
		return this.node1 instanceof Node && this.node2 instanceof Node || this.isGrounded;
	}

	get anyHeld() {
		return (this.node1.holdSmooth + this.node2.holdSmooth) > 0;
	}

	drawBezier(time: number) {
		this.graphics.clear();

		// Debug: Draw the bezier help points

		// this.graphics.lineStyle(1.0, 0XFFFFFF, 0.2);
		// this.graphics.fillStyle(0xFFFFFF, 0.1);
		// let radius = 2;
		// const points = [this.curve.p0, this.curve.p1, this.curve.p2, this.curve.p3];
		// for (let i = 0; i < points.length; i++) {
		// 	this.graphics.fillCircle(points[i].x, points[i].y, radius);
		// 	if (i < 3)
		// 		this.graphics.lineBetween(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
		// }


		// Draw bezier curve

		let color = 0xffffff;
		// let lineAlpha = 0.1 * Phaser.Math.Easing.Cubic.Out(this.amount);
		// this.graphics.lineStyle(this.getWidth(), color, lineAlpha);
		this.graphics.lineStyle(this.lineThickness, 0XFFFFFF, 1.0);
		this.curve.draw(this.graphics);
		// this.graphics.strokePoints(this.getPoints(8));


		// Draw curve dots

		// let count = Math.min(this.dotCount, 10);
		// let count = this.dotDensity * this.curve.getLength()/100;
		// // let radius = this.getWidth();
		// let hack = Math.max(this.node1.liftSmooth, this.node2.liftSmooth, (!this.node1.alive || !this.node2.alive)?1:0);
		// let radius = (2 - 1.5*hack) * this.lineThickness;
		// let speed = this.speed * this.curve.getLength() / 300;
		// let offset = (time / speed) % (1/count);
		// this.graphics.fillStyle(color); // alpha: Math.min(Phaser.Math.Easing.Cubic.Out(this.amount), 1)
		// this.graphics.fillStyle(0xFFFFFF);
		// while (offset < 1) {
		// 	let value = offset;
		// 	let pos = this.curve.getPoint(1-value);

		// 	this.graphics.fillCircle(pos.x, pos.y, radius);

		// 	offset += 1/count;
		// }
	}

	update(time: number, delta: number) {
		this.updateCurvePosition();

		let alive = Math.min(this.node1.aliveValue, this.node2.aliveValue);
		// let hover = Math.max(this.node1.hoverValue, this.node2.hoverValue);
		// let hover2 = Math.min(this.node1.hoverValue, this.node2.hoverValue);
		// let explored = (this.node1.visibility == "explored" || this.node2.visibility == "explored");
		// let visible = (this.node1.visibility == "explored" && this.node2.visibility == "explored");
		// this.alphaValue = (visible ? hover : hover2) * alive * explored;
		this.alphaValue = 1;
		// this.setAlpha(this.alphaValue);
		// this.setAlpha(1);

		this.setAlpha(0);
		if ( this.node1.isInsidePlayingField() && (this.node2.isInsidePlayingField() || this.isGrounded) ) {
			this.setAlpha(Math.min(this.lineThickness/3, 1) * alive);
		}


		if (this.alpha > 0) {
			this.drawBezier(time);
		}
	}


	updateCurvePosition() {
		if (this.isGrounded) {
			let x = this.node1.x;
			let t = this.node1.y + 0.45 * this.node1.getWidth();
			let m = (this.scene.CX + 9*x) / 10;
			let b = 0.78 * this.scene.H;
			let h = Math.abs(b - t);

			this.curve.p0.set(x, t);
			this.curve.p1.set(x, t + h / 4);
			this.curve.p2.set(m, b - h / 4);
			this.curve.p3.set(m, b);

			this.curve.updateArcLengths();
		}
		else {
			// let dist = Phaser.Math.Distance.BetweenPoints(this.node1, this.node2);
			let xdist = Math.abs(this.node2.x-this.node1.x);
			// let ydist = Math.abs(this.node2.y-this.node1.y);

			let temp = new Phaser.Math.Vector2(this.node1);
			temp.subtract(this.node2);
			// temp.scale(0.75);
			temp.setLength(10);
			temp.y -= (-NODE_SIZE+xdist/2+this.node2.y-this.node1.y) * Math.pow(10, 2 - xdist/NODE_SIZE);
			temp.setLength(50+xdist/3);

			let fac = Phaser.Math.Clamp((Math.abs(this.node2.y - this.node1.y - 1.4*NODE_SIZE) + xdist/4)/NODE_SIZE , 0.25, 1);

			// 0-100 instant (1000), 100-200 fast (100), 200-600 decline (10-1), 600+ slow (0.1)

			this.curve.p1.copy(this.curve.p0);
			this.curve.p1.y += NODE_SIZE * fac;

			this.curve.p2.copy(this.curve.p3);
			temp.setLength(fac * temp.length());
			this.curve.p2.add(temp);

			this.curve.p3.copy(this.node2);
			temp.setLength(0.45 * this.node2.getWidth());
			this.curve.p3.add(temp);

			this.curve.p0.copy(this.node1);
			temp.set((this.node2.x-this.node1.x)/5, NODE_SIZE);
			temp.setLength(0.45 * this.node1.getWidth());
			this.curve.p0.add(temp);

			this.curve.updateArcLengths();
		}
	}
}