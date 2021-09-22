import { BaseScene } from "../../scenes/BaseScene";
import { FoodWebNode } from "./FoodWebNode";
import { FoodWebButton } from "./FoodWebButton";
import { RoundRectangle } from "../RoundRectangle";
import { Slider } from "../Slider";
import { BaseNode } from "../nodes/BaseNode";
import { language } from "../../language/LanguageManager";
import { Scenario } from "../../simulation/Scenario";
import { database } from "../../database/Database";
import { jiggle, HSVToRGB } from "../../utils";

interface Relation {
	pred: FoodWebNode;
	prey: FoodWebNode;
	line: Phaser.Curves.Line;
}

export class FoodWeb extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public config: any;

	private infoMode: string;

	private infoBox: Phaser.GameObjects.Container; // Contains infobox elements (title, desc, image)
	private infoNodeCont: Phaser.GameObjects.Container; // Contains only node-view related info (iucn and group)
	private infoBg: RoundRectangle;
	private infoImage: Phaser.GameObjects.Image;
	private infoTitle: Phaser.GameObjects.Text;
	private infoSubTitle: Phaser.GameObjects.Text;
	private infoDescription: Phaser.GameObjects.Text;

	private infoHint: Phaser.GameObjects.Text;

	private infoGroupButton: BaseNode;
	private infoGroupBg: RoundRectangle;
	private infoGroupStatus: Phaser.GameObjects.Text;
	private infoGroupText: Phaser.GameObjects.Text;
	private infoGroupSelected: number;

	private infoIucnButton: BaseNode;
	private infoIucnBg: RoundRectangle;
	private infoIucnStatus: Phaser.GameObjects.Text;
	private infoIucnText: Phaser.GameObjects.Text;
	private infoIucnSelected: string;

	private infoIucnImageCont: Phaser.GameObjects.Container; // Contains only iucn node image
	private infoIucnImageBg: RoundRectangle;
	private infoIucnImageText: Phaser.GameObjects.Text;

	private nodeContainer: Phaser.GameObjects.Container;
	private nodes: FoodWebNode[];
	private anyNodesSelected: boolean;

	private buttons: FoodWebButton[];
	private modeSlider: Slider;
	private modeGroupButton: BaseNode;
	private modeGroupBg: RoundRectangle;
	private modeGroupText: Phaser.GameObjects.Text;
	private modeLinkButton: BaseNode;
	private modeLinkBg: RoundRectangle;
	private modeLinkText: Phaser.GameObjects.Text;
	// private instructionText: Phaser.GameObjects.Text;

	private deselectButton: BaseNode;
	private deselectBg: RoundRectangle;
	private deselectText: Phaser.GameObjects.Text;

	private relationGraphics: Phaser.GameObjects.Graphics;
	private relations: Relation[];

	private separatorContainer: Phaser.GameObjects.Container;
	private separatorGraphics: Phaser.GameObjects.Graphics;
	private separatorSmooth: number;

	constructor(scene) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);

		let BORDER = 200;
		let WX = BORDER;
		let WY = BORDER;
		let WW = scene.W - 2*BORDER;
		let WH = scene.H - 3*BORDER;
		let groupPositions = {
			// Carnivores
			1:  new Phaser.Math.Vector2(WX+0.95*WW, WY+(1-0.30)*WH),
			2:  new Phaser.Math.Vector2(WX+0.85*WW, WY+(1-0.70)*WH),

			// Herbivores
			3:  new Phaser.Math.Vector2(WX+0.50*WW, WY+(1-0.10)*WH),
			4:  new Phaser.Math.Vector2(WX+0.55*WW, WY+(1-0.45)*WH),
			5:  new Phaser.Math.Vector2(WX+0.50*WW, WY+(1-0.70)*WH),
			6:  new Phaser.Math.Vector2(WX+0.60*WW, WY+(1-0.95)*WH),

			// Plants
			7:  new Phaser.Math.Vector2(WX+0.10*WW, WY+(1-0.05)*WH),
			8:  new Phaser.Math.Vector2(WX+0.20*WW, WY+(1-0.10)*WH),
			9:  new Phaser.Math.Vector2(WX+0.10*WW, WY+(1-0.30)*WH),
			10: new Phaser.Math.Vector2(WX+0.20*WW, WY+(1-0.30)*WH), // 1
			11: new Phaser.Math.Vector2(WX+0.20*WW, WY+(1-0.55)*WH),
			12: new Phaser.Math.Vector2(WX+0.10*WW, WY+(1-0.55)*WH), // 1
			13: new Phaser.Math.Vector2(WX+0.10*WW, WY+(1-0.80)*WH),
			14: new Phaser.Math.Vector2(WX+0.25*WW, WY+(1-0.95)*WH), // 2
		};
		let groupColors = {
			1: 0xF44336, 2: 0xE91E63, 3: 0x9C27B0, 4: 0x673AB7, 5: 0x3F51B5, 6: 0x2196F3, 7: 0x03A9F4, 8: 0x00BCD4, 9: 0x009688, 10: 0x4CAF50, 11: 0x8BC34A, 12: 0xCDDC39, 13: 0xFFEB3B, 14: 0xFFC107
		};
		let groupTextColors = {
			1: "#000000", 2: "#000000", 3: "#FFFFFF", 4: "#FFFFFF", 5: "#FFFFFF", 6: "#000000", 7: "#000000", 8: "#000000", 9: "#000000", 10: "#000000", 11: "#000000", 12: "#000000", 13: "#000000", 14: "#000000"
		};
		let iucnColors = {
			"null": 0x9E9E9E, CR: 0xe40521, EN: 0xeb6209, VU: 0xe29b00, NT: 0x007060, LC: 0x006d8a, NE: 0x555555
		};
		let iucnTextColors = {
			"null": "#FFFFFF", CR: "#000000", EN: "#000000", VU: "#000000", NT: "#FFFFFF", LC: "#FFFFFF", NE: "#FFFFFF"
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
			groupTextColors, // Group outline colors
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
		this.initButtonsAndSlider();
		this.initInfoBox();
		this.initSeparator();

		this.bringToTop(this.nodeContainer);
		this.bringToTop(this.infoBox);
	}


	update(time, delta) {
		this.config.gravity = 50 - 20 * this.config.mode;
		this.config.charge = -50 - 70 * this.config.mode;

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


		const alphaGoal = (this.infoMode == "") ? 0 : 1;
		const alphaStep = delta / 0.15;
		// const sepEase = Phaser.Math.Easing.Cubic.InOut(this.separatorSmooth);
		this.infoBox.alpha += Phaser.Math.Clamp(alphaGoal - this.infoBox.alpha, -alphaStep, alphaStep);

		this.infoNodeCont.setVisible(this.infoMode == "node");
		this.infoIucnImageCont.setVisible(this.infoMode == "iucn");
		this.infoHint.setAlpha(1.0 * (1 - this.infoBox.alpha));
		this.deselectButton.setAlpha(this.infoBox.alpha);

		this.infoIucnButton.update(time, delta);
		this.infoIucnButton.setScale(1.0 - 0.1 * this.infoIucnButton.holdSmooth);
		this.infoGroupButton.update(time, delta);
		this.infoGroupButton.setScale(1.0 - 0.1 * this.infoGroupButton.holdSmooth);
		this.deselectButton.update(time, delta);
		this.deselectButton.setScale(1.0 - 0.1 * this.deselectButton.holdSmooth);

		this.anyNodesSelected = false;
		this.updateNodes(time, delta);
		this.drawRelations(time, delta);

		for (const node of this.nodes) {
			node.update(time, delta);
			if (this.infoMode == "iucn") {
				node.highlightIucnColor();
				if (node.species.iucn == this.infoIucnSelected) {
					node.highlight()
				}
			}
			else if (this.infoMode == "group") {
				if (node.species.group == this.infoGroupSelected) {
					node.highlight()
				}
			}
		}

		for (const button of this.buttons) {
			button.update(time, delta);
		}

		this.modeSlider.update(time, delta);
		this.modeGroupButton.update(time, delta);
		this.modeGroupButton.setScale(1.0 - 0.1 * this.modeGroupButton.holdSmooth);
		this.modeGroupBg.setAlpha(this.infoMode == "groups" ? 1.0 : 0.5);
		this.modeLinkButton.update(time, delta);
		this.modeLinkButton.setScale(1.0 - 0.1 * this.modeLinkButton.holdSmooth);
		this.modeLinkBg.setAlpha(this.infoMode == "links" ? 1.0 : 0.5);

		const sepGoal = (this.infoMode == "groups") ? 1 : 0;
		const sepDuration = 1.6;
		const sepStep = delta/sepDuration;
		const sepEase = Phaser.Math.Easing.Cubic.InOut(this.separatorSmooth);
		this.separatorSmooth += Phaser.Math.Clamp(sepGoal - this.separatorSmooth, -sepStep, sepStep);
		this.separatorContainer.setAlpha(-3 + 4*sepEase);
		this.separatorContainer.y = -10 * (1 - sepEase);

		// Special case to deactivate infobox
		if (this.infoMode == "groups" && this.modeSlider.value > 0.25) {
			this.clearInfoBox();
		}
		if (this.infoMode == "links" && this.modeSlider.value < 0.75) {
			this.clearInfoBox();
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
					this.setInfoNode(target);
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

		this.clearInfoBox();
		this.modeSlider.value = 0.5;
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

	initButtonsAndSlider() {
		this.buttons = [];

		let chosen = [
			// "lycaon_pictus", // Vildhund
			"loxodonta_africana", // Elefant
			"panthera_leo", // Lion
			"equus_quagga", // Zebra
			"kobus_ellipsiprymnus", // Vattenbock
			// "connochaetes_taurinus", // Gnu
			"madoqua_kirkii", // Kirk's dik-dik
			// "aepyceros_melampus", // Impala
			// "kigelia_africana", // Korvträd
			// "solanum_incanum", // Bitteräpple
			"allophylus_rubifolius", // Allophylus rubifolius
			"acacia_tortilis", // Acacia
			"heteropogon_contortus", // Spjutgräs
			// "emilia_coccinea", // Tofsblomster
			// "panicum_coloratum", // Panicum coloratum
			// "themeda_triandra", // Kängrugräs
			// "digitaria_scalarum", // Fingerhirs
		];
		let cx = this.scene.CX + 0.14 * this.scene.W;
		let cy = 0.86 * this.scene.H;
		let size = 66;

		// Node buttons
		for (let i = 0; i < chosen.length; i++) {
			let id = chosen[i];
			for (const node of this.nodes) {
				if (id == node.species.id) {
					let x = cx + 1.4 * size * (i - (chosen.length-1)/2);

					let obj = new FoodWebButton(this.scene, x, cy, size, node.species.image);
					this.add(obj);
					this.buttons.push(obj);

					node.hyperLink = obj;

					obj.on('click', () => {
						node.selected = !node._selected;
					}, this);
				}
			}
		}

		// Instruction text
		// let sbH = 0.22 * this.scene.H;
		// let sbY = this.scene.H - 0.5*sbH;
		// this.instructionText = this.scene.createText(cx, sbY - 0.85*90, 20, this.scene.weights.regular, "#FFF", "Instruction text");
		// this.instructionText.setOrigin(0.5);
		// this.add(this.instructionText);
		// language.bind(this.instructionText, "instruction_0");


		// Mode slider
		const bSize = 30;
		this.modeSlider = new Slider(this.scene, cx, 0.94*this.scene.H, 250, bSize, 8, 19);
		this.modeSlider.setRange(0, 1);
		this.add(this.modeSlider);

		this.modeSlider.value = this.config.mode;
		this.modeSlider.on('onChange', (value) => {
			this.config.mode = value;
		}, this);


		// Mode text buttons
		const modeSep = bSize;
		// const orange = HSVToRGB(30/360, 0/100, 80/100);

		this.modeGroupButton = new BaseNode(this.scene, -this.modeSlider.width/2 - modeSep, 0);
		this.modeLinkButton = new BaseNode(this.scene, this.modeSlider.width/2 + modeSep, 0);
		this.modeSlider.add(this.modeGroupButton);
		this.modeSlider.add(this.modeLinkButton);

		this.modeGroupBg = new RoundRectangle(this.scene, 0, 0, bSize, bSize, bSize/2, 0xFFFFFF, 1.0);
		this.modeLinkBg = new RoundRectangle(this.scene, 0, 0, bSize, bSize, bSize/2, 0xFFFFFF, 1.0);
		this.modeGroupButton.add(this.modeGroupBg);
		this.modeLinkButton.add(this.modeLinkBg);
		this.modeGroupButton.bindInteractive(this.modeGroupBg);
		this.modeLinkButton.bindInteractive(this.modeLinkBg);

		this.modeGroupText = this.scene.createText(0, 0, 16, this.scene.weights.regular, "#000", "...");
		this.modeLinkText = this.scene.createText(0, 0, 16, this.scene.weights.regular, "#000", "...");
		this.modeGroupText.setOrigin(0.5);
		this.modeLinkText.setOrigin(0.5);
		this.modeGroupButton.add(this.modeGroupText);
		this.modeLinkButton.add(this.modeLinkText);

		language.bind(this.modeGroupText, "slider_groups", () => {
			this.modeGroupBg.setWidth(this.modeGroupText.width + this.modeGroupBg.height);
			this.modeGroupButton.x = -this.modeSlider.width/2 - modeSep - this.modeGroupBg.width/2;

			// Add padding to button for easier clicking
			this.modeGroupBg.input.hitArea.setTo(-20, -20, this.modeGroupBg.width+2*20, this.modeGroupBg.height+2*20);
			// this.scene.input.enableDebug(this.modeGroupBg);
		});
		language.bind(this.modeLinkText, "slider_links", () => {
			this.modeLinkBg.setWidth(this.modeLinkText.width + this.modeLinkBg.height);
			this.modeLinkButton.x = this.modeSlider.width/2 + modeSep + this.modeLinkBg.width/2;

			// Add padding to button for easier clicking
			this.modeLinkBg.input.hitArea.setTo(-20, -20, this.modeLinkBg.width+2*20, this.modeLinkBg.height+2*20);
			// this.scene.input.enableDebug(this.modeLinkBg);
		});

		this.modeGroupButton.on("click", () => {
			this.setInfoLayout("groups");
		}, this);
		this.modeLinkButton.on("click", () => {
			this.setInfoLayout("links");
		}, this);


		/* Deselect button */

		const dsSize = 30;
		let dsy = 0.78 * this.scene.H;

		this.deselectButton = new BaseNode(this.scene, this.scene.CX, dsy - 0.75*dsSize);
		this.add(this.deselectButton);

		let bg = new RoundRectangle(this.scene, 0, 0, 0, 0, dsSize/2+5, 0, 0.3);
		this.deselectButton.add(bg);
		this.deselectButton.bindInteractive(bg);

		this.deselectBg = new RoundRectangle(this.scene, 0, 0, dsSize, dsSize, dsSize/2, 0x6B8B2F, 0.7);
		this.deselectButton.add(this.deselectBg);
		this.deselectButton.bindInteractive(this.deselectBg);

		this.deselectText = this.scene.createText(0, 0, dsSize/2, this.scene.weights.regular, "#FFF", "...");
		this.deselectText.setOrigin(0.5);
		this.deselectButton.add(this.deselectText);

		language.bind(this.deselectText, "deselect", () => {
			this.deselectBg.setWidth(this.deselectText.width + 4*this.deselectBg.height);
			bg.setWidth(this.deselectBg.width + 10);

			// Add padding to button for easier clicking
			this.deselectBg.input.hitArea.setTo(-20, -20, this.deselectBg.width+2*20, this.deselectBg.height+2*20);
		});

		this.deselectButton.on("click", () => {
			this.clearInfoBox();
		}, this);
	}


	/* Info box (could be moved to its own class) */

	initInfoBox() {
		this.infoMode = "";
		this.infoGroupSelected = 0;
		this.infoIucnSelected = "";


		let m = 15;
		let p = 15;
		let w = 0.25 * this.scene.W;
		let h = 0.22 * this.scene.H - 2*m;
		let x = m + w/2 + 0.16 * this.scene.W;
		let y = this.scene.H - h/2 - m;

		this.infoBg = new RoundRectangle(this.scene, x, y, w, h, 12, 0x000000);
		this.infoBg.setAlpha(0.3);
		// this.infoBox.add(this.infoBg);
		this.add(this.infoBg);

		this.infoBox = this.scene.add.container(x, y);
		this.infoBox.setAlpha(0);
		this.add(this.infoBox);

		this.infoNodeCont = this.scene.add.container(0, 0);
		this.infoBox.add(this.infoNodeCont);

		let titleSize = 24;
		let imgFac = 1.8;

		this.infoTitle = this.scene.createText(-w/2+p, -h/2+p + 1*titleSize/2, titleSize, this.scene.weights.regular, "#FFF", "Title");
		this.infoTitle.setOrigin(0, 0.5);
		this.infoBox.add(this.infoTitle);

		this.infoSubTitle = this.scene.createText(-w/2+p, -h/2+p + 1.45*titleSize, 13, this.scene.weights.regular, "#FFF", "Title");
		this.infoSubTitle.setOrigin(0, 0.5);
		this.infoNodeCont.add(this.infoSubTitle);

		this.infoDescription = this.scene.createText(-w/2+p, -h/2+p + 2.2*titleSize, 16, this.scene.weights.regular, "#FFF", "Description");
		this.infoDescription.setOrigin(0);
		this.infoDescription.setWordWrapWidth(w-2*p, true);
		// this.infoDescription.setLineSpacing(10);
		this.infoBox.add(this.infoDescription);

		this.infoImage = this.scene.add.image(w/2-p, -h/2+p, "PANLEO");
		this.infoImage.setData("size", imgFac*titleSize);
		this.infoImage.setOrigin(1.0, 0.0);
		this.infoImage.setVisible(false);
		this.infoBox.add(this.infoImage);


		/* IUCN */

		let size = titleSize;
		let ix = w/2-p;
		let iy = h/2-p-size/2;

		this.infoIucnButton = new BaseNode(this.scene, ix, iy);
		this.infoIucnButton.setData("right", ix);
		this.infoNodeCont.add(this.infoIucnButton);

		this.infoIucnBg = new RoundRectangle(this.scene, 0, 0, size, size, size/2, 0xFFFFFF, 1.0);
		this.infoIucnBg.setOrigin(0.5);
		this.infoIucnButton.add(this.infoIucnBg);

		this.infoIucnText = this.scene.createText(0, 0, 14, this.scene.weights.regular, "#000", "XX");
		this.infoIucnText.setOrigin(0.5);
		this.infoIucnButton.add(this.infoIucnText);

		this.infoIucnStatus = this.scene.createText(ix, iy, 14, this.scene.weights.regular, "#ffffff", "Status");
		this.infoIucnStatus.setOrigin(1.0, 0.5);
		language.bind(this.infoIucnStatus, "iucn_status");
		this.infoNodeCont.add(this.infoIucnStatus);

		this.infoIucnButton.bindInteractive(this.infoIucnBg);
		this.infoIucnButton.on("click", () => {
			this.setInfoIucn();
		}, this);


		/* IUCN image */

		const iucnSize = imgFac*titleSize;

		this.infoIucnImageCont = this.scene.add.container(w/2-p, -h/2+p);
		this.infoBox.add(this.infoIucnImageCont);

		this.infoIucnImageBg = new RoundRectangle(this.scene, 0, 0, 0, 0, imgFac*titleSize/2, 0xFFFFFF, 1.0);
		this.infoIucnImageBg.setOrigin(1.0, 0.0);
		this.infoIucnImageCont.add(this.infoIucnImageBg);

		this.infoIucnImageText = this.scene.createText(-this.infoIucnImageBg.width/2, this.infoIucnImageBg.height/2, 0.8*size, this.scene.weights.bold, "#000", "XX");
		this.infoIucnImageText.setOrigin(0.5);
		this.infoIucnImageCont.add(this.infoIucnImageText);


		/* Group */

		let gx = -w/2+p;
		let gy = h/2-p-size/2;

		this.infoGroupButton = new BaseNode(this.scene, gx, gy);
		this.infoGroupButton.setData("left", gx);
		this.infoNodeCont.add(this.infoGroupButton);

		this.infoGroupBg = new RoundRectangle(this.scene, 0, 0, size, size, size/2, 0xFFFFFF, 1.0);
		this.infoGroupButton.add(this.infoGroupBg);

		this.infoGroupText = this.scene.createText(0, 0, 14, this.scene.weights.regular, "#000", "...");
		this.infoGroupText.setOrigin(0.5);
		this.infoGroupButton.add(this.infoGroupText);

		this.infoGroupStatus = this.scene.createText(gx, gy, 14, this.scene.weights.regular, "#FFF", "Group");
		this.infoGroupStatus.setOrigin(0.0, 0.5);
		language.bind(this.infoGroupStatus, "group");
		this.infoNodeCont.add(this.infoGroupStatus);

		this.infoGroupButton.bindInteractive(this.infoGroupBg);
		this.infoGroupButton.on("click", () => {
			this.setInfoGroup();
		}, this);


		/* Extra */

		this.infoHint = this.scene.createText(x, y, 20, this.scene.weights.regular, "#FFF", "Instruction text");
		this.infoHint.setOrigin(0.5);
		this.add(this.infoHint);
		language.bind(this.infoHint, "instruction_0");


		this.clearInfoBox();
	}

	clearInfoBox() {
		this.infoMode = "";
		this.unselectNodes();
	}

	setInfoNode(node) {
		this.infoMode = "node";
		this.infoGroupSelected = node.species.group;
		this.infoIucnSelected = node.species.iucn;

		const name = node.species.id;
		const latin = (node.species.name == this.infoTitle.text) ? "" : node.species.name;
		const iucnName = node.species.iucn ? "iucn_" + node.species.iucn : "";
		const groupName = "group_name_" + node.species.group;
		const groupDesc = "group_desc_" + node.species.group;

		this.infoSubTitle.setText(latin);
		language.bind(this.infoTitle, name);
		language.bind(this.infoIucnText, iucnName, this.resizeInfoIucn.bind(this));
		language.bind(this.infoGroupText, groupName, this.resizeInfoGroup.bind(this));
		language.bind(this.infoDescription, groupDesc);

		this.setInfoImage(node.species.image);

		this.infoIucnText.setColor(this.config.iucnTextColors[node.species.iucn]);
		this.infoIucnBg.setColor(this.config.iucnColors[node.species.iucn]);

		this.infoGroupText.setColor(this.config.groupTextColors[node.species.group]);
		this.infoGroupBg.setColor(this.config.groupColors[node.species.group]);
	}

	setInfoLayout(mode: string) {
		if (mode != "groups" && mode != "links") {
			throw "Bad layout for info box";
		}

		if (this.infoMode == mode) {
			this.clearInfoBox();
			return;
		}

		this.unselectNodes();
		this.infoMode = mode;

		language.bind(this.infoTitle, "slider_" + mode);
		language.bind(this.infoDescription, "network_desc");
		language.bind(this.infoDescription, "network_" + mode);

		const modeImage = (mode == "groups") ? "icon-foodWeb" : "icon-ecoWeb";
		const sliderValue = (mode == "groups") ? 0.0 : 1.0;

		this.setInfoImage(modeImage);

		this.modeSlider.smoothSet(sliderValue);
	}

	setInfoGroup() {
		this.unselectNodes();
		this.infoMode = "group";

		const groupName = "group_name_" + this.infoGroupSelected;
		const groupDesc = "group_desc_" + this.infoGroupSelected;

		language.bind(this.infoTitle, groupName);
		language.bind(this.infoDescription, groupDesc);

		this.setInfoImage("");
	}

	setInfoIucn() {
		this.unselectNodes();
		this.infoMode = "iucn";

		const iucnName = "iucn_" + this.infoIucnSelected;
		const iucnDesc = "iucn_desc_" + this.infoIucnSelected;

		language.bind(this.infoTitle, iucnName);
		language.bind(this.infoDescription, iucnDesc);

		this.infoIucnImageText.setText(this.infoIucnSelected);
		this.infoIucnImageText.setColor(this.config.iucnTextColors[this.infoIucnSelected]);
		this.infoIucnImageBg.setColor(this.config.iucnColors[this.infoIucnSelected]);

		this.setInfoImage("");
	}

	setInfoImage(key: string) {
		if (key) {
			this.infoImage.setVisible(true);
			this.infoImage.setTexture(key);
			this.infoImage.setScale(this.infoImage.getData("size") / this.infoImage.width);
		}
		else {
			this.infoImage.setVisible(false);
		}
	}

	resizeInfoIucn() {
		this.infoIucnBg.setWidth(this.infoIucnText.width + this.infoIucnBg.height);
		this.infoIucnButton.x = this.infoIucnButton.getData("right") - this.infoIucnBg.width/2;
		this.infoIucnStatus.x = this.infoIucnButton.getData("right") - this.infoIucnBg.width - this.infoIucnBg.height/4;

		// Add padding to button for easier clicking
		this.infoIucnBg.input.hitArea.setTo(-20, -20, this.infoIucnBg.width+2*20, this.infoIucnBg.height+2*20);
	}

	resizeInfoGroup() {
		this.infoGroupBg.setWidth(this.infoGroupText.width + this.infoGroupBg.height);
		this.infoGroupButton.x = this.infoGroupButton.getData("left") + this.infoGroupStatus.width + this.infoGroupBg.height/4 + this.infoGroupBg.width/2;

		// Add padding to button for easier clicking
		this.infoGroupBg.input.hitArea.setTo(-20, -20, this.infoGroupBg.width+2*20, this.infoGroupBg.height+2*20);
	}

	initSeparator() {
		this.separatorSmooth = 0;

		this.separatorContainer = this.scene.add.container(0, 0);
		this.add(this.separatorContainer);

		this.separatorGraphics = this.scene.add.graphics();
		this.separatorGraphics.setBlendMode(Phaser.BlendModes.ADD);
		this.separatorContainer.add(this.separatorGraphics);

		let BORDER = 200;
		let leftX = 0.44 * this.scene.W;
		let rightX = 0.72 * this.scene.W;
		let topY = 0.1 * this.scene.H;
		let bottomY = 0.72 * this.scene.H;
		let dist = (rightX - leftX) / 2;

		// this.separatorGraphics.lineStyle(1, 0xFFFFFF, 0.5);
		// this.separatorGraphics.lineBetween(rightX, topY, rightX, bottomY);
		// this.separatorGraphics.lineBetween(leftX, topY, leftX, bottomY);
		this.separatorGraphics.lineStyle(1.5, 0xFFFFFF, 0.5);
		let n = 40;
		for (let i = 0; i < n; i++) {
			let d = (bottomY - topY) / (n - 0.5);
			let y = topY + i * d;
			this.separatorGraphics.lineBetween(rightX, y, rightX, y+d/2);
			this.separatorGraphics.lineBetween(leftX, y, leftX, y+d/2);
		}

		let text1 = this.scene.createText(leftX - 0.75*dist, topY, 30, this.scene.weights.bold, "#FFF", "Växter");
		let text2 = this.scene.createText(leftX + dist, topY, 30, this.scene.weights.bold, "#FFF", "Växtätare");
		let text3 = this.scene.createText(rightX + 0.75*dist, topY, 30, this.scene.weights.bold, "#FFF", "Köttätare");
		text1.setOrigin(0.5, 1.2);
		text2.setOrigin(0.5, 1.2);
		text3.setOrigin(0.5, 1.2);
		text1.setShadow(0, 0, "#FFF", 15);
		text2.setShadow(0, 0, "#FFF", 15);
		text3.setShadow(0, 0, "#FFF", 15);
		text1.setPadding(30);
		text2.setPadding(30);
		text3.setPadding(30);
		this.separatorContainer.add(text1);
		this.separatorContainer.add(text2);
		this.separatorContainer.add(text3);
		// language.bind(carniText, "instruction_0");
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
			// node1.move(-sx, -sy);
			node1.setAlphaGoal((this.anyNodesSelected || this.infoMode == "iucn" || this.infoMode == "group") ? 0.3 : 1.0);
			node1.subselected = false;
			if ((this.infoMode == "iucn" && this.infoIucnSelected == node1.species.iucn) || (this.infoMode == "group" && this.infoGroupSelected == node1.species.group)) {
				node1.setAlphaGoal(1.0);
				node1.subselected = true;
				if (i == 0 ) {
					console.log(this.infoIucnSelected, node1.species.iucn);
				}
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

				let rr = Math.pow(node1.size/2 + node2.size/2, 1.0);
				node1.velocity.x += dx / l2 * this.config.charge / 40 * rr;
				node1.velocity.y += dy / l2 * this.config.charge / 40 * rr;
				node2.velocity.x -= dx / l2 * this.config.charge / 40 * rr;
				node2.velocity.y -= dy / l2 * this.config.charge / 40 * rr;

				// Separation test
				let sepRad = (node1.size/2 + node2.size/2) * 2;
				let l = Math.sqrt(l2);
				let sepFac = Math.pow(Math.max(0, (sepRad - l) / sepRad), 4);
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
			let selected: number = visibility * (relation.pred.selected || relation.prey.selected ? 1 : 0);

			let strokeWidth = selected > 0 ? 2.5 : 1.5;
			let strokeColor = selected > 0 ? 0xFFFFFF : 0xFFFFFF;
			let strokeOpacity = selected > 0 ? 0.9 : 0.1 * visibility;
			this.relationGraphics.lineStyle(strokeWidth, strokeColor, strokeOpacity);

			relation.line.p0.x = relation.pred.x;
			relation.line.p0.y = relation.pred.y;
			relation.line.p1.x = relation.prey.x;
			relation.line.p1.y = relation.prey.y;
			relation.line.draw(this.relationGraphics);


			if (this.anyNodesSelected && selected) {
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
		this.modeSlider.value = 0.5;

		this.clearInfoBox();

		// this.instructionText.setVisible(!state);
		this.modeSlider.setVisible(!state);
		this.infoBox.setVisible(!state);
		this.infoBg.setVisible(!state);
		this.infoHint.setVisible(!state);
		this.separatorContainer.setVisible(!state);

		if (state) {
			this.config.centerOffset.set(0, 100);
		}
		else {
			this.config.centerOffset.set(0, -20);
		}
	}
}