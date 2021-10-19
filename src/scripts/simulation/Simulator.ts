import { DataScenario } from "../database/Interfaces";
import { Scenario } from "./Scenario";
import { Organism } from "./Organism";
import { SIMULATION_LENGTH } from "../constants";
import * as numeric from "numeric";

interface DataHistory {
	x: number[];
	y: number[][];
}

interface DataRelation {
	index: number;
	value: number;
}

class Simulator {
	public scenario: Scenario;
	public population: number[];
	public history: DataHistory;
	public time: number;
	public sol: numeric.Dopri;

	private growthRate: number[];
	private interactionMatrix: number[][];
	// private carryingCapacity: number[];
	private relationMap: any;

	private extraGrowthRate: number[];
	private extraInteractionMatrix: number[][];
	private extraFactor: number;

	constructor() {}

	loadScenario(scenarioData: DataScenario): void {
		this.scenario = new Scenario(scenarioData);

		this.time = 0;
		this.history = {x:[], y:[]};
		this.population = [];
		this.growthRate = [];
		// this.carryingCapacity = [];
		this.interactionMatrix = [];
		this.relationMap = {};
		this.extraGrowthRate = [];
		this.extraInteractionMatrix = [];
		this.extraFactor = 0;

		const L = this.species.length;

		// Init arrays for x, r, alpha
		for (let i = 0; i < L; i++) {
			this.population[i] = 0;

			// this.growthRate[i] = (this.species[i].type == 'animal') ? -0.1 : 1;
			this.growthRate[i] = [1.0, -0.1, -0.02][this.species[i].category]
			this.extraGrowthRate[i] = 0;

			// this.carryingCapacity[i] = (this.species[i].type == 'plant') ? 2 : 1;
			// this.carryingCapacity[i] = 1;

			this.interactionMatrix[i] = [];
			this.extraInteractionMatrix[i] = [];
			this.relationMap[i] = [];

			for (let j = 0; j < L; j++) {
				// Update this in `addOrRemove`
				this.interactionMatrix[i][j] = 0;
				this.extraInteractionMatrix[i][j] = 0;

				let pref = this.getRelationPref(i, j);
				if (pref > 0) {
					this.relationMap[i].push({
						index: j,
						value: pref
					});
				}
			}

			// Self competition
			this.interactionMatrix[i][i] = -1;

			// Sort relations by size
			this.relationMap[i].sort((a, b) => (a.value < b.value) ? 1 : -1);
		}

		this.solve(0, 1);
	}

	getRelationPref(predIndex: number, preyIndex: number): number {
		for (let relation of this.species[predIndex].diet) {
			if (relation.prey.id == this.species[preyIndex].id) {
				return relation.preference;
			}
		}
		return 0;
	}

	addOrRemoveSpecies(species: Organism, active: boolean, growthChange: number): void {
		let index = this.species.findIndex(x => x.id == species.id);

		if (active) {
			// this.population[index] = (species.type == 'animal') ? 0.01 : 0.1;
			this.population[index] = DEATH_THRESHOLD;
			// this.extraGrowthRate[index] = (species.type == 'plant') ? -0.5 : 0.0;
			this.extraGrowthRate[index] = growthChange ?? 0.0;
		}
		else {
			this.population[index] = 0;
		}
	}

	changeGrowthRate(species: Organism, value: number): void {
		let index = this.species.findIndex(x => x.id == species.id);

		// if ((value == 1 && this.growthRate[index] > 0) || (value == -1 && this.growthRate[index] < 0)) {
		if (value == 1) {
			this.interactionMatrix[index][index] /= 2;
		}
		else {
			this.interactionMatrix[index][index] *= 2;
		}
	}

	setTempEffect(value: number): void {
		this.extraFactor = Phaser.Math.Clamp(value, 0, 1);
	}

	reset(): void {
		this.time = 0;
		this.history = {x:[], y:[]};

		for (let i = 0; i < this.species.length; i++) {
			this.population[i] = 0;
			this.interactionMatrix[i][i] = -1;
		}
	}

