import { NodeId } from "../database/Types";
import { NodeType, AnimalFood, AnimalSize, PlantSize, PlantStem, PlantAge, ServiceCategory, RelationInteraction, ActorVisibility } from "../database/Enums";
import { DataNode, DataScenarioActor, DataNodeRelation } from "../database/Interfaces";
import { database } from "../database/Database";

export interface SimRelation {
	prey: Organism;
	interaction: RelationInteraction;
	preference: number;
};

export class Organism {
	// Node data
	public id: NodeId;
	public name: string;
	public group: string;
	public iucn?: string;
	public color: string;
	public image: string;
	public description: string;
	public type: NodeType;

	// Actor data
	public startPopulation: number;
	public x: number;
	public y: number;
	public visibility: ActorVisibility;
	public fixed: boolean;

	public diet: SimRelation[];
	public populationModifier: number;

	// public enable: any;
	// public show: any;

	constructor(node: DataNode, actor: DataScenarioActor) {
		// Node data
		this.id = node.nodeId;
		this.name = node.name;
		this.group = node.group; // Serengeti
		this.iucn = node.iucn; // Serengeti
		this.color = node.color;
		this.image = node.image;
		this.description = node.description;
		this.type = node.type;

		// Actor data
		this.startPopulation = actor.population;
		this.x = actor.position.x;
		this.y = actor.position.y;
		this.visibility = actor.visibility;
		this.fixed = actor.fixed;

		this.diet = [];

		
		// this.image = node.type == 'plant' ? "placeholder_plant" : node.image;

		// Simulation
		//this.growthRate = 0;
		//this.selfCompetition = 0;
		//this.popFunc = null;
		//this.popFuncDt = null;
		//this.carryingCapacity = 1000;


		// this.enable = (this.startPopulation > 0);
		//this.showGraph = (this.visibility == "explored");
		// this.show = false;
		


		/* Graph population modifier */

		this.populationModifier = 1;
	}

	// get showGraph() {
		// return !this.fixed;
	// }

	addToDiet(prey: Organism, relationData: DataNodeRelation) {
		let relation: SimRelation = {
			prey,
			interaction: relationData.interaction,
			preference: relationData.preference,
		};
		this.diet.push(relation);
	}

	// When a lot of species are present, preference goes to zero
	// normalizeDiet() {
	// 	let totalPreference = this.diet.reduce(
	// 		function(a: number, b: SimRelation): number {
	// 			return a + b.preference;
	// 		}, 0);
	// 	for (let relation of this.diet) {
	// 		relation.preference /= totalPreference;
	// 	}
	// }

	// requires(component, level) {
	// 	this.requirements[component.name] = level;
	// }


	/* Simulation */

	/*
	reset(dt) {
		this.dt = dt;
		this.length = Math.ceil(this.maxAge / dt);

		// Population integral
		this.pop = [];
		this.fertileChance = [];
		this.deathChance = [];
		this.starveChance = [];

		for (let time = 0; time <= this.length; time++) {
			//this.pop[time] = (time == 0) ? (this.enable * this.startPopulation) : 0;
			this.pop[time] = (this.enable * this.startPopulation) / (this.length + 1);
			this.fertileChance[time] = this.fertileFunction(time * dt);
			this.deathChance[time] = this.deathFunction(time * dt);
			this.starveChance[time] = this.starveFunction(time * dt);
		}

		// Temp
		this.fertileSuccess = 1.0;
	}

	// getFoodAvailability() {
	// 	let food = Math.pow(1 - Math.exp(-2 * (demand/supply)), 3);
	// 	return this.getTotalPop() * this.consumption;
	// }

	update(world, dt) {
		let born = 0;
		for (let time = 0; time <= this.length; time++) {
			//let dead = normalRandomSum(this.pop[time] * this.deathChance[time]);
			//this.pop[time] -= Math.min(this.pop[time], dead);

			//born += normalRandomSum(this.pop[time] * this.fertileChance[time] * this.fertileSuccess * dt * dt);
			born += this.pop[time] * this.fertileChance[time] * dt;
		}
		this.pop.unshift(born);
		if (born > 0) console.log(this.name, 'births', Math.round(born), this.fertileSuccess.toFixed(2));
		this.pop.splice(this.pop.length-1);
	}

	kill(amount, chance=1, reason="God") {
		let total = this.totalPopulation;
		if (total < 1) {
			this.exterminate();
		}

		if (total > 0 && amount * chance > 0) {
			console.log("{3} kills {1} ({2}%) of {0}".format(this.name, (amount*chance).toFixed(0), (amount*chance/total*100).toFixed(0), reason));
			//let survival = 0.1 * Math.exp(chance - 1);
			//amount = normalRandomSum(amount * chance);
			//amount = amount * chance;
			//console.log("{0} {1} starve".format(Math.round(amount), this.name));

			let sum = 0;
			for (let time = 0; time <= this.length; time++) {
				sum += this.pop[time] * this.starveChance[time];
			}

			let avg = Math.max(1, total / 10000);
			while (amount > 0.1) {
				let target = randReal(0, sum);
				let targetSum = 0;
				for (let time = 0; time <= this.length; time++) {
					targetSum += this.pop[time] * this.starveChance[time];
					if (target < targetSum) {
						let tbk = Math.min(this.pop[time], avg);
						this.pop[time] -= tbk;
						amount -= tbk;
						sum -= tbk * this.starveChance[time];
						break;
					}
				}
				if (targetSum == 0) {
					return;
				}
			}
		}
	}

	exterminate() {
		for (let time = 0; time <= this.length; time++) {
			this.pop[time] = 0;
		}
	}
	*/

