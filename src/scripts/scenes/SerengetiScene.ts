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
import { NextButton } from "../components/NextButton";
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

	private exploreButton: NextButton;
	private nextButton: NextButton;
	private prevButton: NextButton;
	private storyButton: NextButton;

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
	private infoWindowOpen: boolean;
	private storyWindowOpen: boolean;
	private blurTween: Phaser.Tweens.Tween;

	private timeStamp: number;

	private mode: string;
	private currentStory?: Story;
	private currentChapter: number;
	private completedStories: Set<string>;
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

		this.timeStamp = 0;
		this.currentChapter = 0;
		// this.currentStory = 0;
		// this.storyRunning = false;
		this.completedStories = new Set();

		this.attractionOpen = true;
		this.infoWindowOpen = false;
		this.storyWindowOpen = false;
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

		this.bg.setInteractive({ useHandCursor: false })
			.on("pointerdown", () => {
				this.foodWeb.clearInfoBox();
			}, this);

		// const spotlight = this.make.sprite({
		// 	x: 300,
		// 	y: 300,
		// 	key: 'test',
		// 	add: false
		// });
		// spotlight.setScale(1);

		// var graphics = this.add.graphics({});

		// graphics.fillGradientStyle(0xffffff, 0xffffff, 0x000000, 0x000000, 1);
		// graphics.fillRect(200, 200, 400, 400);
		// graphics.setBlendMode(Phaser.BlendModes.MULTIPLY);
		// this.bg.setMask(graphics.createGeometryMask());
		// const bmask = graphics.createBitmapMask();

		// this.bg.setMask(new Phaser.Display.Masks.BitmapMask(this, spotlight));
		// this.bg.setMask(new Phaser.Display.Masks.GeometryMask(this, gmask));
		// this.bg.setMask(new Phaser.Display.Masks.BitmapMask(this, bmask));


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

		this.exploreButton = new NextButton(this, 0.87 * this.W, 0.78 * this.H - 0.8 * nSize, nSize, 0x6B8B2F);
		this.nextButton = new NextButton(this, 0.82 * this.W, 0.78 * this.H - 0.8 * 0.75*nSize, 0.75*nSize, 0x6B8B2F);
		this.prevButton = new NextButton(this, 0.695 * this.W, 0.78 * this.H - 0.8 * 0.75*nSize, 0.75*nSize, 0);
		this.storyButton = new NextButton(this, 0.1 * this.W, 0.78 * this.H - 0.8 * 0.75*nSize, 0.75*nSize, 0);
		this.exploreButton.setText("explore_button");
		this.nextButton.setText("next_button");
		this.prevButton.setText("prev_button");
		this.storyButton.setText("story_button");
		this.exploreButton.setDepth(10);
		this.nextButton.setDepth(10);
		this.prevButton.setDepth(10);
		this.storyButton.setDepth(10);

		this.exploreButton.on("click", () => {
			if (this.mode == "network") {
				this.completedStories.clear();
				this.reset();
				this.setStory("1a");
			}
		}, this);

		this.nextButton.on("click", () => {
			if (this.currentStory) {
				this.setStory(this.currentStory.next);
			}
		}, this);

		this.prevButton.on("click", () => {
			if (this.currentStory) {
				this.completedStories.add(this.currentStory.prev);
				this.setStory(this.currentStory.prev);
			}
		}, this);

		this.storyButton.on("click", () => {
			if (this.currentStory) {
				this.events.emit("openStory", this.currentStory.chapter-1);
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
				image: 'icon-food-web',
				function: () => {
					this.completedStories.clear();
					this.reset();
					this.setStory("1a");
				}
			},
			{
				name: "chapter_2",
				image: 'icon-eco-challenge',
				function: () => {
					this.completedStories.clear();
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
				image: 'icon-eco-web',
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
			this.infoWindowOpen = state;
			this.updateBlur();
		}, this);

		this.scene.get('UIScene').events.on('story', (state: boolean) => {
			this.storyWindowOpen = state;
			this.updateBlur();
		}, this);

		this.scene.get('UIScene').events.on('restart', () => {
			this.completedStories.clear();
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


		// Large food web
		this.foodWeb = new FoodWeb(this);

		// Nodes
		this.nodes = [];

		// Empty nodes
		this.fakeNodes = new Map();

		// Paths
		this.paths = [];

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

		this.exploreButton.update(time, delta);
		this.nextButton.update(time, delta);
		this.prevButton.update(time, delta);
		this.storyButton.update(time, delta);

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
				this.foodWeb.config.mode = Phaser.Math.Easing.Cubic.InOut(0.5 + 0.5 * Math.cos(time/8000));
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
		this.exploreButton.setVisible(this.mode == "network");
		this.nextButton.setVisible(this.mode == "story");
		this.prevButton.setVisible(this.mode == "story");
		this.storyButton.setVisible(this.mode == "story");

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

			if (this.currentStory) {
				this.completedStories.add(this.currentStory.key);
			}
		}
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
		let on = this.attractionOpen || this.infoWindowOpen || this.storyWindowOpen;

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