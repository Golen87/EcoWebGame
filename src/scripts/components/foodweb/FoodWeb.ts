import { BaseScene } from "../../scenes/BaseScene";
import { FoodWebNode } from "./FoodWebNode";
import { FoodWebButton } from "./FoodWebButton";
import { RoundRectangle } from "../RoundRectangle";
import { language } from "../../language/LanguageManager";
import { Scenario } from "../../simulation/Scenario";
import { database } from "../../database/Database";
import { jiggle } from "../../utils";

interface Relation {
	pred: FoodWebNode;
	prey: FoodWebNode;
	line: Phaser.Curves.Line;
}

export class FoodWeb extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public config: any;

	private infoBox: Phaser.GameObjects.Container;
	private infoBg: RoundRectangle;
	private infoImage: Phaser.GameObjects.Image;
	private infoTitle: Phaser.GameObjects.Text;
	private infoDescription: Phaser.GameObjects.Text;
	private infoIucn: Phaser.GameObjects.Container;
	private infoIucnBg: RoundRectangle;
	private infoIucnStatus: Phaser.GameObjects.Text;
	private infoIucnText: Phaser.GameObjects.Text;
	private infoIucnSelected: string;
	private infoIucnHeld: boolean;

	private nodeContainer: Phaser.GameObjects.Container;
	private nodes: FoodWebNode[];
	private anyNodesSelected: boolean;

	private buttons: FoodWebButton[];

	private relationGraphics: Phaser.GameObjects.Graphics;
	private relations: Relation[];

	constructor(scene, x, y) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		let BORDER = 200;
		let WX = BORDER;
		let WY = BORDER;
		let WW = scene.W - 2*BORDER;
		let WH = scene.H - 3*BORDER;
		let groupPositions = {
			// Carnivores
			1:  new Phaser.Math.Vector2(WX+0.95*WW, WY+0.30*WH),
			2:  new Phaser.Math.Vector2(WX+0.85*WW, WY+0.70*WH),

			// Herbivores
			3:  new Phaser.Math.Vector2(WX+0.50*WW, WY+0.10*WH),
			4:  new Phaser.Math.Vector2(WX+0.55*WW, WY+0.45*WH),
			5:  new Phaser.Math.Vector2(WX+0.50*WW, WY+0.70*WH),
			6:  new Phaser.Math.Vector2(WX+0.60*WW, WY+0.95*WH),

			// Plants
			7:  new Phaser.Math.Vector2(WX+0.10*WW, WY+0.05*WH),
			8:  new Phaser.Math.Vector2(WX+0.20*WW, WY+0.10*WH),
			9:  new Phaser.Math.Vector2(WX+0.10*WW, WY+0.30*WH),
			10: new Phaser.Math.Vector2(WX+0.20*WW, WY+0.30*WH), // 1
			11: new Phaser.Math.Vector2(WX+0.20*WW, WY+0.55*WH),
			12: new Phaser.Math.Vector2(WX+0.10*WW, WY+0.55*WH), // 1
			13: new Phaser.Math.Vector2(WX+0.10*WW, WY+0.80*WH),
			14: new Phaser.Math.Vector2(WX+0.25*WW, WY+0.95*WH), // 2
		};
		let groupColors = {
			1: 0xF44336, 2: 0xE91E63, 3: 0x9C27B0, 4: 0x673AB7, 5: 0x3F51B5, 6: 0x2196F3, 7: 0x03A9F4, 8: 0x00BCD4, 9: 0x009688, 10: 0x4CAF50, 11: 0x8BC34A, 12: 0xCDDC39, 13: 0xFFEB3B, 14: 0xFFC107
		};
		let iucnColors = {
			"null": 0x9E9E9E, CR: 0xe40521, EN: 0xeb6209, VU: 0xe29b00, NT: 0x007060, LC: 0x006d8a
		};
		let iucnTextColors = {
			"null": "#FFFFFF", CR: "#000000", EN: "#000000", VU: "#000000", NT: "#FFFFFF", LC: "#FFFFFF"
		};

		// Settings for the large web, used by nodes and changed by scene sliders
		this.config = {
			mode: 0, // Slider value to interpolate between group and link mode

			centering: 0.04, // Pull on average position towards center
			gravity: 50, // Pull towards center
			linkDistance: 150, // Distance to be maintained between nodes
			linkStrength: 0.04, // How firmly the link distance is maintained
			charge: -50, // How much nodes repel each other
			friction: 0.5, // Velocity multiplier each step
			groupStrength: 10, // Pull towards group positions

			groupPositions, // Group positions
			groupColors, // Group outline colors
			iucnColors, // IUCN endangerment colors
			iucnTextColors, // IUCN endangerment text colors
			center: new Phaser.Math.Vector2(WX+WW/2, WY+WH/2), // Center point which gravity pulls towards
			centerOffset: new Phaser.Math.Vector2(0, 0), // Center point which gravity pulls towards

			// Borders which nodes stay within
			borderLeft: -100,
			borderTop: -100,
			borderRight: scene.W + 100,
			borderBottom: scene.H + 100,

			attractionMode: false,
			attractionTimer: 0,
		};

		this.initNodes();
		this.initRelations();
		this.initButtons();
		this.initInfoBox();

		this.bringToTop(this.nodeContainer);
	}


	update(time, delta) {
		this.config.gravity = 50 - 20 * this.config.mode;
		this.config.charge = -50 - 50 * this.config.mode;

		if (this.config.attractionMode) {
			this.config.gravity *= 1 + 3 * Phaser.Math.Easing.Quadratic.InOut(0.5 + 0.5 * Math.sin(time/8000));

			// if (time > this.config.attractionTimer) {
			// 	this.unselectNodes();
			// 	Phaser.Math.RND.pick(this.nodes)._selected = true;
			// 	Phaser.Math.RND.pick(this.nodes)._selected = true;
			// 	Phaser.Math.RND.pick(this.nodes)._selected = true;
			// 	this.config.attractionTimer = time + 3000;
			// }
		}

		this.infoIucnBg.setScale(this.infoIucnHeld ? 0.94 : 1.0);
		this.infoIucnText.setScale(this.infoIucnHeld ? 0.94 : 1.0);

		this.anyNodesSelected = false;
		this.updateNodes(time, delta);
		this.drawRelations(time, delta);

		for (const node of this.nodes) {
			node.update(time, delta);
			node.highlightIucn(this.infoIucnHeld, this.infoIucnSelected);
		}

		for (const button of this.buttons) {
			button.update(time, delta);
		}

		this.nodeContainer.sort("y");
	}


	initNodes() {
		this.nodes = [];
		this.nodeContainer = this.scene.add.container(0, 0);
		this.add(this.nodeContainer);

		let scenarioData = database.getScenario("serengeti_all")!;
		let scenario = new Scenario(scenarioData);

		for (let species of scenario.species) {

			// let x = Phaser.Math.Between(0, this.scene.W);
			// let y = Phaser.Math.Between(0, this.scene.H);
			let x = Phaser.Math.Between(this.config.borderLeft, this.config.borderRight);
			let y = (Math.random() < 1.0) ? this.config.borderTop : this.config.borderBottom;
			// let x = this.groupPositions[species.group].x + (-1+2*Math.random()) * 100;
			// let y = this.groupPositions[species.group].y + (-1+2*Math.random()) * 100;

			let node = new FoodWebNode(this.scene, x, y, species, this.config);
			this.nodeContainer.add(node);
			this.nodes.push(node);

			node.on('onSelect', (target, active) => {
				this.unselectNodes();
				if (active) {
					this.setInfoBox(target);
				}
				else {
					this.clearInfoBox();
				}
			});
		}
	}

	resetNodes() {
		for (const node of this.nodes) {
			let x = Phaser.Math.Between(this.config.borderLeft, this.config.borderRight);
			let y = this.config.borderTop;

			node.setPosition(x, y);
			node.resetLock();
		}
	}

	initRelations() {
		this.relations = [];
		this.relationGraphics = this.scene.add.graphics();
		this.add(this.relationGraphics);
		this.sendToBack(this.relationGraphics);

		for (const pred of this.nodes) {
			for (const prey of this.nodes) {
				let relation = database.getNodeRelation(pred.species.id, prey.species.id);
				if (relation) {
					this.addRelation(pred, prey);
				}
			}
		}
	}

	addRelation(pred: FoodWebNode, prey: FoodWebNode) {
		pred.neighbours.push(prey);
		prey.neighbours.push(pred);

		this.relations.push({
			pred,
			prey,
			line: new Phaser.Curves.Line(
				new Phaser.Math.Vector2(pred),
				new Phaser.Math.Vector2(prey)
			)
		});
	}

	initButtons() {
		this.buttons = [];

		let chosen = [
			"panthera_leo", // Lion
			"lycaon_pictus", // Vildhund
			"equus_quagga", // Zebra
			"madoqua_kirkii", // Kirk's dik-dik
			"connochaetes_taurinus", // Gnu
			// "aepyceros_melampus", // Impala
			"kobus_ellipsiprymnus", // Vattenbock
			// "heteropogon_contortus", // Heteropogon
			"allophylus_rubifolius", // Allophylus rubifolius
			"panicum_coloratum", // Panicum coloratum
			// "themeda_triandra", // Kängrugräs
			// "digitaria_scalarum", // Fingerhirs
			"acacia_tortilis", // Acacia
		];

		for (let i = 0; i < chosen.length; i++) {
			let id = chosen[i];
			for (const node of this.nodes) {
				if (id == node.species.id) {
					let size = 55;
					let x = this.scene.CX + 1.4 * size * (i - (chosen.length-1)/2);
					let y = 0.88 * this.scene.H;

					let obj = new FoodWebButton(this.scene, x, y, size, node.species.image);
					this.add(obj);
					this.buttons.push(obj);

					node.hyperLink = obj;

					obj.on('click', () => {
						node.selected = !node._selected;
					}, this);
				}
			}
		}

	}

	initInfoBox() {
		let m = 15;
		let p = 15;
		let w = 0.25 * this.scene.W;
		let h = 0.22 * this.scene.H - 2*m;
		let x = w/2 + m;
		let y = this.scene.H - h/2 - m;

		this.infoBox = this.scene.add.container(x, y);
		this.infoBox.setAlpha(0);
		this.add(this.infoBox);

		this.infoBg = new RoundRectangle(this.scene, 0, 0, w, h, 5, 0X222222);
		this.infoBg.setAlpha(0.5);
		this.infoBox.add(this.infoBg);

		let titleSize = 24;
		let imgFac = 1.4;

		this.infoTitle = this.scene.createText(-w/2+p, -h/2+p + 1*titleSize/2, titleSize, this.scene.weights.regular, "#FFF", "Title");
		this.infoTitle.setOrigin(0, 0.5);
		this.infoBox.add(this.infoTitle);

		this.infoDescription = this.scene.createText(-w/2+p, -h/2+p + (1+0.5)*titleSize, 16, this.scene.weights.regular, "#FFF", "Description");
		this.infoDescription.setOrigin(0);
		this.infoDescription.setWordWrapWidth(w-2*p, true);
		// this.infoDescription.setLineSpacing(10);
		this.infoBox.add(this.infoDescription);

		this.infoImage = this.scene.add.image(w/2-p, -h/2+p, "PANLEO");
		this.infoImage.setScale(imgFac*titleSize / this.infoImage.width);
		this.infoImage.setOrigin(1.0, 0.0);
		this.infoBox.add(this.infoImage);

		let size = titleSize;
		let ix = w/2-p;
		let iy = h/2-p-size/2;

		this.infoIucn = this.scene.add.container(ix, iy);
		this.infoBox.add(this.infoIucn);

		this.infoIucnBg = new RoundRectangle(this.scene, 0, 0, size, size, size/2, 0xFFFFFF, 1.0);
		this.infoIucnBg.setOrigin(0.5);
		this.infoIucn.add(this.infoIucnBg);

		this.infoIucnText = this.scene.createText(0, 0, 14, this.scene.weights.regular, "#000", "XX");
		this.infoIucnText.setOrigin(0.5);
		this.infoIucn.add(this.infoIucnText);

		this.infoIucnStatus = this.scene.createText(0, 0, 14, this.scene.weights.regular, "#ffffff", "Status");
		this.infoIucnStatus.setOrigin(1.0, 0.5);
		language.bind(this.infoIucnStatus, "iucn_status");
		this.infoIucn.add(this.infoIucnStatus);

		// Allow highlighting species by clicking the IUCN button
		this.infoIucnHeld = false;
		this.infoIucnBg.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => { this.infoIucnHeld = true; })
			.on('pointerout', () => { this.infoIucnHeld = false; })
			.on('pointerup', () => { this.infoIucnHeld = false; });

		this.clearInfoBox();
	}

	setInfoBox(node) {
		// this.infoBox.setVisible(true);
		language.bind(this.infoTitle, node.species.id);
		// language.bind(this.infoDescription, "...");
		this.infoDescription.setText("Dolore in consectetur dolor sunt cupidatat mollit veniam consectetur mollit dolore velit fugiat laborum labore do do veniam.");
		// this.infoIucnText.setText(node.species.iucn);

		this.infoImage.setTexture(node.species.image);

		let key = node.species.iucn ? "iucn_" + node.species.iucn : "";
		language.bind(this.infoIucnText, key, this.resizeInfoIucn.bind(this));

		this.infoIucnSelected = node.species.iucn;
		this.infoIucnText.setColor(this.config.iucnTextColors[node.species.iucn]);
		this.infoIucnBg.setColor(this.config.iucnColors[node.species.iucn]);

		this.scene.tweens.add({
			targets: this.infoBox,
			alpha: { from: this.infoBox.alpha, to: 1 },
			duration: 150
		});
	}

	clearInfoBox() {
		// this.infoBox.setVisible(false);
		this.scene.tweens.add({
			targets: this.infoBox,
			alpha: { from: this.infoBox.alpha, to: 0 },
			duration: 150
		});
	}

	resizeInfoIucn() {
		if (this.infoIucnText.displayWidth > 0) {
			this.infoIucnBg.setVisible(true);
			this.infoIucnStatus.setVisible(true);
			this.infoIucnBg.setWidth(this.infoIucnText.width + this.infoIucnBg.height);
			this.infoIucnBg.x = -this.infoIucnBg.width/2;
			this.infoIucnText.x = -this.infoIucnBg.width/2;
			this.infoIucnStatus.x = -this.infoIucnBg.width - this.infoIucnBg.height/4;

			// Add padding to button for easier clicking
			this.infoIucnBg.input.hitArea.setTo(-15, -15, this.infoIucnBg.width+2*15, this.infoIucnBg.height+2*15);
		}
		else {
			this.infoIucnBg.setVisible(false);
			this.infoIucnStatus.setVisible(false);
		}
	}


	updateNodes(time, delta) {
		let node1, node2;
		let n = this.nodes.length;
		let sx = 0, sy = 0;

		for (let i = 0; i < n; i++) {
			node1 = this.nodes[i];
			sx += node1.x;
			sy += node1.y;
			this.anyNodesSelected = this.anyNodesSelected || node1.selected;
		}
		sx = (sx / n - this.config.center.x - this.config.centerOffset.x) * this.config.centering * this.config.mode;
		sy = (sy / n - this.config.center.y - this.config.centerOffset.y) * this.config.centering * this.config.mode;

		for (let i = 0; i < n; i++) {
			node1 = this.nodes[i];
			node1.move(-sx, -sy);
			node1.setAlphaGoal(this.anyNodesSelected ? 0.3 : 1.0);
			if (this.infoIucnHeld && this.infoIucnSelected == node1.species.iucn) {
				node1.setAlphaGoal(1.0);
			}
		}

		let pred, prey, x, y, l, count1, count2, bias;
		for (let i = 0, n = this.relations.length; i < n; i++) {
			pred = this.relations[i].pred;
			prey = this.relations[i].prey;

			// let boost = ((pred.selected && !pred._held) || prey.selected && !prey._held) ? 3 : 1;

			// x = pred.x + pred.velocity.x - prey.x - prey.velocity.x || jiggle();
			// y = pred.y + pred.velocity.y - prey.y - prey.velocity.y || jiggle();
			x = pred.x - prey.x || jiggle();
			y = pred.y - prey.y || jiggle();
			l = Math.sqrt(x * x + y * y);
			l = (l - this.config.linkDistance) / l * this.config.linkStrength * (this.config.mode*this.config.mode);
			x *= l;
			y *= l;
			// count1 = pred.neighbours.length;
			// count2 = prey.neighbours.length;
			// bias = count1 / (count1 + count2);
			// bias = pred.size / (pred.size + prey.size);
			bias = 0.5;

			pred.velocity.x -= x * (1 - bias);
			pred.velocity.y -= y * (1 - bias);
			prey.velocity.x += x * bias;
			prey.velocity.y += y * bias;
		}

		for (let i = 0; i < n; i++) {
			node1 = this.nodes[i];
			for (let j = i+1; j < n; j++) {
				node2 = this.nodes[j];
				let dx = node2.x - node1.x;
				let dy = node2.y - node1.y;
				let l2 = dx * dx + dy * dy; // Squared distance

				if (dx === 0) {
					dx = jiggle();
					l2 += dx * dx;
				}
				if (dy === 0) {
					dy = jiggle();
					l2 += dy * dy;
				}

				// if (l2 < 1) l2 = 1;

				node1.velocity.x += dx / l2 * this.config.charge;
				node1.velocity.y += dy / l2 * this.config.charge;
				node2.velocity.x -= dx / l2 * this.config.charge;
				node2.velocity.y -= dy / l2 * this.config.charge;

				// Separation test
				let sepRad = (node1.size/2 + node2.size/2) * 1.25;
				let l = Math.sqrt(l2);
				let sepFac = Math.pow(Math.max(0, (sepRad - l) / sepRad), 2);
				node1.velocity.x -= 1 * dx * sepFac;
				node1.velocity.y -= 1 * dy * sepFac;
				node2.velocity.x += 1 * dx * sepFac;
				node2.velocity.y += 1 * dy * sepFac;
			}
		}
	}

	drawRelations(time, delta) {
		this.relationGraphics.clear();

		for (const relation of this.relations) {
			// let active = (node == this.selectedWebNode || other == this.selectedWebNode);
			// let thickness = active ? 4.0 : 1.0;
			// let alpha = active ? 0.75 : 0.14;
			// this.relationGraphics.setBlendMode(Phaser.BlendModes.ADD);

			let visibility: number = relation.pred.visibility * relation.prey.visibility;
			let selected: number = visibility * (relation.pred.selected || relation.prey.selected ? 1 : 0) * (this.infoIucnHeld ? 0 : 1);

			let strokeWidth = selected > 0 ? 2.5 : 1.5;
			let strokeColor = selected > 0 ? 0xFFFFFF : 0xFFFFFF;
			let strokeOpacity = selected > 0 ? 0.9 : 0.1 * visibility;
			this.relationGraphics.lineStyle(strokeWidth, strokeColor, strokeOpacity);

			relation.line.p0.x = relation.pred.x;
			relation.line.p0.y = relation.pred.y;
			relation.line.p1.x = relation.prey.x;
			relation.line.p1.y = relation.prey.y;
			relation.line.draw(this.relationGraphics);


			if (this.anyNodesSelected && selected && !this.infoIucnHeld) {
				relation.pred.setAlphaGoal(1.0);
				relation.prey.setAlphaGoal(1.0);
			}
		}
	}


	unselectNodes() {
		for (const node of this.nodes) {
			node._selected = false;
		}
	}

	toggleAttraction(state: boolean) {
		this.config.attractionMode = state;

		for (const button of this.buttons) {
			button.setVisible(!state);
		}

		this.unselectNodes();
		this.clearInfoBox();
		this.infoBox.setVisible(!state);

		if (state) {
			this.config.centerOffset.set(0, 100);
		}
		else {
			this.config.centerOffset.set(0, 0);
		}
	}
}