	run(startTime: number): void {
		this.updateInteractions();
		this.solve(startTime, SIMULATION_LENGTH);
	}

	updateInteractions(): void {
		const L = this.species.length;

		// Reset interactions
		for (let i = 0; i < L; i++) {
			for (let j = 0; j < L; j++) {
				if (i != j) {
					this.interactionMatrix[i][j] = this.extraFactor * this.extraInteractionMatrix[i][j];
				}
			}
		}

		// Set interactions
		for (let i = 0; i < L; i++) {
			if (true || this.population[i] > 0) {

				// Points to distribute
				let weights = [1.0, 0.4, 0.2];

				for (const rel of this.relationMap[i]) {
					let j = rel.index;

					// Stop lions from eating themselves
					if (i == j) {
						continue;
					}

					if (this.population[j] > 0) {
						let value = weights.shift() ?? 0;
						this.interactionMatrix[i][j] += value;
						this.interactionMatrix[j][i] -= value;
					}
					else if (this.population[j] <= 0) {
						this.interactionMatrix[i][j] += 0.5;
						this.interactionMatrix[j][i] -= 0.5;
					}
				}
			}
		}
	}


	solve(startTime: number, duration: number): void {
		console.log("> Solving", startTime.toFixed(0), "-", (startTime+duration).toFixed(0));

		// ODE Solver
		let start = startTime;
		let end = start + duration;
		// let population = this.getPopulationAt(startTime);
		let population = this.population;
		// console.log(population, this.population, this.sol);

		this.sol = numeric.dopri(start, end, population, this.getDerivative.bind(this), 1e-6, 2000);
		this.population = [...this.sol.y[this.sol.y.length-1]]; // Copy
		this.time = end;

		// Discard history that'll be overwritten
		for (let i = 0; i < this.history.x.length; i++) {
			if (this.history.x[i] > start) {
				this.history.x.splice(i);
				this.history.y.splice(i);
				break;
			}
		}

		this.history.x = this.history.x.concat(this.sol.x);
		this.history.y = this.history.y.concat(this.sol.y);
	}

	// Lotka-Volterra equation (classical model for predator-prey interaction)
	// t: time
	// x: population at time t
	getDerivative(time: number, pop: number[]): number[] {
		let dPop: number[] = [];
		for (let i = 0; i < pop.length; i++) {

			// Sum of all interactions on species i
			let sum = 0;
			for (let j = 0; j < pop.length; j++) {
				sum += this.interactionMatrix[i][j] * pop[j];
			}

			// dPop[i] = this.growthRate[i] * pop[i] * (1 - sum / this.carryingCapacity[i]);
			const r = this.growthRate[i] + this.extraFactor * this.extraGrowthRate[i];
			dPop[i] = pop[i] * (r + sum);
		}
		return dPop;
	}


	getPopulationAt(time: number): number[] {
		if (!this.sol || time >= this.time) {
			return this.population;
		}
		else if (time <= this.sol.x[0]) {
			return this.sol.y[0];
		}
		else {
			return this.sol.at(time);
		}
	}

	getGrowthRate(i: number): number {
		return this.growthRate[i];
	}

	getInteractionStrength(i: number, j: number): number {
		return this.interactionMatrix[i][j];
	}

	getExtraGrowthRate(i: number): number {
		return this.extraGrowthRate[i];
	}

	getExtraInteractionStrength(i: number, j: number): number {
		return this.extraInteractionMatrix[i][j];
	}

	incGrowthRate(i: number, value: number): void {
		this.extraGrowthRate[i] += value;
		this.extraGrowthRate[i] = Phaser.Math.Clamp(this.extraGrowthRate[i], -1, 1);
	}

	incInteractionStrength(i: number, j: number, value: number): void {
		this.extraInteractionMatrix[i][j] += value;
		this.extraInteractionMatrix[i][j] = Phaser.Math.Clamp(this.extraInteractionMatrix[i][j], -1, 1);
	}

	get species(): Organism[] { return this.scenario.species; }
}


let simulator = new Simulator();

export { simulator };