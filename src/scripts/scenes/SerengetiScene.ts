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
import { HSVToRGB, colorToString } from "../utils";
import { NODE_SIZE, SIMULATION_LENGTH } from "../constants";
import { language } from "../language/LanguageManager";
import { database } from "../database/Database";
import { BlurPostFilter } from "../pipelines/BlurPostFilter";

interface NodeSlot {
	x: number;
	y: number;
	taken: boolean;
}

export class SerengetiScene extends BaseScene {
	private sidebarBg: RoundRectangle;
	private titleText: Phaser.GameObjects.Text;
	private instructionText: Phaser.GameObjects.Text;
	private storyText1: Phaser.GameObjects.Text;
	private storyText2: Phaser.GameObjects.Text;
	private nextButton: RoundRectangle;
	private nextText: Phaser.GameObjects.Text;
	private chapterTabs: Phaser.GameObjects.Container[];

	private nodes: Node[];
	private nodeSlots: NodeSlot[];
	private fakeNodes: Map<NodeId, FakeNode>;
	private paths: Path[];
	private sliders: Slider[];
	private graph: Graph;
	private infoPopup: InfoPopup;
	private foodWeb: FoodWeb;
	private modeSlider: Slider;
	private minimap: Phaser.Cameras.Scene2D.Camera;

	private timeStamp: number;
	private currentStory: number;
	private roleMap: object;
	private story1: string[];
	private story2: string[];
	private story3: string[];
	private storyRunning: boolean;
	private infoWindowLock: boolean;

