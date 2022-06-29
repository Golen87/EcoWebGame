import { NodeType, AnimalFood, AnimalSize, PlantSize, PlantStem, PlantAge, ServiceCategory, RelationInteraction, ActorVisibility, ActionType, EffectMethod } from "./Enums";
import { NodeId, EventId, ScenarioId, Point } from "./Types";


/* Database */

export interface DatabaseStructure {
	"version": number,
	"nodes": DataNode[],
	"events": DataEvent[],
	"scenarios": DataScenario[],
	// "tags": this.customTags,
}


/* Node */

export interface DataNode {
	nodeId: NodeId;
	name: string; // Latin name
	eng?: string; // English name
	swe?: string; // Swedish name
	chi?: string; // Chinese name
	group: string; // Serengeti node group
	iucn?: string; // Serengeti conversation status
	image: string;
	color: string;
	description: string;
	type: NodeType;
	// tags: [],
	// "service": {
		// "category": null
	// },
	notes: string;
	// animal?: DataNodeAnimal;
	// service?: DataNodeService;
}

export interface DataNodeAnimal {
	size: AnimalSize;
	food: AnimalFood;
	consumption: number;
	weight: number;
	age: number;
	offspring: number;
}

export interface DataNodePlant {
	size: PlantSize;
	stem: PlantStem;
	age: PlantAge;
}

export interface DataNodeService {
	category: ServiceCategory;
}

export interface DataNodeRelation {
	predId: NodeId;
	preyId: NodeId;
	interaction: RelationInteraction;
	preference: number;
}


/* Event */

export interface DataEvent {
	eventId: EventId;
	name: string;
	description: string;
	image: string;
	duration: number;
	ownerId?: NodeId;
}

export interface DataEventEffect {
	nodeId: NodeId;
	method: EffectMethod;
	value: number;
}


/* Scenario */

export interface DataScenario {
	scenarioId: ScenarioId;
	name: string; // Scenario title
	// "time": {
		// "deltatime": 0.1,
		// "intro": 50,
		// "outro": 50,
		// "sections": 5,
		// "length": 40,
		// "playspeed": 5,
		// "fastspeed": 50,
	// },
	budget: number; // Budget for purchasing actions
	budgetReward: number; // Budget awarded each section
	research: number; // Research points for exploring nodes
	researchReward: number; // Research points awarded each section
	description: string; // Briefing message upon start
	stars: number; // Stars required to unlock the scenario
	position: Point; // Camera default position
	// conditions: { // Victory conditions for star-rewards
		// 0: {},
		// 1: {},
		// 2: {},
		// 3: {},
	// },
	sunlight: number;
	territory: number;
}

export interface DataScenarioActor {
	nodeId: NodeId;
	population: number;
	// popfunc?: string;
	visibility: ActorVisibility;
	position: Point;
	fixed: boolean;
}

export interface DataScenarioAction {
	eventId: EventId;
	type: ActionType;
	time: number;
	cost: number;
}