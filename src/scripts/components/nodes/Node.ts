import { BaseScene } from "../../scenes/BaseScene";
import { BaseNode } from "./BaseNode";
import { RoundRectangle } from "../RoundRectangle";
import { Organism } from "../../simulation/Organism";
import { language } from "../../language/LanguageManager";
import { NODE_SIZE, DEATH_THRESHOLD } from "../../constants";
import { colorToNumber, interpolateColor } from "../../utils";
import { GrayScalePostFilter } from "../../pipelines/GrayScalePostFilter";

export class Node extends BaseNode {
	public species: Organism;

	public simIndex: number; // Scene
	public simGrowthChange: number; // Scene
	public role: string; // Scene
	private slotIndex: number | null;

	public population: number;
	private hasImage: boolean;
	public limitBottom: number;
	public limitLeft: number;
	public limitRight: number;
	public limitTop: number;
	private maxPopThreshold: number;
	private minPopThreshold: number;

	private offsetX: number;
	private offsetY: number;
	public goalX: number;
	public goalY: number;
	public stickX: number;
	public stickY: number;
	public stick: boolean;
	private popScale: number;

	public inPlay: boolean;
	public velocity: Phaser.Math.Vector2;
	public neighbours: Node[];

	private circleCont: Phaser.GameObjects.Container;
	// private circleOuterBg: Phaser.GameObjects.Ellipse;
	private circleMiddleBg: RoundRectangle;
	private circleBg: Phaser.GameObjects.Ellipse;
	private circleShadow: RoundRectangle;
	private circleImage: Phaser.GameObjects.Image;
	private nameCont: Phaser.GameObjects.Container;
	private nameBg: RoundRectangle;
	private nameText: Phaser.GameObjects.Text;