	constructor() {
		super({key: 'SerengetiScene'});

		// "Role" is a node's role in the scenario, deciding when it appears in the story
		this.roleMap = {
			"138fc562-6fb9-45ff-bcdf-656208d2be14": "carnivore_1", // Lion
			"3c3f0fdf-e6c1-4a94-b52e-e3785a2849ca": "herbivore_1", // Plains zebra
			"042f48d0-4a28-4e77-874f-b9a5b1f821af": "plant_1", // Heteropogon contortus
			"f4f32888-4079-4c70-a204-a094647ea210": "herbivore_2", // Kirk's dik-dik
			// "a11f07e7-554c-4b0a-ab11-ac34d84b6d85": "plant_2", // Acalypha fruticosa
			"37b60be7-d897-41cb-91e5-56045687788e": "plant_2", // Allophylus rubifolius
			"93878dd9-1df5-4521-b5ba-57f63450e912": "plant_3", // Panicum coloratum

			"00107254-185b-47ab-bc45-bc68e13ace3f": "c2", // Vildhund
			"2dd450bc-8faa-4971-ad5d-53b04a958105": "h2", // Gnu
			"c2d58e40-9606-4d58-9a62-dc08ccb02e2b": "h3", // Impala
			"6f868898-a03f-467b-a797-a1252e75e36c": "h4", // Vattenbock
			"93d59a4b-5517-4eb5-8e81-1caa61b9db6a": "p1", // Kängrugräs
			"70640c68-402d-4a0b-ae47-4089329d0b01": "p3", // Fingerhirs
			"f62f5010-632f-4870-91a8-9bf4d90e961c": "p4", // Acacia

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
		this.story3 = ["carnivore_1", "c2", "herbivore_1", "h2", "h3", "h4", "p1", "plant_1", "p3", "p4"];
		this.timeStamp = 0;
		this.currentStory = 0;
		this.storyRunning = false;
	}

	create(): void {
		this.fade(false, 200, 0x000000);

		let serengetiData = database.getScenario("c9ca9a35-869d-4b18-a62d-d43dd7a02939");
		if (serengetiData) {
			simulator.loadScenario(serengetiData);
		}

		this.input.addPointer(3);

		this.scene.launch('UIScene');

		// this.minimap = this.cameras.add(0, 0, this.W/2, this.H/2).setZoom(1.0).setName('mini');
		// this.minimap.setBackgroundColor(0x000000);
		// this.minimap.setPostPipeline(BlurPostFilter);
		// this.minimap.scrollX = 0;
		// this.minimap.scrollY = 0;
		// this.minimap.setVisible(false);

		let bg = this.add.image(this.CX, this.CY, 'bg_serengeti');
		bg.setAlpha(0.3);
		// bg.setPostPipeline(BlurPostFilter);
		this.fitToScreen(bg);
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
		let sbX = this.CX;
		let sbY = this.H - 0.5*sbH;
		this.sidebarBg = new RoundRectangle(this, sbX, sbY, sbW, sbH, 10, 0X000000);
		this.sidebarBg.setAlpha(0.2);


		// Scenario title
		this.titleText = this.createText(10, 10, 28, this.weights.bold, "#FCB061", "Serengeti Food Web");
		this.titleText.setAlpha(0.75);
		this.titleText.setOrigin(0);
		language.bind(this.titleText, "title");

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

		// let color = 0xa77440;
		this.nextButton = new RoundRectangle(this, sbX, sbY+0.20*sbH, 200, 44, 22, buttonOrange);
		this.nextButton.setInteractive({ useHandCursor: true })
			.on('pointerup', () => { this.startStory(this.currentStory + 1); }
		);
		this.nextText = this.createText(sbX, sbY+0.20*sbH, 20, this.weights.bold, "#FFF", "Next");
		this.nextText.setOrigin(0.5);
		language.bind(this.nextText, "next_button");


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
					this.startStory(1);
				}
			},
			{
				name: "chapter_2",
				image: 'icon-ecoChallenge',
				function: () => {
					this.reset();
					this.startStory(3);
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
					this.startStory(0);
				}
			},
		];

		this.chapterTabs = [];
		let ctW = 0.03 * this.W;
		let ctH = 0.17 * this.H;
		let ctX = this.W;
		let ctY = this.CY;

		for (let i = 0; i < chapters.length; i++) {
			let chapter = chapters[i];
			let x = ctX - ctW/2;
			let y = ctY + (i-2)*ctH + (i-1)*ctH*0.01;

			let tab = this.add.container(x, y);
			tab.setDepth(100);
			tab.setAlpha(0.5);
			this.chapterTabs.push(tab);

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


		// Toolbox


		this.infoWindowLock = false;

		// Listen for events from the main scene
		this.scene.get('UIScene').events.on('openInfo', () => {
			this.openInfoWindow();
		}, this);

		this.scene.get('UIScene').events.on('closeInfo', () => {
			this.openInfoWindow();
		}, this);

		this.scene.get('UIScene').events.on('restart', () => {
			this.restart();
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
		for (let i = 0; i < simulator.species.length; i++) {
			const organism = simulator.scenario.species[i];

			if (this.roleMap[organism.id]) {

				let node = new Node(this, 0, 0, organism);
				this.nodes.push(node);

				// Experimental boids
				node.velocity = new Phaser.Math.Vector2(0, 0);

				node.setDepth(1);
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
		}


		/* Large food web */

		this.foodWeb = new FoodWeb(this, 0, 0);

		this.modeSlider = new Slider(this, this.CX, 0.95*this.H, 250, 24, 6);
		this.modeSlider.setRange(0, 1);
		this.sliders.push(this.modeSlider);
		this.add.existing(this.modeSlider);

		let modeSep = 1.5 * this.modeSlider.height;
		let groupText = this.createText(- this.modeSlider.width/2 - modeSep, 0, 20, this.weights.bold);
		let linkText = this.createText(this.modeSlider.width/2 + modeSep, 0, 20, this.weights.bold);
		groupText.setOrigin(1, 0.5);
		linkText.setOrigin(0, 0.5);
		this.modeSlider.add(groupText);
		this.modeSlider.add(linkText);
		language.bind(groupText, "slider_groups");
		language.bind(linkText, "slider_links");

		this.modeSlider.value = this.foodWeb.config.mode;
		this.modeSlider.on('onChange', (value) => {
			this.foodWeb.config.mode = value;
		}, this);
		this.modeSlider.setVisible(false);


		// this.V1 = this.assignDebugSlider(0, "Gravity", 0, 100);
		// this.V1.value = this.foodWeb.config.gravity;
		// this.V2 = this.assignDebugSlider(1, "Link distance", 0, 400);
		// this.V2.value = this.foodWeb.config.linkDistance;
		// this.V3 = this.assignDebugSlider(2, "Link strength", 0, 0.1);
		// this.V3.value = this.foodWeb.config.linkStrength;
		// this.V4 = this.assignDebugSlider(3, "Charge", -100, 0);
		// this.V4.value = this.foodWeb.config.charge;
		// this.V5 = this.assignDebugSlider(4, "Friction", 0, 1);
		// this.V5.value = this.foodWeb.config.friction;
		// this.V6 = this.assignDebugSlider(5, "Group strength", 0, 100);
		// this.V6.value = this.foodWeb.config.groupStrength;

		// this.V1.lock();
		// this.V2.lock();
		// this.V3.lock();
		// this.V4.lock();
		// this.V5.lock();
		// this.V6.lock();


		// Empty nodes

		this.fakeNodes = new Map();
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


		// Paths

		this.paths = [];
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
					}
				}
			}
		}


		// Graph

		this.graph = new Graph(this, 1.6*sbH, 0.75*sbH);
		this.graph.setPosition(0.32*sbH + 0.5*this.graph.width, sbY + 0.03*this.graph.height);


		// Info text popup

		this.infoPopup = new InfoPopup(this);


		this.startStory(1);
	}

	update(time: number, deltaMs: number): void {
		let delta = deltaMs / 1000;

		if (this.timeStamp < simulator.time) {
			let x = (this.timeStamp - (simulator.time - SIMULATION_LENGTH)) / SIMULATION_LENGTH;
			let fac = 1 - Math.pow(x, 2);
			this.timeStamp += Math.max(0.05 * fac, 0.01);
			this.timeStamp = Math.min(this.timeStamp, simulator.time);
			this.updatePopulations();
			this.graph.draw(this.timeStamp);
		}

		this.graph.update(time, delta);

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
		if (this.currentStory > 0) {
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

							let sepRad = node.circle.displayWidth/2 + other.circle.displayWidth/2;
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
					goalPos.scale(this.storyRunning ? 0 : 0.001);
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



		// Boids
		if (this.currentStory == 0) {
			this.foodWeb.update(time, delta);
		}
	}


	startStory(number: number): void {
		this.dismissInfoPopup();

		let selectedChapter = number > 0 ? 0 : 1;

		for (var i = this.chapterTabs.length - 1; i >= 0; i--) {
			this.chapterTabs[i].setAlpha(i == selectedChapter ? 1.0 : 0.5);
		}

		if (number == 0) { // Large network
			// this.sidebarBg.setVisible(false);
			this.graph.setVisible(false);
			this.foodWeb.setVisible(true);
			this.modeSlider.setVisible(true);
		}
		else { // Introduction levels
			// this.sidebarBg.setVisible(true);
			this.graph.setVisible(true);
			this.foodWeb.setVisible(false);
			this.modeSlider.setVisible(false);
		}

		this.storyRunning = true;
		this.currentStory = number;

		this.instructionText.setVisible(true);
		this.nextButton.setVisible(false);
		this.nextText.setVisible(false);
		this.storyText1.setVisible(false);
		this.storyText2.setVisible(false);

		if (number == 0) {
			// language.bind(this.instructionText, null);
			language.bind(this.instructionText, "instruction_0");
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
			language.bind(this.instructionText, "instruction_4");
			for (const node of this.nodes) {
				node.setVisible(this.story2.includes(node.role));
			}
			this.fakeNodes.forEach((fakeNode: FakeNode, key: NodeId) => {
				this.fakeNodes.get(key)!.setVisible(false);
			});
		}

		// Move nodes to slots
		for (const node of this.nodes) {
			if (node.requiresSlot()) {
				this.assignNodeToSlot(node, true);
			}
		}
	}

	completeStory(): void {
		this.storyRunning = false;

		this.instructionText.setVisible(false);
		this.nextButton.setVisible(true);
		this.nextText.setVisible(true);
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
	}


	restart(): void {
		this.reset();
		this.startStory(1);
		this.flash(500, 0x000000);
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
		if (this.storyRunning) {
			this.showInfoPopup(node.x, node.y, "popup_1");
		}
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

		simulator.population = simulator.sol.at(this.timeStamp);
		simulator.addOrRemoveSpecies(node.species, active);

		if (manually) {
			simulator.run(this.timeStamp);
			this.updatePaths();
		}
		this.updatePopulations();

		if (this.storyRunning) {
			let success = true;
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
			// if (this.currentStory > 2) {
				// success = false;
			// }
			if (success) {
				this.completeStory();
			}
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
						let value = simulator.interactionMatrix[this.nodes[i].simIndex][this.nodes[j].simIndex];
						path.lineThickness = (this.nodes[j].species.isPlant() ? 3 : 2) * value;
						path.dotDensity = this.nodes[j].species.isPlant() ? 1.1 : 0.6;
					}
				}
			}
		}
	}


	openInfoWindow(): void {
		this.events.emit('openInfo');

		let filter = this.cameras.main.getPostPipeline('BlurPostFilter');
		let active = !Array.isArray(filter);

		if (!active) {
			this.cameras.main.setPostPipeline(BlurPostFilter);

			let filter = this.cameras.main.getPostPipeline('BlurPostFilter');
			this.tweens.add({
				targets: filter,
				steps: { from: 0, to: 12 },
				offsetX: { from: 0, to: 1.5 },
				offsetY: { from: 0, to: 1.5 },
				ease: 'Linear',
				duration: 250
			});
		}
		else if (!this.infoWindowLock) {
			this.infoWindowLock = true;

			this.tweens.add({
				targets: filter,
				steps: { from: 12, to: 0 },
				offsetX: { from: 1.5, to: 0 },
				offsetY: { from: 1.5, to: 0 },
				ease: 'Linear',
				duration: 250,
				onComplete: () => {
					this.cameras.main.resetPostPipeline();
					this.infoWindowLock = false;
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