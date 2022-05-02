import { BaseScene } from "../scenes/BaseScene";
import { language } from "../language/LanguageManager";
import { simulator } from "../simulation/Simulator";
import { colorToNumber, interpolateColor } from "../utils";
import { SIMULATION_LENGTH, DEATH_THRESHOLD, MIN_POPULATION } from "../constants";
import { speciesMap, iconsMap } from "../assets/assetMaps";

export class Graph extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	public background: Phaser.GameObjects.Graphics;
	public foreground: Phaser.GameObjects.Graphics;
	public foregroundSelected: Phaser.GameObjects.Graphics;
	public images: Phaser.GameObjects.Container[];
	public xLabels: Phaser.GameObjects.Text[];

	public width: number;
	public height: number;
	public padding: number;
	public splitSep: number;
	public splitHeight: number;
	public xstep: number;
	public ystep: number;
	public gridSize: number;
	public axisSize: number;
	public lineSize: number;
	public nodeSize: number;

	constructor(scene: BaseScene, width: number, height: number) {
		super(scene, 0, 0);
		scene.add.existing(this);

		this.scene = scene;
		this.width = width;
		this.height = height;
		this.padding = 0.02 * this.width;
		this.splitSep = 0.025 * this.width;
		this.splitHeight = (this.height - 2*this.padding - 2*this.splitSep) / 3;
		this.xstep = 1/8;
		this.ystep = 4;


		// this.setDepth(100);
		// this.setScrollFactor(0);

		this.background = this.scene.add.graphics({x: -this.width/2, y: -this.height/2});
		this.add(this.background);
		this.foreground = this.scene.add.graphics({x: -this.width/2, y: -this.height/2});
		this.add(this.foreground);
		this.foregroundSelected = this.scene.add.graphics({x: -this.width/2, y: -this.height/2});
		this.add(this.foregroundSelected);


		this.gridSize = 0.9;
		// this.stepSize = 1.0;
		this.axisSize = 1.9;
		this.lineSize = 2.5;
		this.nodeSize = 22;

		this.images = [];
		for (const species of simulator.species) {
			let cont = this.scene.add.container(0, 0);
			cont.setVisible(false);
			this.add(cont);
			this.images.push(cont);

			let size = this.nodeSize + 2*this.lineSize;
			let color = colorToNumber(species.color);
			let circle = this.scene.add.ellipse(0, 0, size, size, color);
			cont.add(circle);

			let image = this.scene.add.image(0, 0, "species", speciesMap[species.image]);
			image.setScale(this.nodeSize / image.height);
			cont.add(image);
		}


		this.xLabels = [];
		// this.createXLabels();
		this.createYLabels();

		this.drawBackground(0);
		this.draw(0);
	}


	createXLabels() {
		let fontSize = 12; // Font size
		let labelX = -0.5 * this.width; // Label left
		let labelY = 0.5 * this.height; // Label top
		let texts = ["graph_jan","graph_feb","graph_mar","graph_apr","graph_may","graph_jun","graph_jul","graph_aug","graph_sep","graph_oct","graph_nov","graph_dec"];

		for (var i = 0; i < 12; i++) {
			let sep = 1 * this.padding;
			let x = labelX + (0.0 + 1/11*i) * (this.width - 2*sep) + sep;
			let y = labelY - 0.5*this.padding;
			let label = this.scene.createText(x, y, fontSize, this.scene.weights.regular, "#FFF");
			label.setOrigin(0.5, 0.0);
			label.setAlpha(0.7);
			language.bind(label, texts[i]);

			this.add(label);
			this.xLabels.push(label);
		}
	}

	createYLabels() {
		let fontSize = 12; // Font size
		let xLabelX = 0.5 * this.width - 0*this.padding + 1.0*fontSize; // Label left
		let xLabelY = 0.5 * this.height - this.padding; // Label top
		let yLabelX = -0.5 * this.width - 4.9*fontSize + this.padding; // Label left
		let yLabelY = -0.5 * this.height - 0.5*fontSize; // Label top
		let texts = ["> 100,000", "> 10,000", "> 1,000", "> 100"];

		let xAxis = this.scene.createText(xLabelX, xLabelY, 1.2*fontSize, this.scene.weights.normal, "#FFF", "Label");
		xAxis.setOrigin(0.0, 0.5);
		language.bind(xAxis, "graph_time");
		xAxis.setVisible(false);
		this.add(xAxis);

		let yAxis = this.scene.createText(yLabelX, yLabelY, 1.2*fontSize, this.scene.weights.normal, "#FFF", "Label");
		yAxis.setOrigin(-0.47, 0.5);
		language.bind(yAxis, "graph_population");
		this.add(yAxis);

		// for (var i = 0; i < 4; i++) {
		// 	let sep = 2.4 * this.padding;
		// 	let x = yLabelX;
		// 	let y = yLabelY + (0.0 + 1/3*i) * (this.height - 2*sep) + sep;
		// 	let label = this.scene.createText(x, y, fontSize, this.scene.weights.regular, "#FFF", texts[i]);
		// 	label.setOrigin(0.0, 0.5);
		// 	label.setAlpha(0.7);

		// 	this.add(label);
		// }

		for (let k = 0; k < 3; k++) {

			let x = -0.5 * this.width - 2*this.padding;
			let y = -0.5 * this.height + this.padding + (k+0.5) * this.splitHeight + k * this.splitSep;
			let key = ["icon-plant-soil", "icon-leaf", "icon-meat"][k];
			let color = [0x34A853, 0xFBBC05, 0xEA4335][k];
			let size = 1.2 * this.nodeSize;

			let circle = this.scene.add.ellipse(x, y, size, size, color);
			this.add(circle);

			let image = this.scene.add.image(x, y, "icons", iconsMap[key]);
			image.setScale(0.8 * size / image.height);
			image.setTint(0);
			this.add(image);
		}
	}


	updateXLabels(time: number) {
		let right = Math.max(time, SIMULATION_LENGTH);
		let left = right - SIMULATION_LENGTH;
		let pos = left / SIMULATION_LENGTH;
		let index = Math.floor(pos / this.xstep);

		for (var i = this.xLabels.length - 1; i >= 0; i--) {
			this.xLabels[i].setAlpha(0);
		}


		for (let i = 0; i <= 1+this.xstep; i += this.xstep) {
			const vx = -0.5*this.width + this.padding + (i - pos%this.xstep) * (this.width - 2*this.padding);
			const label = this.xLabels[index % this.xLabels.length];
			label.x = vx;

			let alpha = 0.7;
			if (i == 0) {
				// Rapid fade out
				alpha = 0.7 * (1 - 4 * (pos%this.xstep) / this.xstep);
			}
			else if (i > 1) {
				// Late fade in
				alpha = 0.7 * (-3 + 4 * (pos%this.xstep) / this.xstep);
			}
			label.setAlpha(alpha);

			index++;
		}
	}


	drawBackground(time: number) {
		this.background.clear();

		const left = this.padding;
		const right = this.width - this.padding;

		let offset = (Math.max(time, SIMULATION_LENGTH) - SIMULATION_LENGTH) / SIMULATION_LENGTH; // right - left

		// Help grid
		this.background.lineStyle(this.gridSize, 0xA77440, 0.5);
		this.background.fillStyle(0xA77440, 0.05);
		for (let k = 0; k < 3; k++) {

			let top = this.padding + k * this.splitHeight + k * this.splitSep;
			let bot = this.padding + (k+1) * this.splitHeight + k * this.splitSep;

			this.background.fillRect(left, top, right-left, bot-top);

			for (let i = 0; i <= 1; i += this.xstep) {
				const vx = left + Math.min(i+this.xstep - offset%this.xstep, 1) * (right - left);
				this.background.lineBetween(vx, top, vx, bot);
			}
			for (let i = 0; i <= this.ystep; i++) {
				const hy = top + i / this.ystep * (bot - top);
				this.background.lineBetween(left, hy, right, hy);
			}
		}

		// Axis steps
		// this.background.lineStyle(this.stepSize, 0xffffff, 1.0);
		// for (let i = 0; i <= 1; i += 0.1) {
		// 	const hx = this.padding / 2;
		// 	const hy = this.padding + i * (this.height - 2*this.padding);
		// 	const vx = this.padding + i * (this.width - 2*this.padding);
		// 	const vy = this.height - this.padding / 2;

		// 	this.background.lineBetween(hx, hy, hx+this.padding, hy);
		// 	this.background.lineBetween(vx, vy, vx, vy-this.padding);
		// }

		// Axises
		this.background.lineStyle(this.axisSize, 0xFFFFFF);
		this.background.fillStyle(0xFFFFFF);
		for (let k = 0; k < 3; k++) {
			let top = this.padding + k * this.splitHeight + k * this.splitSep;
			let bot = this.padding + (k+1) * this.splitHeight + k * this.splitSep;
			this.background.strokePoints([{x:left, y:top},{x:left, y:bot}]);
			this.background.strokePoints([{x:left, y:bot},{x:right, y:bot}]);

			this.background.fillCircle(left, bot, 1.2*this.axisSize);
			this.background.fillCircle(left, top, 1.2*this.axisSize);
			this.background.fillCircle(right, bot, 1.2*this.axisSize);
		}
	}

	clear() {
		for (let s = 0; s < simulator.species.length; s++) {
			this.images[s].setVisible(false);
		}
		this.draw(0);
	}

	draw(time: number) {
		this.drawBackground(time);
		// this.updateXLabels(time);
		this.foreground.clear();
		this.foregroundSelected.clear();


		/* Data */

		let right = Math.max(time, SIMULATION_LENGTH);
		let left = right - SIMULATION_LENGTH;

		let data: any = [];

		// Collect data points within the graph's timeframe
		for (let i = 0; i < simulator.history.x.length; i++) {
			let x = simulator.history.x[i];

			// Remove duplicate x
			if (data.length > 0 && x == data[data.length-1].x) {
				data.splice(data.length-1, 1);
			}

			if (x < time) {
				if (x > time - SIMULATION_LENGTH) {
					let y = simulator.history.y[i];

					// Snap leftmost data point to 0 to prevent overlap
					if (data.length == 0 && i > 0) {
						let x2 = simulator.history.x[i-1];
						let y2 = simulator.history.y[i-1];
						let y3: any = [];
						let k = (left-x2)/(x-x2);
						for (var j = 0; j < y.length; j++) {
							y3[j] = y2[j] + k * (y[j]-y2[j]);
						}
						data.push({x:left, y:y3});
					}

					data.push({x, y});
				}
			}
			else {
				x = time;
				let y = simulator.sol.at(x);
				data.push({x, y});
				break;
			}
		}


		/* Nodes */

		for (let s = 0; s < simulator.species.length; s++) {
			let species = simulator.species[s];

			// let populations = simulator.getPopulationAt(time);
			let points: any = [];
			let wasAlive = false;
			let alive = false;

			for (var i = 0; i < data.length; i++) {
				let x = data[i].x;
				let y = data[i].y[s];
				let cat = species.category;

				y = Math.max(y, MIN_POPULATION);
				// y *= species.populationModifier;
				y /= simulator.maxCatValues[cat];

				// y = Math.max(y, 1);
				// y = Math.log10(y) / Math.log10(10000);
				// y = (Math.log10(y) - Math.log10(0.001)) / (Math.log10(1.0) - Math.log10(0.001));
				// y *= 10;

				alive = y > DEATH_THRESHOLD;
				wasAlive = wasAlive || alive;
				x = (x - left) / (right - left);
				y = 1 - y;

				let top = this.padding + cat * (this.splitHeight + this.splitSep);

				points.push({
					x: this.padding + x * (this.width - 2*this.padding),
					// y: this.padding + y * (this.height - 2*this.padding),
					y: top + y * this.splitHeight,
					// alpha: Phaser.Math.Clamp((1-y)*5, 0, 1)
				});
			}

			const color = colorToNumber(species.color);
			const last = points[points.length-1] ?? {x:0, y:0};

			if (wasAlive) { // species.showGraph
				this.foreground.lineStyle(this.lineSize, colorToNumber(species.color));
				this.foreground.strokePoints(points, false, false);

				// Display data points as circles
				// for (const p of points) {
					// this.foreground.fillStyle(color);
					// this.foreground.fillCircle(p.x, p.y, 4.0);
				// }
			}

			if (wasAlive) {
				this.foreground.fillStyle(color);
				this.foreground.fillCircle(last.x, last.y, 1.4*this.lineSize);
				this.images[s].setPosition(last.x + this.foreground.x + 0*(this.nodeSize + 2*this.lineSize)/2, last.y + this.foreground.y);
			}
			this.images[s].setVisible(wasAlive);
			// this.images[s].setAlpha(last.alpha);

			// if (this.scene.selectedNode) {
			// 	if (species == this.scene.selectedNode.species) {
			// 		this.foregroundSelected.lineStyle(4.0, 0xffffff, 1.0);
			// 		this.foregroundSelected.strokePoints(points, false, false);

			// 		this.foregroundSelected.fillStyle(0xffffff, 1.0);
			// 		this.foregroundSelected.fillCircle(p.x, p.y, 5);
			// 	}
			// }
		}
	}
}