import { BaseScene } from "./BaseScene";
import { NodeId } from "../database/Types";
import { simulator } from "../simulation/Simulator";
import { BaseNode } from "../components/nodes/BaseNode";
import { Node } from "../components/nodes/Node";
import { FakeNode } from "../components/nodes/FakeNode";
import { Path } from "../components/Path";
import { FoodWeb } from "../components/foodweb/FoodWeb";
import { InfoPopup } from "../components/InfoPopup";
import { Graph } from "../components/Graph";
import { Slider } from "../components/Slider";
import { RoundRectangle } from "../components/RoundRectangle";
import { MatrixEditor } from "../components/MatrixEditor";
import { HSVToRGB, colorToString } from "../utils";
import { NODE_SIZE, SIMULATION_LENGTH } from "../constants";
import { language } from "../language/LanguageManager";
import { database } from "../database/Database";
import { BlurPostFilter } from "../pipelines/BlurPostFilter";
import { Story, storyData } from "../assets/stories";


interface NodeSlot {
	x: number;
	y: number;
	taken: boolean;
}

export class SerengetiScene extends BaseScene {
	private bg: Phaser.GameObjects.Image;
	private bgCont: Phaser.GameObjects.Container;
	private grassBg: Phaser.GameObjects.Image;
	private sidebarBg: Phaser.GameObjects.Rectangle;

	private titleText: Phaser.GameObjects.Text;
	private instructionText: Phaser.GameObjects.Text;
	private storyText1: Phaser.GameObjects.Text;
	private storyText2: Phaser.GameObjects.Text;
	private chapterCont: Phaser.GameObjects.Container;
	private chapterTabs: Phaser.GameObjects.Container[];
	private africa: Phaser.GameObjects.Image;
	private africaIcon: Phaser.GameObjects.Image;

	private nextButton: BaseNode;
	private nextBg: RoundRectangle;
	private nextBg2: RoundRectangle;
	private nextText: Phaser.GameObjects.Text;

	private nodes: Node[];
	private nodeSlots: NodeSlot[];
	private fakeNodes: Map<NodeId, FakeNode>;
	private paths: Path[];
	private sliders: Slider[];
	private graph: Graph;
	private infoPopup: InfoPopup;
	private foodWeb: FoodWeb;
	private matrixEditor: MatrixEditor;
	private tempSlider: Slider;
	// private minimap: Phaser.Cameras.Scene2D.Camera;

	private attractionOpen: boolean;
	private infoOpen: boolean;
	private blurTween: Phaser.Tweens.Tween;

	private timeStamp: number;

	private mode: string;
	private currentStory?: Story;
	private currentChapter: number;
	// private roleMap: object;
	// private story1: string[];
	// private story2: string[];
	// private story3: string[];
	// private storyRunning: boolean;

	private infoBox: Phaser.GameObjects.Container;
	private infoBg: RoundRectangle;
	private infoImage: Phaser.GameObjects.Image;
	private infoTitle: Phaser.GameObjects.Text;
	private infoSubTitle: Phaser.GameObjects.Text;
	private infoDescription: Phaser.GameObjects.Text;

	constructor() {
		super({key: 'SerengetiScene'});

		// "Role" is a node's role in the scenario, deciding when it appears in the story
		/*
		this.roleMap = {
			"panthera_leo": "carnivore_1", // Lion
			"equus_quagga": "herbivore_1", // Plains zebra
			"heteropogon_contortus": "plant_1", // Heteropogon contortus
			"madoqua_kirkii": "herbivore_2", // Kirk's dik-dik
			"allophylus_rubifolius": "plant_2", // Allophylus rubifolius
			// "panicum_coloratum": "plant_3", // Panicum coloratum
			// "a11f07e7-554c-4b0a-ab11-ac34d84b6d85": "plant_2", // Acalypha fruticosa
			"eustachys_paspaloides": "plant_3", // Digitaria macroblephara

			// "lycaon_pictus": "c2", // Vildhund
			"crocuta_crocuta": "c2", // Hyena
			"connochaetes_taurinus": "h2", // Gnu
			"aepyceros_melampus": "h3", // Impala
			"kobus_ellipsiprymnus": "h4", // Vattenbock
			"themeda_triandra": "p1", // Kängrugräs
			"digitaria_scalarum": "p3", // Fingerhirs
			"acacia_tortilis": "p4", // Acacia

			// "0fd86e7d-942f-431f-86d4-e5004f1caed1":	"carnivore_1",	// Lejon
			// "32594c3d-0c63-4cd6-9350-2e40f759a40e":	"herbivore_1",	// Zebra
			// "4605a453-92f8-4bf5-90bc-9a38fc993f03":	"plant_1",		// Heteropogon contortus
			// "0c104616-32bf-4b4a-aa1f-5003fcb10a0a":	"carnivore_2",	// Vildhund
			// "827bbe9a-63fe-4340-8cb6-b97a8f416b5f":	"herbivore_2",	// Kirks dik-dik
			// "d73dbde0-daf1-499d-a3f0-173ad916cef0":	"plant_2",		// Acalypha fruticosa
			// "fa53ea56-87fd-4e57-ad86-f4a713d2fa3f":	"plant_3",		// Panicum coloratum
		};
		this.story1 = ["carnivore_1", "herbivore_1", "plant_1"];
		this.story2 = ["carnivore_1", "herbivore_1", "plant_1", "herbivore_2", "plant_2", "plant_3"];
		this.story3 = ["carnivore_1", "c2", "herbivore_1", "h2", "h3", "h4", "p1", "plant_1", "plant_3", "p4"];
		*/
		this.timeStamp = 0;
		this.currentChapter = 0;
		// this.currentStory = 0;
		// this.storyRunning = false;
	}