	isPlant() { return false; }
	isAnimal() { return false; }
	isHerbivore() { return false; }
	isCarnivore() { return false; }

	get category(): number { return this.isPlant() ? 0 : this.isHerbivore() ? 1 : 2; }
}


export class Animal extends Organism {
	public size: AnimalSize;
	public food: AnimalFood;
	public consumption: number;
	public weight: number;
	public age: number;
	public offspring: number;

	constructor(node, actor) {
		super(node, actor);

		let animalData = database.getNodeAnimal(node.nodeId);
		console.assert(animalData);
		if (animalData) {
			this.size = animalData.size;
			this.food = animalData.food; // Not set in database
			this.consumption = animalData.consumption;
			this.weight = animalData.weight;
			this.age = animalData.age;
			this.offspring = animalData.offspring;
		}

		if (this.isCarnivore()) {
			// this.populationModifier = 100;
			this.populationModifier = 0.5;
		}
		else if (this.isHerbivore()) {
			// this.populationModifier = 1000;
			this.populationModifier = 0.9;
		}
	}

	isAnimal() { return true; }
	isHerbivore() { return this.food == AnimalFood.Herbivore; }
	isCarnivore() { return this.food == AnimalFood.Carnivore; }
}


export class Plant extends Organism {
	public size: PlantSize;
	public stem: PlantStem;
	public age: PlantAge;

	// growthrate = vatten x ljus x pollination
	constructor(node, actor) {
		super(node, actor);

		let plantData = database.getNodePlant(node.nodeId);
		console.assert(plantData);
		if (plantData) {
			this.size = plantData.size;
			this.stem = plantData.stem;
			this.age = plantData.age;
		}

		// this.populationModifier = 10;
		this.populationModifier = 1;
	}

	isPlant() { return true; }
}


export class Fungi extends Organism {
	constructor(node, actor) {
		super(node, actor);

		// ...
	}
}


export class Abiotic extends Organism {
	// private popFunc: any;
	// private popFuncDt: any;

	constructor(node, actor) {
		super(node, actor);

		// const func = actor.popfunc;

		// if (func) {
			// this.popFunc = math.compile(func);
			// this.popFuncDt = math.derivative(func, 't').compile();
			// this.startPopulation = this.popFunc.evaluate({t: 0});
		// }
	}
}


export class Service extends Organism {
	// private category: ServiceCategory;

	constructor(node, actor) {
		super(node, actor);

		// this.category = nodeService.category;
	}
}


class World {
	public sunlight: number;
	public water: number;
	public nutrients: number;

	constructor() {
		this.reset();
	}

	reset() {
		this.sunlight = 1000000;
		this.water = 0;
		this.nutrients = 0;
	}
}