import { BaseScene } from "../scenes/BaseScene";
import { Node } from "./nodes/Node";
import { simulator } from "../simulation/Simulator";
import { NODE_SIZE } from "../constants";

interface Area {
	type: string;
	cont: Phaser.GameObjects.Container;
	circle: Phaser.GameObjects.Ellipse;
	text1: Phaser.GameObjects.Text;
	text2: Phaser.GameObjects.Text;
	predIndex: number;
	preyIndex?: number;
}

export class MatrixEditor extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	private graphics: Phaser.GameObjects.Graphics;
	private areas: Map<string, Area>;

	constructor(scene: BaseScene) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);

		this.graphics = this.scene.add.graphics();
		this.graphics.setBlendMode(Phaser.BlendModes.ADD);
		this.add(this.graphics);
	}

	draw(nodes: Node[]): void {
		if (!this.visible) {
			return;
		}

		if (!this.areas) {
			this.createAreas(nodes);
		}

		this.graphics.clear();
		this.graphics.lineStyle(4, 0x555555);
		this.graphics.fillStyle(0x555555);

		for (let pred of nodes) {

			let nodeArea = this.areas.get(pred.species.id)!;
			nodeArea.cont.setVisible(pred.inPlay && pred.visible);
			nodeArea.cont.x = pred.x + 0*NODE_SIZE/2;
			nodeArea.cont.y = pred.y - 0*NODE_SIZE/2;
			nodeArea.text1.setText(simulator.getGrowthRate(nodeArea.predIndex).toFixed(1));
			let value = simulator.getExtraGrowthRate(nodeArea.predIndex);
			value = Math.round((value + 1e-6) * 10) / 10;
			nodeArea.text2.setText((value>0 ? "+" : "") + value.toFixed(1));
			nodeArea.text2.setColor((value>0 ? "#007700" : value<0 ? "#770000" : "#444444"));

			for (let prey of pred.neighbours) {
				let pathArea = this.areas.get(pred.species.id + prey.species.id)!;

				if (pred.inPlay && pred.visible && prey.inPlay && prey.visible) {

					let value = simulator.getExtraInteractionStrength(pathArea.predIndex, pathArea.preyIndex!);
					value = Math.round((value + 1e-6) * 10) / 10;
					pathArea.text2.setText((value>0 ? "+" : "") + value.toFixed(1));
					pathArea.text2.setColor((value>0 ? "#007700" : value<0 ? "#770000" : "#444444"));

					let width = 4 * simulator.getInteractionStrength(pathArea.predIndex, pathArea.preyIndex!);
					this.graphics.lineStyle(width, 0x555555);
					this.graphics.lineBetween(pred.x, pred.y, prey.x, prey.y);

					let vec = new Phaser.Math.Vector2();
					vec.copy(prey);
					vec.subtract(pred);
					vec.setLength(NODE_SIZE);
					vec.add(pred);

					pathArea.cont.setVisible(true);
					pathArea.cont.x = vec.x;
					pathArea.cont.y = vec.y;
					pathArea.text1.setText(simulator.getInteractionStrength(pathArea.predIndex, pathArea.preyIndex!).toFixed(1));
				}
				else {
					pathArea.cont.setVisible(false);
				}
			}
		}
	}

	createAreas(nodes: Node[]): void {
		this.areas = new Map();

		for (let pred of nodes) {
			this.createArea("node", pred.species.id, pred.simIndex);

			for (let prey of pred.neighbours) {
				this.createArea("path", pred.species.id + prey.species.id, pred.simIndex, prey.simIndex);
			}
		}
	}

	createArea(type: string, id: string, predIndex: number, preyIndex?: number): void {
		const size = 0.5 * NODE_SIZE;
		const color = (preyIndex === undefined) ? 0xFFFF77 : 0xFFFFFF;

		let circle = this.scene.add.ellipse(0, 0, size, size, color, 0.5);
		let text1 = this.scene.createText(0, 0, 16, this.scene.weights.black, "#000", "?");
		let text2 = this.scene.createText(0, 0, 16, this.scene.weights.black, "#000", "?");
		let cont = this.scene.add.container(0, 0, [circle, text1, text2]);
		let area = { type, cont, circle, text1, text2, predIndex, preyIndex };

		this.add(cont);
		text1.setOrigin(0.5, 1.1);
		text2.setOrigin(0.5, -0.1);
		circle.setInteractive({ useHandCursor: true })
			.on('wheel', (pointer: Phaser.Input.Pointer, deltaX: number, deltaY: number) => {
				this.onWheel(area, deltaY);
				this.emit("change");
			});

		this.areas.set(id, area);
	}

	onWheel(area: Area, deltaY: number) {
		const dir = (deltaY > 0) ? -0.1 : 0.1;
		if (area.type == "node") {
			simulator.incGrowthRate(area.predIndex, dir);
		}
		else {
			simulator.incInteractionStrength(area.predIndex, area.preyIndex!, dir);
			simulator.incInteractionStrength(area.preyIndex!, area.predIndex, -dir);
		}
	}
}