	create(): void {
		this.fade(false, 200, 0x000000);

		this.scene.launch('UIScene');

		simulator.loadScenario(database.getScenario("serengeti_1")!);

		this.input.addPointer(4);


		// this.minimap = this.cameras.add(0, 0, this.W/2, this.H/2).setZoom(1.0).setName('mini');
		// this.minimap.setBackgroundColor(0x000000);
		// this.minimap.setPostPipeline(BlurPostFilter);
		// this.minimap.scrollX = 0;
		// this.minimap.scrollY = 0;
		// this.minimap.setVisible(false);

		this.bg = this.add.image(this.CX, this.CY, 'bg_serengeti');
		this.bg.setAlpha(0.3);
		// this.bg.setPostPipeline(BlurPostFilter);
		this.fitToScreen(this.bg);
		// this.cameras.main.setPostPipeline(BlurPostFilter);


		// Sidebar background

		// let sbWSep = 30;
		// let sbHSep = 30;
		// let sbW = 0.25*this.W;
		// let sbH = this.H - 2*sbHSep;
		// let sbX = this.W - sbWSep - sbW/2;
		// let sbY = this.CY;
		let sbW = this.W;
		let sbH = 0.22 * this.H;
		let sbX = this.CX + 0 * 0.13 * this.W;
		let sbY = this.H - 0.5*sbH;

		this.bgCont = this.add.container(0, 0);

		this.grassBg = this.add.image(this.CX, this.H - sbH, 'bg_grass');
		this.containToScreen(this.grassBg);
		this.bgCont.add(this.grassBg);

		this.sidebarBg = this.add.rectangle(this.CX, sbY, sbW, sbH, 0x001000);
		this.sidebarBg.setAlpha(0.2);
		this.bgCont.add(this.sidebarBg);


		// Scenario title
		this.titleText = this.createText(10, 10, 28, this.weights.bold, "#FCB061", "Serengeti Food Web");
		this.titleText.setAlpha(0.75);
		this.titleText.setOrigin(0);
		language.bind(this.titleText, "serengeti_title");

		// TODO: Move to component (and add popup on click)
		this.africa = this.add.image(0 + this.titleText.width/2, 60, 'icon-map-africa');
		this.africa.setOrigin(0.5, 0);
		this.africa.setAlpha(0.35);
		this.africa.setTint(0xFCB061);
		this.africa.setScale(200 / this.africa.height);

		this.africaIcon = this.add.image(this.africa.x+38, this.africa.y+112, 'icon-location');
		this.africaIcon.setOrigin(0.5, 1);
		// this.africaIcon.setAlpha(0.25);
		this.africaIcon.setTint(0xFCB061);
		this.africaIcon.setScale(0.5);


		// Instructions text
		const buttonOrange = HSVToRGB(30/360, 100/100, 80/100);
		const textOrange = HSVToRGB(30/360, 80/100, 100/100);

		this.instructionText = this.createText(sbX, sbY - 0.85*NODE_SIZE, 20, this.weights.regular, "#FFF", "Instruction text");
		this.instructionText.setOrigin(0.5);
		this.instructionText.setDepth(1);

		// "#FCB061"
		this.storyText1 = this.createText(sbX, sbY-0.30*sbH , 28, this.weights.bold, colorToString(textOrange), "Large instruction text");
		this.storyText1.setOrigin(0.5);
		this.storyText2 = this.createText(sbX, sbY-0.12*sbH, 20, this.weights.regular, "#FFF", "Small instruction text");
		this.storyText2.setOrigin(0.5);


		/* Next button */

		let nSize = 50;

		this.nextButton = new BaseNode(this, 0.86 * this.W, 0.78 * this.H - 0.8 * nSize);
		this.nextButton.setDepth(10);

		this.nextBg2 = new RoundRectangle(this, 0, 0, 0, 0, nSize/2+5, 0, 0.5);
		this.nextButton.add(this.nextBg2);
		this.nextButton.bindInteractive(this.nextBg2);

		this.nextBg = new RoundRectangle(this, 0, 0, nSize, nSize, nSize/2, 0x6B8B2F, 0.9);
		this.nextButton.add(this.nextBg);
		this.nextButton.bindInteractive(this.nextBg);

		this.nextText = this.createText(0, 0, nSize/2, this.weights.bold, "#FFF", "...");
		this.nextText.setOrigin(0.5);
		this.nextButton.add(this.nextText);

		this.nextButton.on("click", () => {
			if (this.currentStory) {
				this.setStory(this.currentStory.next);
			}
			else if (this.mode == "network") {
				this.reset();
				this.setStory("1a");
			}
		}, this);


		// Sliders

		this.sliders = [];

		// Debug sliders
		// for (let i = 0; i < 10; i++) {
		// 	let x = 100;
		// 	let y = 70 + 50 * i;
		// 	let w = 160;
		// 	let h = 16;
		// 	let slider = new Slider(this, x, y, w, h, 0.5*h);
		// 	slider.setDepth(10);
		// 	slider.setVisible(false);
		// 	this.sliders.push(slider);
		// 	this.add.existing(slider);

		// 	let sliderText = this.createText(0.6*w, 0, h, this.weights.regular, "#FFF", slider.value.toFixed(2));
		// 	sliderText.setOrigin(0.0, 0.5);
		// 	slider.add(sliderText);

		// 	let sliderTitle = this.createText(-0.5*w, -0.5*h, h, this.weights.regular, "#FFF", "Name");
		// 	sliderTitle.setOrigin(0.0, 1.0);
		// 	slider.add(sliderTitle);

		// 	slider.on('onChange', (value) => {
		// 		sliderText.setText(value.toFixed(2));
		// 	}, this);
		// }


		// Chapter tabs

		const chapters = [
			{
				name: "chapter_1",
				image: 'icon-foodWeb',
				function: () => {
					this.reset();
					this.setStory("1a");
				}
			},
			{
				name: "chapter_2",
				image: 'icon-ecoChallenge',
				function: () => {
					this.reset();
					this.setStory("2a");
				}
			},
			// {
				// name: "chapter_3",
				// image: 'icon-ecoMission',
				// function: () => {}
			// },
			{
				name: "chapter_4",
				image: 'icon-ecoWeb',
				function: () => {
					this.reset();
					this.setStory("network");
				}
			},
		];

		this.chapterTabs = [];
		let ctW = 0.03 * this.W;
		let ctH = 0.17 * this.H;
		let ctX = this.W;
		let ctY = this.CY;

		this.chapterCont = this.add.container(0, 0);
		this.chapterCont.setDepth(100);

		for (let i = 0; i < chapters.length; i++) {
			let chapter = chapters[i];
			let x = ctX - ctW/2;
			let y = ctY + (i-2)*ctH + (i-1)*ctH*0.01;

			let tab = this.add.container(x, y);
			tab.setAlpha(0.5);
			this.chapterTabs.push(tab);
			this.chapterCont.add(tab);

			let bg = new RoundRectangle(this, 0.5*ctW, 0, 2*ctW, ctH, 10, 0XFFFFFF);
			bg.setAlpha(0.2);
			tab.add(bg);

			let image = this.add.image(0, 0, chapter.image);
			image.setScale(0.45 * ctW / image.width);
			image.setOrigin(0.5, 0);
			tab.add(image);

			let text = this.createText(0, 0, 16, this.weights.bold, "#FFF", "Chapter");
			text.setOrigin(0, 0.5);
			text.setAngle(90);
			tab.add(text);

			language.bind(text, chapter.name, () => {
				let sep = 10;
				let height = image.displayHeight + sep + text.displayWidth;
				image.y = -0.5 * height;
				text.y = image.y + image.displayHeight + sep;
			});

			bg.setInteractive({ useHandCursor: true })
				.on('pointerup', chapter.function, this);
		}


		// Listen for events from the UI scene
		this.scene.get('UIScene').events.on('attraction', (state: boolean) => {
			this.attractionOpen = state;

			this.updateBlur();
			this.setStory(state ? "attraction" : "network");
			this.foodWeb.toggleAttraction(state);
		}, this);

		this.scene.get('UIScene').events.on('info', (state: boolean) => {
			this.infoOpen = state;
			this.updateBlur();
		}, this);

		this.scene.get('UIScene').events.on('restart', () => {
			this.reset();
		}, this);


		// Node slots

		this.nodeSlots = [];
		let order = [3,4,2,5,1,0,6,7,8,9];

		for (let i = 0; i < 10; i++) {
			let x = sbX + 1.3 * NODE_SIZE * (order[i]-3);
			let y = sbY;
			this.nodeSlots.push({
				x,
				y,
				taken: false
			});
		}


		// Nodes

		this.nodes = [];
		/*
		for (let i = 0; i < simulator.species.length; i++) {
			const organism = simulator.scenario.species[i];

			if (this.roleMap[organism.id]) {
				let node = new Node(this, 0, 0, organism);
				this.nodes.push(node);

				// Experimental boids
				node.velocity = new Phaser.Math.Vector2(0, 0);

				// Depth set in basenode update
				node.setVisible(false);

				node.on('onEnter', this.onNodeAddOrRemove, this);
				node.on('onExit', this.onNodeAddOrRemove, this);
				node.on('onPlusMinus', this.onNodePlusMinus, this);
				node.on('onDeath', this.onNodeDeath, this);
				node.on('onDragStart', this.dismissInfoPopup, this);
				node.on('removeNodeFromSlot', this.removeNodeFromSlot, this);
				node.on('assignNodeToSlot', this.assignNodeToSlot, this);

				node.role = this.roleMap[organism.id];
				node.simIndex = i;
			}
			else {
				console.error("Organism found in database but not in roleMap:", organism.id);
			}
		}
		*/


		/* Large food web */

		this.foodWeb = new FoodWeb(this);


		/* Empty nodes */

		this.fakeNodes = new Map();
		/*
		this.fakeNodes.set("carnivore_1",	new FakeNode(this, 0.49 * this.W, 0.15 * this.H, "node_carnivore"));
		this.fakeNodes.set("herbivore_1",	new FakeNode(this, 0.62 * this.W, 0.40 * this.H, "node_herbivore"));
		this.fakeNodes.set("plant_1",		new FakeNode(this, 0.53 * this.W, 0.65 * this.H, "node_plant"));

		this.fakeNodes.set("carnivore_2",	new FakeNode(this, 0.32 * this.W, 0.15 * this.H, "node_carnivore"));
		this.fakeNodes.set("herbivore_2",	new FakeNode(this, 0.38 * this.W, 0.40 * this.H, "node_herbivore"));
		this.fakeNodes.set("plant_2",		new FakeNode(this, 0.27 * this.W, 0.65 * this.H, "node_plant"));
		this.fakeNodes.set("plant_3",		new FakeNode(this, 0.75 * this.W, 0.65 * this.H, "node_plant"));

		this.fakeNodes.set("c2",			new FakeNode(this, 0.29 * this.W, 0.15 * this.H, "node_carnivore"));
		this.fakeNodes.set("h2",			new FakeNode(this, 0.22 * this.W, 0.40 * this.H, "node_herbivore"));
		this.fakeNodes.set("h3",			new FakeNode(this, 0.42 * this.W, 0.40 * this.H, "node_herbivore"));
		this.fakeNodes.set("h4",			new FakeNode(this, 0.82 * this.W, 0.40 * this.H, "node_herbivore"));
		this.fakeNodes.set("p1",			new FakeNode(this, 0.33 * this.W, 0.65 * this.H, "node_plant"));
		this.fakeNodes.set("p3",			new FakeNode(this, 0.13 * this.W, 0.65 * this.H, "node_plant"));
		this.fakeNodes.set("p4",			new FakeNode(this, 0.73 * this.W, 0.65 * this.H, "node_plant"));


		// Node-fake relations

		for (const node of this.nodes) {
			if (node.role) {
				this.fakeNodes.get(node.role)!.addReplacement(node);
			}

			// this.nodeMap[key].fake = this.fakeNodes.get(key)!;
			// this.fakeNodes.get(key)!.node = this.nodeMap[key].fake;
		}
		*/


		// Paths

		this.paths = [];
		// for (const node of this.nodes) {
		// 	for (const other of this.nodes) {
		// 		if (node != other && node.role && other.role) {
		// 			let relation = database.getNodeRelation(node.species.id, other.species.id);
		// 			if (relation) {
		// 				// let amount = relation.preference;
		// 				let amount = 1.0;
		// 				// console.log(node.species.name, '->', other.species.name, '=', amount.toFixed(1));

		// 				const nodeFake = this.fakeNodes.get(node.role)!;
		// 				const otherFake = this.fakeNodes.get(other.role)!;

		// 				this.addPath(node, other, amount);
		// 				this.addPath(nodeFake, other, amount);
		// 				this.addPath(nodeFake, otherFake, amount);
		// 				this.addPath(node, otherFake, amount);

		// 				node.neighbours.push(other);
		// 				other.neighbours.push(node);
		// 			}
		// 		}
		// 	}
		// }


		// Graph

		this.graph = new Graph(this, 1.6*sbH, 0.75*sbH);
		this.graph.setPosition(0.32*sbH + 0.5*this.graph.width + 0.13*this.W, sbY + 0.03*this.graph.height);


		// Info text popup

		this.initInfoBox(0.63 * this.W);

		this.infoPopup = new InfoPopup(this);


		// Editor
		this.matrixEditor = new MatrixEditor(this);
		this.matrixEditor.setDepth(1000);
		this.matrixEditor.on("change", () => {
			simulator.run(this.timeStamp);
			this.updatePaths();
		});

		let editSlider = new Slider(this, this.W-50, 40, 1.5*24, 24, 0.75*24, 2);
		editSlider.on("onChange", (value: number) => {
			if (value == 0) {
				this.matrixEditor.setVisible(!!value);
				for (const path of this.paths) {
					path.setVisible(!value);
				}
			}
			// this.minimap.setVisible(!this.minimap.visible);
		});
		editSlider.setRange(0, 1);
		editSlider.value = 0;
		this.sliders.push(editSlider);
		this.add.existing(editSlider);
		editSlider.setAlpha(0);

		this.tempSlider = new Slider(this, sbX, this.nextButton.y, 250, 30, 8, 5);
		this.tempSlider.setRange(0, 1);
		this.sliders.push(this.tempSlider);
		this.add.existing(this.tempSlider);

		let tempSep = 1.5 * this.tempSlider.height;
		let tempLeftText = this.createText(- this.tempSlider.width/2 - tempSep, 0, 20, this.weights.bold);
		let tempRightText = this.createText(this.tempSlider.width/2 + tempSep, 0, 20, this.weights.bold);
		tempLeftText.setOrigin(1, 0.5);
		tempRightText.setOrigin(0, 0.5);
		this.tempSlider.add(tempLeftText);
		this.tempSlider.add(tempRightText);
		// language.bind(tempLeftText, "slider_groups");
		// language.bind(tempRightText, "slider_links");
		tempLeftText.setText("Ingen påverkan");
		tempRightText.setText("Stor påverkan");

		this.tempSlider.value = 0;
		this.tempSlider.on('onChange', (value) => {
			simulator.setTempEffect(value);
			simulator.population = simulator.sol.at(this.timeStamp);
			simulator.run(this.timeStamp);
			this.updatePaths();

			if (this.currentStory && this.currentStory.key == "2a" && value >= 1.0) {
				this.completeStory();
			}
		}, this);

		this.tempSlider.setVisible(false);


		this.attractionOpen = true;
		this.infoOpen = false;
	}


