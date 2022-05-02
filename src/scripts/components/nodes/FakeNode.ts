import { BaseScene } from "../../scenes/BaseScene";
import { BaseNode } from "./BaseNode";
import { Node } from "./Node";
import { NODE_SIZE } from "../../constants";
import { language } from "../../language/LanguageManager";

export class FakeNode extends BaseNode {
	private graphics: Phaser.GameObjects.Graphics;
	private replacements: Node[];
	private text: Phaser.GameObjects.Text;
	private alphaGoal: number;

	public origX: number;
	public goalX: number;
	public goalY: number;

	constructor(scene: BaseScene, x: number, y: number, category: number) {
		super(scene, x, y);
		scene.add.existing(this);

		this.replacements = [];
		this.alphaGoal = 0;
		this.alpha = 0;
		this.category = category;
		this.aliveValue = 1;

		this.origX = x;
		this.goalX = x;
		this.goalY = y;

		this.graphics = scene.add.graphics({x: 0, y: 0});
		this.graphics.lineStyle(2.0, 0xffffff, 1.0);
		let count = 12;
		for (var i = 0; i < count; i++) {
			let angle = 360 * i/count;
			this.graphics.beginPath();
			this.graphics.arc(0, 0, NODE_SIZE/2-2/2, Phaser.Math.DegToRad(angle), Phaser.Math.DegToRad(angle+360/count/2), false, 0.01);
			// this.graphics.closePath();
			this.graphics.strokePath();
		}
		this.add(this.graphics);

		this.text = this.scene.createText(0, 0, 30, this.scene.weights.bold, "#FFF", "");
		this.text.setOrigin(0.5);
		this.text.setScale(0.5);
		language.bind(this.text, ["node_plant", "node_herbivore", "node_carnivore"][category]);
		this.add(this.text);
	}

	update(time: number, delta: number) {
		super.update(time, delta);

		this.x += (this.goalX - this.x) * (1 - Math.pow(0.95, 60*delta));
		this.y += (this.goalY - this.y) * (1 - Math.pow(0.95, 60*delta));

		let anyInside = this.replacements.some(node => node.isInsidePlayingField() || !node.stick);
		let anyActive = this.replacements.some(node => node.inPlay || Phaser.Math.Distance.BetweenPoints(node, this) < NODE_SIZE*2);

		this.graphics.setRotation(time/6000);

		// 0.0 if any node is active
		// 0.5 if any node is held, not yet active
		// 1.0 if idle
		this.alphaGoal =
			(anyActive) ?
				0.0 :
				(!anyActive && anyInside) ?
					0.5+0.25*Math.sin(0.008*time) :
					1.0;
		this.setScale(
			(!anyActive && anyInside) ?
				1.0+0.03*Math.sin(0.008*time) :
				1.0
		);

		this.alpha += Phaser.Math.Clamp(this.alphaGoal - this.alpha, -delta/0.5, delta/0.5);
	}

	addReplacement(node: Node) {
		this.replacements.push(node);
	}

	isInsidePlayingField(): boolean {
		return this.visible && this.replacements.every(node => node.stick && !node.isInsidePlayingField());
	}

	getWidth(): number {
		return NODE_SIZE + 4;
	}
}