	constructor(scene, x, y, species) {
		super(scene, x, y);
		this.species = species;
		scene.add.existing(this);

		this.population = 1;
		this.neighbours = [];

		this.goalX = x;
		this.goalY = y;
		this.stick = true;
		this.stickX = x;
		this.stickY = y;

		this.inPlay = false;
		this.slotIndex = null;

		this.liftSmooth = 0;
		this.popScale = 1;

		this.hasImage = !species.image.startsWith('icon');

		this.category = species.category;


		this.limitLeft = NODE_SIZE/2;
		this.limitTop = NODE_SIZE/2;
		this.limitRight = this.scene.W - NODE_SIZE/2;
		this.limitBottom = this.scene.H - 0.2 * this.scene.H - NODE_SIZE/2;

		this.velocity = new Phaser.Math.Vector2(0, 0);


		// ...
		this.minPopThreshold = 0;
		this.maxPopThreshold = 1;
		if (this.species.isPlant()) {
			// this.minPopThreshold = 0.45;
			this.maxPopThreshold = 1.00;
		}
		else if (this.species.isAnimal()) {
			if (this.species.isHerbivore()) {
				// this.minPopThreshold = 0.25;
				this.maxPopThreshold = 0.60;
			}
			else if (this.species.isCarnivore()) {
				// this.minPopThreshold = 0.25;
				// this.maxPopThreshold = 0.35;
				this.maxPopThreshold = 0.60;
			}
		}


		// Image
		// this.circle = this.scene.add.image(0, 0, this.species.image);
		// this.circle.setScale(NODE_SIZE / this.circle.width);
		// this.bindInteractive(this.circle, true);
		// this.add(this.circle);



		let groupColors = {
			1: 0xF44336, 2: 0xE91E63, 3: 0x9C27B0, 4: 0x673AB7, 5: 0x3F51B5, 6: 0x2196F3, 7: 0x03A9F4, 8: 0x00BCD4, 9: 0x009688, 10: 0x4CAF50, 11: 0x8BC34A, 12: 0xCDDC39, 13: 0xFFEB3B, 14: 0xFFC107
		};
		let borderColor = interpolateColor(colorToNumber(this.species.color), 0x000000, 0.2);


		this.circleCont = this.scene.add.container(0, 0);
		this.add(this.circleCont);

		// Colored background circle
		// this.circleShadow = this.scene.add.ellipse(0, 0, NODE_SIZE, NODE_SIZE, 0x000000);
		this.circleShadow = new RoundRectangle(this.scene, 0, 0, 0, NODE_SIZE+6+1+8, (NODE_SIZE+6+1)/2, 0x000000, 0.5)
		// this.circleShadow.setAlpha(0.0);
		this.circleShadow.setOrigin(0.5, this.circleShadow.width / this.circleShadow.height / 2);
		this.circleCont.add(this.circleShadow);

		// Colored background circle
		// this.circleOuterBg = this.scene.add.ellipse(0, 0, NODE_SIZE+2*4, NODE_SIZE+2*4, 0xF1C28F);
		// this.circleOuterBg.setVisible(false);
		// this.circleOuterBg.setAlpha(0.4);
		// this.circleCont.add(this.circleOuterBg);

		// Colored background circle
		this.circleMiddleBg = new RoundRectangle(this.scene, 0, 0, 0, NODE_SIZE+6, (NODE_SIZE+6)/2, borderColor, 1.0)
		this.circleMiddleBg.setData("color", borderColor);
		this.circleMiddleBg.setOrigin(0.5, this.circleMiddleBg.width / this.circleMiddleBg.height / 2);
		// this.circleMiddleBg = this.scene.add.ellipse(0, 0, NODE_SIZE+4, NODE_SIZE+4, borderColor);
		// this.circleMiddleBg.setVisible(false);
		// this.circleMiddleBg.setAlpha(0.5);
		this.circleCont.add(this.circleMiddleBg);

		// Colored background circle
		this.circleBg = this.scene.add.ellipse(0, 0, NODE_SIZE, NODE_SIZE, 0XE6D8BE);
		this.circleBg.fillColor = colorToNumber(this.species.color);
		this.bindInteractive(this.circleBg, true);
		this.circleCont.add(this.circleBg);

		// Image of species (or icon if missing)
		this.circleImage = this.scene.add.image(0, 0, species.image);
		// this.circleImage.setAlpha(this.hasImage ? 1.0 : 0.75);
		this.circleImage.setScale((this.hasImage ? 1.0 : 0.8) * NODE_SIZE / this.circleImage.width);
		this.circleCont.add(this.circleImage);


		this.nameCont = this.scene.add.container(0, 0);
		this.add(this.nameCont);

		// Name background
		this.nameBg = new RoundRectangle(this.scene, 0, -NODE_SIZE/2 - 48, 36, 36, 36/2, 0xFFFFFF, 1.0);
		this.nameBg.setOrigin(0.5);
		this.nameCont.add(this.nameBg);

		// Name label next to node
		this.nameText = this.scene.createText(this.nameBg.x, this.nameBg.y, 36/2+4, this.scene.weights.regular, "#000000");
		this.nameText.setOrigin(0.5);
		this.nameCont.add(this.nameText);
		language.bind(this.nameText, species.id, () => {
			this.nameBg.setWidth(this.nameText.width + this.nameBg.height);
			// this.nameText.x = this.nameBg.x + this.nameBg.width/2;
		});
	}


	setPopulation(value) {
		let prevAlive = this.alive;
		this.population = value;
		let newAlive = this.alive;

		if (newAlive != prevAlive) {
			if (newAlive) {
				this.resetPostPipeline();
			}
			else {
				this.setPostPipeline(GrayScalePostFilter);
				this.emit('onDeath', this);
			}
		}

		if (this.inPlay) {
			let min = this.minPopThreshold;
			let max = this.maxPopThreshold;
			let factor = (Math.max(this.population, DEATH_THRESHOLD) - min) / (max - min);
			// let factor = this.population;
			this.popScale = 0.5 + 1.0 * Math.pow(factor, 1.1);
		}
		else {
			this.popScale = 1.0;
		}
	}