	initInfoBox(xOffset: number) {
		let m = 15;
		let p = 15;
		let w = 0.25 * this.W;
		let h = 0.22 * this.H - 2*m;
		let x = m + w/2 + xOffset;
		let y = this.H - h/2 - m;

		this.infoBox = this.add.container(x, y);

		this.infoBg = new RoundRectangle(this, 0, 0, w, h, 12, 0x000000);
		this.infoBg.setAlpha(0.3);
		this.infoBox.add(this.infoBg);

		let titleSize = 24;
		let imgFac = 1.8;

		this.infoTitle = this.createText(-w/2+p, -h/2+p + 1*titleSize/2, titleSize, this.weights.regular, "#FFF", "Title");
		this.infoTitle.setOrigin(0, 0.5);
		this.infoTitle.setVisible(false);
		this.infoBox.add(this.infoTitle);

		this.infoSubTitle = this.createText(-w/2+p, -h/2+p + 1.45*titleSize, 13, this.weights.regular, "#FFF", "Title");
		this.infoSubTitle.setOrigin(0, 0.5);
		this.infoSubTitle.setVisible(false);
		this.infoBox.add(this.infoSubTitle);

		// this.infoDescription = this.createText(-w/2+p, -h/2+p + 2.2*titleSize, 16, this.weights.regular, "#FFF", "Description");
		this.infoDescription = this.createText(0, 0, 20, this.weights.regular, "#FFF", "Description");
		this.infoDescription.setOrigin(0.5);
		this.infoDescription.setWordWrapWidth(w-2*p, true);
		// this.infoDescription.setLineSpacing(10);
		this.infoBox.add(this.infoDescription);

		this.infoImage = this.add.image(w/2-p, -h/2+p, "PANLEO");
		this.infoImage.setData("size", imgFac*titleSize);
		this.infoImage.setOrigin(1.0, 0.0);
		this.infoImage.setVisible(false);
		this.infoBox.add(this.infoImage);
	}


