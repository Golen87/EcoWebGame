import { DataScenario } from "../database/Interfaces";
import { NodeType } from "../database/Enums";
import { NodeId, ScenarioId, Point } from "../database/Types";
import { Animal, Plant, Fungi, Abiotic, Service } from "./Organism";
import { Organism } from "./Organism";
import { database } from "../database/Database";

export class Scenario {
	public id: ScenarioId;
	public name: string;
	public budget: number;
	public budgetReward: number;
	public research: number;
	public researchReward: number;
	public description: string;
	public stars: number;
	public cameraPos: Point;
	public sunlight: number;
	public territory: number;

	public species: Organism[];
	public speciesMap: Map<NodeId, Organism>;

	// public conditions: any;
	// public deltaTime: any;
	// public fastSpeed: any;
	// public maxTime: any;
	// public playSpeed: any;
	// public sectionCount: any;
	// public sectionLength: any;
	// public sections: any;
	// public timeIntro: any;
	// public timeOutro: any;

	constructor(scenario: DataScenario) {
		// Scenario data
		this.id = scenario.scenarioId;
		this.name = scenario.name;
		this.budget = scenario.budget;
		this.budgetReward = scenario.budgetReward;
		this.research = scenario.research;
		this.researchReward = scenario.researchReward;
		this.description = scenario.description;
		this.cameraPos = scenario.position;
		this.sunlight = scenario.sunlight;
		this.territory = scenario.territory;

		// this.deltaTime = scenario.time.deltatime; // Years
		// this.maxTime = scenario.time.intro + scenario.time.sections * scenario.time.length + scenario.time.outro;
		// this.timeIntro = scenario.time.intro;
		// this.timeOutro = scenario.time.outro;
		// this.sectionCount = scenario.time.sections;
		// this.sectionLength = scenario.time.length;
		// this.playSpeed = scenario.time.playspeed;
		// this.fastSpeed = scenario.time.fastspeed;
		// this.conditions = scenario.conditions;

		this.initNodes();
		this.initRelations();
		this.initTimeSections();
	}

	private initNodes() {
		this.species = [];
		this.speciesMap = new Map();

		for (let actor of database.getScenarioActors(this.id)) {
			let nodeData = database.getNode(actor.nodeId);
			if (nodeData) {
				let nodeClass = {
					[NodeType.Animal]:	Animal,
					[NodeType.Plant]:	Plant,
					[NodeType.Fungi]:	Fungi,
					[NodeType.Abiotic]:	Abiotic,
					[NodeType.Service]:	Service,
				}[nodeData.type];

				let node = new nodeClass(nodeData, actor);

				this.species.push(node);
				this.speciesMap.set(node.id, node);
			}
		}
	}

	private initRelations() {
		for (let node of this.species) {
			for (let relation of database.getNodePredRelations(node.id)) {
				let prey = this.speciesMap.get(relation.preyId);
				if (prey) {
					node.addToDiet(prey, relation);
				}
			}
		}
	}

	private initTimeSections() {
		// this.sections = [];
		// let t = this.timeIntro;
		// this.sections.push({ start: 0, end: this.timeIntro });
		// for (let i = 0; i < this.sectionCount; i++) {
		// 	this.sections.push({
		// 		start: t,
		// 		end: t + this.sectionLength
		// 	});
		// 	t += this.sectionLength;
		// }
		// this.sections.push({ start: this.maxTime - this.timeOutro, end: this.maxTime });
	}
}