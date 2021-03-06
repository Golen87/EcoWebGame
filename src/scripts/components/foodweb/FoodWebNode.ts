import { BaseScene } from "../../scenes/BaseScene";
import { FoodWebButton } from "./FoodWebButton";
import { BaseNode } from "../nodes/BaseNode";
import { language } from "../../language/LanguageManager";
import { Organism } from "../../simulation/Organism";
import { RoundRectangle } from "../RoundRectangle";
import { speciesMap, iconsMap } from "../../assets/assetMaps";

export class FoodWebNode extends BaseNode {
	public scene: BaseScene;

	public species: Organism;
	public neighbours: FoodWebNode[];
	public hyperLink: FoodWebButton;
	public _selected: boolean;
	public subselected: boolean;
	public importance: number;

	private config: any;

	private velocity: Phaser.Math.Vector2;
	private circle: Phaser.GameObjects.Ellipse;
	private image: Phaser.GameObjects.Image;
	private nameBg: RoundRectangle;
	private nameText: Phaser.GameObjects.Text;

	private hasImage: boolean;
	private alphaGoal: number;
	private size: number;
	private arbitraryLockTimer: number;
	private goalX: number;
	private goalY: number;
	private dragOffsetX: number;
	private dragOffsetY: number;
	private _dragged: boolean;
	private _dragX: number;
	private _dragY: number;
	private _visibilityCache: number;

	constructor(scene, x, y, species, config) {
		super(scene, x, y);
		this.scene = scene;
		this.species = species;
		this.config = config;

		this.neighbours = [];
		this.alphaGoal = 1;

		this.setDepth(1);
		this.setVisible(true);

		let tier = (species.isPlant() ? 1 : (species.isHerbivore() ? 2 : 3));
		this.hasImage = !species.image.startsWith('icon');
		this.size = 24 + 12 * tier - (this.hasImage ? 0 : 4);
		// this.size = 2*(20 + 12 * tier);

		// Colored background circle
		this.circle = scene.add.ellipse(0, 0, this.size+6, this.size+6, this.config.groupColors[species.group]);
		this.add(this.circle);

		// Image of species (or icon if missing)
		if (this.hasImage)
			this.image = scene.add.image(0, 0, "species", speciesMap[species.image]);
		else
			this.image = scene.add.image(0, 0, "icons", iconsMap[species.image]);
		this.image.setAlpha(this.hasImage ? 1.0 : 0.75);
		this.image.setScale((this.hasImage ? 1.0 : 0.8) * this.size / this.image.width);
		this.add(this.image);

		// Name background
		this.nameBg = new RoundRectangle(this.scene, 0, -this.size/2 - 24, 24, 24, 24/2, 0xFFFFFF, 1.0);
		this.nameBg.setOrigin(0.5);
		this.add(this.nameBg);

		// Name label next to node
		this.nameText = this.scene.createText(this.nameBg.x, this.nameBg.y, 14, this.scene.weights.regular, "#000000");
		this.nameText.setOrigin(0.5);
		this.add(this.nameText);
		language.bind(this.nameText, species.id, () => {
			this.nameBg.setWidth(this.nameText.width + this.nameBg.height);
			// this.nameText.x = this.nameBg.x + this.nameBg.width/2;
		});

		this.velocity = new Phaser.Math.Vector2();
		this.arbitraryLockTimer = 0;

		this._selected = false;
		this._dragged = false;
		this.subselected = false;
		this.importance = 0;

		this.bindInteractive(this.circle, true);
	}


	onDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		super.onDown(pointer, localX, localY, event);
		this.emit("hold");
	}

	onUp(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) {
		if (this.hold && !this.blocked) {
			this.selected = !this._selected;
			this.hold = false;
		}

		// Parent
		// if (this.hold) {
			// this.hold = false;
			// this.emit('click');
		// }
	}

	onDragStart(pointer, dragX, dragY) {
		this.dragOffsetX = this.x;
		this.dragOffsetY = this.y;
		this._dragX = pointer.x;
		this._dragY = pointer.y;
	}

	onDrag(pointer, dragX, dragY) {
		if (this.hold && (Math.abs(pointer.x - this._dragX) > 20 || Math.abs(pointer.y - this._dragY) > 20)) {
			this.hold = false;
		}
		this._dragged = true;
		this.goalX = dragX + this.dragOffsetX;
		this.goalY = dragY + this.dragOffsetY;
	}

	onDragEnd(pointer, dragX, dragY, dropped) {
		this._dragged = false;
	}


	update(time, delta) {
		// Gravity
		let gravityStrength = (1 / this.config.gravity) * this.config.mode;
		let towardCenter = this.config.center.clone();
		towardCenter.add(this.config.centerOffset);
		towardCenter.subtract(this);
		towardCenter.x *= 0.85 * gravityStrength;
		towardCenter.y *= 2.1 * gravityStrength;
		this.velocity.add(towardCenter);

		// Group
		let groupStrength = (1 / this.config.groupStrength) * (1 - this.config.mode);
		let towardGroup = this.config.groupPositions[this.species.group].clone();
		towardGroup.add(this.config.centerOffset);
		towardGroup.y += 7*Math.sin(time/1500+towardGroup.x/400+towardGroup.y/1000);
		towardGroup.subtract(this);
		towardGroup.scale(groupStrength);
		this.velocity.add(towardGroup);

		// Movement
		this.arbitraryLockTimer -= delta;
		if (this.locked) {
			this.velocity.reset();
		}
		else if (this._dragged) {
			if (!this.hold) {
				this.x += (this.goalX - this.x) / 2.0;
				this.y += (this.goalY - this.y) / 2.0;
			}
			this.velocity.reset();
		}
		else {
			let maxVel = 30;
			let vel = this.velocity.length();
			// if (this.velocity.lengthSq() > maxVel * maxVel) {
				// this.velocity.setLength(maxVel);
			// }
			if (vel > 0) {
				this.velocity.scale((maxVel-maxVel*Math.exp(-vel/maxVel))/vel);
				this.x += this.velocity.x;
				this.y += this.velocity.y;
				this.velocity.scale(Math.pow(this.config.friction, 60*delta));
			}
		}

		// Keep within border
		if (!this.config.attractionMode && !this.locked) {
			if (this.x < this.config.borderLeft) {
				this.velocity.x += 0.1 * (this.config.borderLeft - this.x);
				// this.x = this.config.borderLeft;
				// this.velocity.x *= -1;
			}
			if (this.y < this.config.borderTop) {
				this.velocity.y += 0.1 * (this.config.borderTop - this.y);
				// this.y = this.config.borderTop;
				// this.velocity.y *= -1;
			}
			if (this.x > this.config.borderRight) {
				this.velocity.x -= 0.1 * (this.x - this.config.borderRight);
				// this.x = this.config.borderRight;
				// this.velocity.x *= -1;
			}
			if (this.y > this.config.borderBottom) {
				this.velocity.y -= 0.1 * (this.y - this.config.borderBottom);
				// this.y = this.config.borderBottom;
				// this.velocity.y *= -1;
			}
		}


		// Selected

		this.circle.fillColor = this.selected ? 0xFFFFFF : this.config.groupColors[this.species.group];
		// this.circle.setTint(this.selected ? 0xFFFFFF : this.config.groupColors[this.species.group]);
		this.circle.setAlpha(this.selected ? 1.0 : 0.4);
		if (!this.hasImage) {
			this.image.setTint(this.selected || this.subselected ? 0x000000 : 0xFFFFFF);
		}

		this.nameBg.setVisible(this.selected && !this.config.attractionMode);
		this.nameText.setVisible(this.selected && !this.config.attractionMode);
		if (this.selected && !this.config.attractionMode) {
			this.nameBg.y = (-this.size/2 - 24) * (this.y > 100 ? 1 : -1);
			this.nameText.y = this.nameBg.y;
		}

		// this.alpha += 0.1 * (this.alphaGoal - this.alpha);
		this.alpha += Phaser.Math.Clamp(this.alphaGoal - this.alpha, -4*delta, 4*delta);

		if (this.hyperLink) {
			this.hyperLink.updateCircle(
				this._selected ? 1.0 : 0.4,
				this.selected ? 1.0 : 0.4,
				this.selected ? 0xFFFFFF : this.config.groupColors[this.species.group]
			);
		}

		this.setScale(1 - 0.1 * this.holdSmooth);
	}


	move(dx: number, dy: number) {
		if (!this.locked && !this._dragged) {
			this.x += dx;
			this.y += dy;
		}
	}

	setAlphaGoal(value: number) {
		this.alphaGoal = value;
	}

	resetLock(): void {
		this.arbitraryLockTimer = 1.5 * (1 - Math.pow(Math.random(), 1.5));
		this._visibilityCache = 0;
		this._selected = false;
	}

	highlight(): void {
		this.circle.fillColor = 0xFFFFFF;
		this.circle.setAlpha(1.0);
	}

	highlightIucnColor(): void {
		this.circle.fillColor = this.config.iucnColors[this.species.iucn!];
		this.circle.setAlpha(1.0);
	}


	get selected(): boolean {
		return this._selected || this._dragged || this.hold || (this.hyperLink && this.hyperLink.hold);
	}

	set selected(value: boolean) {
		this.emit('onSelect', this, value);
		this._selected = value;
	}

	get locked(): boolean {
		return this.arbitraryLockTimer > 0;
	}

	// Hack to slowly fade in alpha during the start
	get visibility(): number {
		if (this._visibilityCache) {
			return this._visibilityCache * this.alpha;
		}
		// let borderMinDistance = Math.min(
			// this.x - this.config.borderLeft,
			// this.y - this.config.borderTop,
			// this.y - (-100),
			// this.config.borderRight - this.x,
			// this.config.borderBottom - this.y
		// );
		// when 0, it's 0/200 = 0
		// when 200, it's 200/200 = 1
		// let visibility = Phaser.Math.Clamp((borderMinDistance - 150) / 100, 0, 1);
		let visibility = Phaser.Math.Clamp(-this.arbitraryLockTimer, 0, 1);
		if (visibility >= 1) {
			this._visibilityCache = 1;
		}
		return visibility * this.alpha;
	}
}