	update(time: number, deltaMs: number): void {
		let delta = deltaMs / 1000;

		if (this.timeStamp < simulator.time && this.currentStory && !this.currentStory.disableSimulation) {
			let x = (this.timeStamp - (simulator.time - SIMULATION_LENGTH)) / SIMULATION_LENGTH;
			let fac = 1 - Math.pow(x, 2);
			this.timeStamp += Math.max(0.05 * fac, 0.01);
			this.timeStamp = Math.min(this.timeStamp, simulator.time);
			this.updatePopulations();
			this.graph.draw(this.timeStamp);

			if (this.currentStory && this.currentStory.key == "1b" && this.timeStamp > 20) {
				this.completeStory();
			}
		}

		this.graph.update(time, delta);

		this.matrixEditor.draw(this.nodes);

		this.nextButton.update(time, delta);
		this.nextButton.setScale(1.0 - 0.1 * this.nextButton.holdSmooth);

		//console.log(game.input.mousePointer.x, game.input.mousePointer.y);

		for (const node of this.nodes) {
			node.update(time, delta);
		}

		this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
			fakeNode.update(time, delta);
		});

		for (const path of this.paths) {
			path.update(time, delta);
		}

		for (const slider of this.sliders) {
			slider.update(time, delta);
		}


		// Boids
		if (this.currentStory) {
			for (const node of this.nodes) {
				if (node.inPlay && node.stick) {
					let cohSum = new Phaser.Math.Vector2();
					let cohCount = 0;
					let sepSum = new Phaser.Math.Vector2();

					for (const other of this.nodes) {
						if (other.visible) {
							let dist = Phaser.Math.Distance.BetweenPoints(node, other);

							let cohRad = 10000;
							// if (dist < cohRad && node.species.group == other.species.group) {
								cohSum.add(other);
								cohCount++;
							// }

							let sepRad = node.getWidth()/2 + other.getWidth()/2;
							sepRad *= 1.2;
							if (dist < sepRad) {
								let temp = new Phaser.Math.Vector2(node.x, node.y);
								temp.subtract(other);
								temp.scale(Math.pow((sepRad - dist) / sepRad, 1.1));
								sepSum.add(temp);
							}
						}
					}

					let fakeNode = this.fakeNodes.get(node.role)!;
					let goalPos = new Phaser.Math.Vector2(fakeNode.x, fakeNode.y);
					goalPos.y += 7*Math.sin(time/1500+goalPos.x/400+goalPos.y/1000);
					goalPos.subtract(node);
					// goalPos.scale(this.currentStory ? 0 : 0.001);
					goalPos.scale(0.001);
					node.velocity.add(goalPos);

					// cohSum.scale(1/cohCount);
					// cohSum.subtract(node);
					// cohSum.scale(0.01);
					// node.velocity.add(cohSum);

					sepSum.scale(0.02);
					node.velocity.add(sepSum);

					node.velocity.scale(0.95);
					node.goalX += node.velocity.x;
					node.goalY += node.velocity.y;

					if (node.goalX < node.limitLeft) {
						node.goalX = node.limitLeft;
						node.velocity.x *= -1;
					}
					if (node.goalY < node.limitTop) {
						node.goalY = node.limitTop;
						node.velocity.y *= -1;
					}
					if (node.goalX > node.limitRight) {
						node.goalX = node.limitRight;
						node.velocity.x *= -1;
					}
					if (node.goalY > node.limitBottom) {
						node.goalY = node.limitBottom;
						node.velocity.y *= -1;
					}

					if (!node.hold) {
						node.stickX = node.goalX;
						node.stickY = node.goalY;
					}
				}
			}
		}


		if (!this.currentStory) {
			this.foodWeb.update(time, delta);

			if (this.attractionOpen) {
				this.foodWeb.config.mode = Phaser.Math.Easing.Cubic.InOut(0.5 + 0.5 * Math.sin(time/8000));
			}
		}
	}


	setStory(storyKey: string): void {
		if (storyKey == "attraction") {
			this.mode = storyKey;
			this.currentStory = undefined;

			this.foodWeb.resetNodes();
		}

		else if (storyKey == "network") {
			this.mode = storyKey;
			this.currentStory = undefined;

			language.bind(this.nextText, "explore_button", this.resizeNextButton.bind(this));
		}

		else {
			this.mode = "story";
			this.currentStory = storyData[storyKey];

			if (this.currentStory.chapter) {
				this.currentChapter = this.currentStory.chapter;
			}

			this.foodWeb.resetNodes();
		}


		this.bgCont.setVisible(this.mode != "attraction");
		this.titleText.setVisible(this.mode != "attraction");
		this.chapterCont.setVisible(this.mode != "attraction");
		this.foodWeb.setVisible(this.mode != "story");
		this.africa.setVisible(this.mode == "story");
		this.africaIcon.setVisible(this.mode == "story");
		this.infoBox.setVisible(this.mode == "story");
		this.nextButton.setVisible(this.mode == "network");

		this.graph.setVisible(this.mode == "story");
		this.instructionText.setVisible(false);
		this.storyText1.setVisible(false);
		this.storyText2.setVisible(false);
		this.tempSlider.setVisible(false);

		this.chapterTabs[0].setAlpha((this.mode == "story" && this.currentChapter == 1) ? 1.0 : 0.5);
		this.chapterTabs[1].setAlpha((this.mode == "story" && this.currentChapter == 2) ? 1.0 : 0.5);
		this.chapterTabs[2].setAlpha((this.mode == "network") ? 1.0 : 0.5);


		this.clearStory();
		this.startStory();

		/*
		this.dismissInfoPopup();

		let selectedChapter = 0;
		if (number == 0) {
			selectedChapter = 2;
		}
		else if (number >= 3) {
			selectedChapter = 1;
		}

		for (var i = this.chapterTabs.length - 1; i >= 0; i--) {
			this.chapterTabs[i].setAlpha(i == selectedChapter ? 1.0 : 0.5);
			this.chapterTabs[i].setVisible(number != -1);
		}

		if (number == 0) {
			language.bind(this.instructionText, "");
			// language.bind(this.instructionText, "instruction_0");
			for (const node of this.nodes) {
				node.setVisible(false);
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				this.fakeNodes.get(key)!.setVisible(false);
			});
		}
		else if (number == 1) {
			language.bind(this.instructionText, "instruction_1");
			for (const node of this.nodes) {
				node.setVisible(this.story1.includes(node.role));
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				this.fakeNodes.get(key)!.setVisible(this.story1.includes(key));
			});
		}
		else if (number == 2) {
			language.bind(this.instructionText, "instruction_2");
			for (const node of this.nodes) {
				node.setVisible(this.story2.includes(node.role));
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				this.fakeNodes.get(key)!.setVisible(this.story2.includes(key));
			});
		}
		else if (number == 3) {
			language.bind(this.instructionText, "instruction_3");
			for (const node of this.nodes) {
				node.setVisible(this.story3.includes(node.role));
				if (node.inPlay && !node.visible) {
					// TODO: Fix since this re-runs simulation 3 times
					node.resetPosition(false);
				}
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				// this.fakeNodes.get(key)!.setVisible(this.story3.includes(key));
				this.fakeNodes.get(key)!.setVisible(false);
			});
		}
		else {
			for (const node of this.nodes) {
				node.setVisible(false);
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				this.fakeNodes.get(key)!.setVisible(false);
			});
			// this.setStory(0);
			// language.bind(this.instructionText, "instruction_4");
			// for (const node of this.nodes) {
			// 	node.setVisible(this.story2.includes(node.role));
			// }
			// this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
			// 	this.fakeNodes.get(key)!.setVisible(false);
			// });
		}

		// Move nodes to slots
		for (const node of this.nodes) {
			if (node.requiresSlot()) {
				this.assignNodeToSlot(node, true);
			}
		}
		*/
	}

	clearStory() {
		for (let node of this.nodes) {
			node.destroy();
		}
		this.nodes = [];

		this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
			fakeNode.destroy();
		});
		this.fakeNodes.clear();

		for (let path of this.paths) {
			path.destroy();
		}
		this.paths = [];

		for (let i = 0, l = this.nodeSlots.length; i < l; i++) {
			let slot: NodeSlot = this.nodeSlots[i];
			slot.taken = false;
		}
	}

	startStory() {
		if (this.currentStory) {
			language.bind(this.infoDescription, this.currentStory.intro);
			this.infoDescription.setFontSize(this.currentStory.key == "2a" ? 15 : 20);

			// if (!this.currentStory.persist) {
			// this.timeStamp = 0;
			// }

			if (this.currentStory.disableGraph) {
				this.graph.setVisible(false);
			}
			if (this.currentStory.enableSlider) {
				this.tempSlider.setVisible(true);
				this.tempSlider.value = 0;
			}

			// this.nextButton.setVisible(true);
			// language.bind(this.nextText, "next_button", this.resizeNextButton.bind(this));

			// this.currentStory.disablePlacing


			// const activeSpecies = this.currentStory.species.map(s => s.name);
			// console.log(activeSpecies);

			for (let species of this.currentStory.species) {
				const organism = simulator.scenario.speciesMap.get(species.name);

				if (organism) {
					let node = new Node(this, 0, 0, organism);
					this.nodes.push(node);

					node.on('onEnter', this.onNodeAddOrRemove, this);
					node.on('onExit', this.onNodeAddOrRemove, this);
					node.on('onPlusMinus', this.onNodePlusMinus, this);
					node.on('onDeath', this.onNodeDeath, this);
					node.on('onDragStart', this.dismissInfoPopup, this);
					node.on('removeNodeFromSlot', this.removeNodeFromSlot, this);
					node.on('assignNodeToSlot', this.assignNodeToSlot, this);

					node.simIndex = simulator.species.indexOf(organism);


					const fx = species.position.x * this.W;
					const fy = species.position.y * this.H;
					let fakeNode = new FakeNode(this, fx, fy, species.fakeKey);
					fakeNode.addReplacement(node);

					node.role = species.name;
					this.fakeNodes.set(species.name, fakeNode);


					if (species.placed) {
						node.inPlay = true;
						node.emit('onEnter', node, true, true);
						node.goalX = fx;
						node.goalY = fy;
						node.stickX = fx;
						node.stickY = fy;
						node.x = fx;
						node.y = fy;
					}
					else if (node.requiresSlot()) {
						this.assignNodeToSlot(node, true);
					}
				}
			}

			for (const node of this.nodes) {
				for (const other of this.nodes) {
					if (node != other && node.role && other.role) {
						let relation = database.getNodeRelation(node.species.id, other.species.id);
						if (relation) {
							// let amount = relation.preference;
							let amount = 1.0;
							// console.log(node.species.name, '->', other.species.name, '=', amount.toFixed(1));

							const nodeFake = this.fakeNodes.get(node.role)!;
							const otherFake = this.fakeNodes.get(other.role)!;

							this.addPath(node, other, amount);
							this.addPath(nodeFake, other, amount);
							this.addPath(nodeFake, otherFake, amount);
							this.addPath(node, otherFake, amount);

							node.neighbours.push(other);
							other.neighbours.push(node);
						}
					}
				}
			}

			this.updatePaths();
		}
	}

	completeStory(): void {
		if (!this.nextButton.visible) {
			this.nextButton.setVisible(true);

			if (this.currentStory && this.currentStory.outro) {
				language.bind(this.infoDescription, this.currentStory.outro);
				this.infoDescription.setFontSize(20); // Temp
			}
			language.bind(this.nextText, "next_button", this.resizeNextButton.bind(this));
		}

		/*
		this.storyRunning = false;

		this.instructionText.setVisible(false);
		this.storyText1.setVisible(true);
		this.storyText2.setVisible(true);

		if (this.currentStory == 1) {
			language.bind(this.storyText1, "explanation_1a");
			language.bind(this.storyText2, "explanation_1b");
			this.showInfoPopup(this.fakeNodes.get("plant_1")!.x, this.fakeNodes.get("plant_1")!.y, "popup_2");
			// this.showInfoPopup(this.fakeNodes.herbivore_1.x, this.fakeNodes.herbivore_1.y, "popup_3");
		}
		else if (this.currentStory == 2) {
			language.bind(this.storyText1, "explanation_2a");
			language.bind(this.storyText2, "explanation_2b");
		}
		else if (this.currentStory == 3) {
			this.tempSlider.setVisible(true);
		}
		*/
	}

	resizeNextButton() {
		this.nextBg.setWidth(this.nextText.width + 2*this.nextBg.height);
		this.nextBg2.setWidth(this.nextBg.width + 10);

		// Add padding to button for easier clicking
		this.nextBg.input.hitArea.setTo(-20, -20, this.nextBg.width+2*20, this.nextBg.height+2*20);
	}


	reset(): void {
		for (const node of this.nodes) {
			// this.updateSize(node, -node.size);
			node.resetPosition(false);
		}
		this.timeStamp = 0;
		this.graph.draw(this.timeStamp);

		simulator.reset();
		simulator.run(0);
		this.updatePaths();
		this.dismissInfoPopup(false);
	}

	onNodePlusMinus(node: Node, value: number): void {
		this.timeStamp = simulator.time;
		simulator.changeGrowthRate(node.species, value);
		simulator.run(this.timeStamp);
		this.updatePaths();

		/*
		this.explored = [];
		this.queue = [[startNode, startValue, 0]];
		let maxDelay = 0;

		while (this.queue.length > 0) {
			let item = this.queue.shift();
			let node = item[0];
			let value = item[1];
			let delay = item[2];
			maxDelay = Math.max(maxDelay, delay);

			if (!this.explored.includes(node) && node.isInsidePlayingField()) {
				this.explored.push(node);

				if (node.size > -4) {
					this.updateSize(node, value, delay);
					for (let item of node.neighbours) {
						this.queue.push([item.node, value * item.value, delay+1]);
					}
				}
			}
		}

		this.time.addEvent({
			delay: 500 + 150*maxDelay,
			callbackScope: this,
			callback: function() {
				for (const node of this.nodes) {
					if (node.size <= -3) {
						this.updateSize(node, -node.size);
						node.resetPosition();
					}
				}
			}
		});
		*/
	}

	onNodeDeath(node: Node): void {
		// if (this.storyRunning) {
			// this.showInfoPopup(node.x, node.y, "popup_1");
		// }
	}

	showInfoPopup(x: number, y: number, key: string): void {
		this.infoPopup.show(x, y, key);
	}

	dismissInfoPopup(animated: boolean=true): void {
		this.infoPopup.dismiss(animated);
	}

	// updateSize(node, value, delay=0) {
	// 	if (true)
	// 		return;

	// 	node.size = Phaser.Math.Clamp(node.size + value, -3, 3);
	// 	let scale = 1.0 + node.size / 3;

	// 	// node.image.setTint(interpolateColor(0xFFFFFF, 0xFF0000, Math.abs(node.size / 4)));

	// 	// node.setScale(scale);
	// 	if (node.tween) {
	// 		node.tween.stop();
	// 	}
	// 	node.tween = this.tweens.add({
	// 		targets: node.circle,
	// 		scale: { from: node.circle.scale, to: scale },
	// 		ease: 'Cubic',
	// 		duration: 500,
	// 		delay: 150*delay
	// 	});
	// }

	assignNodeToSlot(node: Node, forceMove: boolean=false): void {
		for (let i = 0, l = this.nodeSlots.length; i < l; i++) {
			let slot: NodeSlot = this.nodeSlots[i];

			if (!slot.taken) {
				slot.taken = true;
				node.assignSlot(slot.x, slot.y, i, forceMove);
				break;
			}
		}
	}

	removeNodeFromSlot(node: Node, index: number): void {
		this.nodeSlots[index].taken = false;
	}

	onNodeAddOrRemove(node: Node, active: boolean, manually: boolean): void {
		// Causes an ugly jump
		// this.timeStamp = simulator.time;

		if (this.currentStory && !this.currentStory.disableSimulation) {
			simulator.population = simulator.sol.at(this.timeStamp);
			simulator.addOrRemoveSpecies(node.species, active);

			if (manually) {
				simulator.run(this.timeStamp);
				this.updatePaths();
			}
			this.updatePopulations();
		}

		if (this.currentStory) {
			const allInPlay = this.nodes.every(node => node.inPlay);

			if (this.currentStory.key == "1a" && allInPlay) {
				this.completeStory();
			}

			if (this.currentStory.key == "1c" && !allInPlay) {
				this.completeStory();
			}

			if (this.currentStory.key == "1d" && allInPlay) {
				this.completeStory();
			}

			/*
			for (const node of this.nodes) {
				if ( (this.currentStory == 1 && this.story1.includes(node.role))
					|| (this.currentStory == 2 && this.story2.includes(node.role))
					|| (this.currentStory == 3 && this.story3.includes(node.role)) ) {
					if (!node.inPlay) {
						success = false;
						break;
					}
				}
			}
			*/
		}
	}


	updatePopulations(): void {
		let populations = simulator.getPopulationAt(this.timeStamp);

		for (let i = 0, l = this.nodes.length; i < l; i++) {
			let node = this.nodes[i];
			let index = node.simIndex;

			if (node.inPlay) {
				node.setPopulation(populations[index]);

				// Automatically kill node
				// if (!node.alive) {
					// node.resetPosition(false);
				// }
			}
		}
	}

	addPath(node1: BaseNode, node2: BaseNode, amount: number): void {
		let path = new Path(this, node1, node2, amount);
		this.paths.push(path);
		// node1.neighbours.push({node:node2, value:amount});
		// node2.neighbours.push({node:node1, value:-amount});
	}

	updatePaths(): void {
		// TODO: Very inefficient
		for (let i in this.nodes) {
			for (let j in this.nodes) {

				// Update path thickness
				for (const path of this.paths) {
					if (path.node1 == this.nodes[i] && path.node2 == this.nodes[j]) {
						let value = simulator.getInteractionStrength(this.nodes[i].simIndex, this.nodes[j].simIndex);
						path.lineThickness = (this.nodes[j].species.isPlant() ? 3 : 2) * value;
						path.dotDensity = this.nodes[j].species.isPlant() ? 1.1 : 0.6;
					}
				}
			}
		}
	}


	updateBlur(): void {
		let filter = this.cameras.main.getPostPipeline('BlurPostFilter') as BlurPostFilter;
		let active = !Array.isArray(filter);
		let on = this.attractionOpen || this.infoOpen;

		if (on) {
			if (!active) {
				this.cameras.main.setPostPipeline(BlurPostFilter);
				filter = this.cameras.main.getPostPipeline('BlurPostFilter') as BlurPostFilter;
			}

			if (this.blurTween) {
				this.blurTween.stop();
			}

			this.blurTween = this.tweens.add({
				targets: filter,
				steps: { from: filter.steps, to: 2 },
				offsetX: { from: filter.offsetX, to: 1.4 },
				offsetY: { from: filter.offsetY, to: 1.4 },
				ease: 'Linear',
				duration: 250
			});
		}
		else {
			if (this.blurTween) {
				this.blurTween.stop();
			}

			this.blurTween = this.tweens.add({
				targets: filter,
				steps: { from: filter.steps, to: 0 },
				offsetX: { from: filter.offsetX, to: 0 },
				offsetY: { from: filter.offsetY, to: 0 },
				ease: 'Linear',
				duration: 250,
				onComplete: () => {
					this.cameras.main.resetPostPipeline();
				}
			});
		}
	}


	assignDebugSlider(index: number, name: string, minValue: number, maxValue: number): Slider {
		let slider = this.sliders[index];
		slider.setVisible(true);
		// sliderTitle.setText(name);
		slider.setRange(minValue, maxValue);
		return slider;
	}
}