	update(time, delta) {
		super.update(time, delta);

		this.x += (this.goalX - this.x) / 2.0;
		this.y += (this.goalY - this.y) / 2.0;

		if (this.hold) {
			if (this.stick) {
				this.x += (this.stickX - this.x) / 1.5;
				this.y += (this.stickY - this.y) / 1.5;

				const minDragDist = this.isInsidePlayingField() ? NODE_SIZE/4 : NODE_SIZE;
				if (Phaser.Math.Distance.Between(this.goalX, this.goalY, this.stickX, this.stickY) > minDragDist) {
					this.stick = false;
					this.scene.tweens.add({
						targets: this,
						liftSmooth: { from: this.liftSmooth, to: 1 },
						ease: 'Cubic',
						duration: 200
					});
				}
			}
			// Swish and flick
			else {
				this.velocity.x = (this.goalX - this.x) * 0.7;
				this.velocity.y = (this.goalY - this.y) * 0.7;
			}
		}


		const duration = 1.0;
		this.aliveValue += Phaser.Math.Clamp((this.alive ? 1 : 0) - this.aliveValue, -delta/duration, delta/duration);


		// let withinDistance = Phaser.Math.Distance.BetweenPoints(this, this.scene.input) < NODE_SIZE;
		// let showButtons = withinDistance && !this.hold && this.isInsidePlayingField();
		// this.plus.setVisible(showButtons);
		// this.minus.setVisible(showButtons);

		// Enlargen node when dragging
		let liftScale = 1 + 0 * 0.2 * this.liftSmooth - 0.1 * this.holdSmooth;
		this.circleCont.setScale(liftScale * this.popScale);
		// this.circleCont.setAlpha(this.hold ? 0.7 : 1.0);
		// this.circleShadow.setScale(1 - 0.15 * this.liftSmooth);
		// this.circleShadow.x = 10 / this.circleCont.scaleX * (0.25 + 0.75*this.liftSmooth);
		// this.circleShadow.y = 10 / this.circleCont.scaleX * (0.25 + 0.75*this.liftSmooth);
		// this.circleMiddleBg.setScale((this.circleCont.scaleX * NODE_SIZE + 4) / this.circleMiddleBg.width / this.circleCont.scaleX);
		// (2*this.circleCont.width) / this.circleMiddleBg.width

		const borderColor = interpolateColor(colorToNumber(this.species.color), 0x000000, 0.6 - 0.4 * Math.pow(this.population, 0.5));
		this.circleMiddleBg.setColor(interpolateColor(borderColor, 0xFFFFFF, this.holdSmooth));
		// this.circleMiddleBg.getData("color")

		// Show name when holding the node
		this.nameCont.setAlpha(this.liftSmooth);

		// Hack to place above other nodes
		this.setDepth(1 + this.liftSmooth);
	}

	isInsidePlayingField() {
		if (!this.visible) {
			return false;
		}
		if (this.goalX < this.limitLeft || this.goalX > this.limitRight)
			return false;
		if (this.goalY < this.limitTop || this.goalY > this.limitBottom)
			return false;
		return true;
	}

	getWidth() {
		return NODE_SIZE * this.circleCont.scaleX;
	}


	onDragStart(pointer, dragX, dragY) {
		this.offsetX = this.x;
		this.offsetY = this.y;
		this.emit('onDragStart', this, true, true);
	}

	onDrag(pointer, dragX, dragY) {
		this.goalX = dragX * this.circleCont.scaleX + this.offsetX;
		this.goalY = dragY * this.circleCont.scaleX + this.offsetY;
	}

	onDragEnd(pointer, dragX, dragY, dropped) {
		if (this.stick) {
			this.goalX = this.stickX;
			this.goalY = this.stickY;
		}
		else {
			this.stickX = this.goalX;
			this.stickY = this.goalY;
		}
		this.stick = true;

		if (!this.isInsidePlayingField()) {
			this.resetPosition();
		}
		else {
			if (!this.inPlay) {
				this.inPlay = true;
				this.removeSlot();
				this.emit('onEnter', this, true, true);
			}
		}

		this.scene.tweens.add({
			targets: this,
			liftSmooth: { from: this.liftSmooth, to: 0 },
			ease: 'Cubic',
			duration: 200
		});
	}


	assignSlot(x, y, index, forceMove=false) {
		this.goalX = x;
		this.goalY = y;
		this.stickX = x;
		this.stickY = y;
		this.slotIndex = index;

		if (forceMove) {
			this.x = x;
			this.y = y;
		}
	}

	removeSlot() {
		if (this.slotIndex != null) {
			this.emit("removeNodeFromSlot", this, this.slotIndex);
			this.slotIndex = null;
		}
	}

	requiresSlot() {
		return (this.visible && this.slotIndex == null && !this.inPlay);
	}

	resetPosition(manually=true) {
		this.removeSlot();
		if (manually) {
			this.emit("assignNodeToSlot", this);
		}

		if (this.inPlay) {
			this.inPlay = false;
			this.emit('onExit', this, false, manually);
		}

		this.setPopulation(1.0);
	}


	get alive() {
		return (this.population > DEATH_THRESHOLD);
	}
}