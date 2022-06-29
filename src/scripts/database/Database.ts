import { jordbrukData } from "./jordbrukData";
import { isPlainObject, uuidv4 } from "../utils";
import { language } from "../language/LanguageManager";
import { DatabaseStructure, DataNode, DataNodeAnimal, DataNodePlant, DataNodeService, DataNodeRelation, DataEvent, DataEventEffect, DataScenario, DataScenarioActor, DataScenarioAction } from "./Interfaces";
import { NodeType, AnimalFood, AnimalSize, PlantSize, PlantStem, PlantAge, ServiceCategory, RelationInteraction, ActorVisibility, ActionType, EffectMethod } from "./Enums";
import { NodeId, EventId, ScenarioId, Point } from "./Types";
import { DATABASE_VERSION, DATABASE_LOCKED, UNIVERSEUM } from "../constants";

class Database {
	private nodes: Map<NodeId, DataNode>;
	private nodeAnimals: Map<NodeId, DataNodeAnimal>;
	private nodePlants: Map<NodeId, DataNodePlant>;
	private nodeServices: Map<NodeId, DataNodeService>;

	private nodeRelations: Array<DataNodeRelation>;

	private events: Map<EventId, DataEvent>;
	private eventEffects: Map<EventId, Array<DataEventEffect>>;

	private scenarios: Map<ScenarioId, DataScenario>;
	private scenarioActors: Map<ScenarioId, Array<DataScenarioActor>>;
	private scenarioActions: Map<ScenarioId, Array<DataScenarioAction>>;

	constructor() {
		this.nodes = new Map();
		this.nodeAnimals = new Map();
		this.nodePlants = new Map();
		this.nodeServices = new Map();

		this.nodeRelations = new Array();

		this.events = new Map();
		this.eventEffects = new Map();

		this.scenarios = new Map();
		this.scenarioActors = new Map();
		this.scenarioActions = new Map();

		this.load();
	}


	/* Data management */

	importJSON(json: any): boolean {
		let data = JSON.parse(json);

		if (data.version == 4) {
			this.legacyImport(data);
		}
		else {
			console.error("Not implemented yet");
			// this.import(data);
		}

		return true;
	}

	exportJSON(prettyprint: boolean=false): string {
		// let data: DatabaseStructure = {
			// version: DATABASE_VERSION,
			// nodes: this.nodes,
			// scenarios: this.scenarios,
		// };
		// return JSON.stringify(data, undefined, prettyprint ? "\t" : undefined);
		return "";
	}

	load() {
		// let success = false;
		// let localdata = localStorage.getItem("database");
		// if (localdata && !DATABASE_LOCKED) {
		// 	success = this.importJSON(localdata);
		// }

		// if (!success) {
		// 	console.log("Loading default database");
		// 	import
		// }

		this.importJSON(jordbrukData);

		// this.save();

		this.nodes.forEach((node: DataNode, nodeId: NodeId) => {
			language.addNodeName(node);
		});
	}

	save() {
		// if (!DATABASE_LOCKED) {
		// 	localStorage.setItem("database", this.exportJSON());
		// }
	}

	newUuid(): string {
		return uuidv4();
	}


	/* Node */

	newNode(nodeId: NodeId): DataNode {
		let obj: DataNode = {
			nodeId,
			name: "New node",
			eng: "",
			swe: "",
			chi: "",
			group: 0,
			iucn: "",
			image: "",
			color: "",
			description: "",
			type: NodeType.Animal,
			notes: "",
		};
		this.addNode(obj);
		return obj;
	}

	addNode(obj: DataNode) {
		console.assert(!this.events.has(obj.nodeId));
		this.nodes.set(obj.nodeId, obj);
	}

	deleteNode(id: NodeId) {
		this.nodes.delete(id);
		this.nodeAnimals.delete(id);
		this.nodePlants.delete(id);
		this.nodeServices.delete(id);
		// Delete relations
	}

	getNode(id: NodeId): DataNode | undefined {
		let obj = this.nodes.get(id);
		console.assert(obj, "Could not find node with id '" + id + "'");
		return obj;
	}

	getAllNodes(): Map<NodeId, DataNode> {
		return this.nodes;
	}


	/* Node Animals */

	newNodeAnimal(id: NodeId): DataNodeAnimal {
		let obj: DataNodeAnimal = {
			size: AnimalSize.Medium,
			food: AnimalFood.Omnivore,
			consumption: 0,
			weight: 0,
			age: 0,
			offspring: 0,
		};
		this.addNodeAnimal(id, obj);
		return obj;
	}

	addNodeAnimal(id: NodeId, obj: DataNodeAnimal) {
		console.assert(!this.nodeAnimals.has(id));
		this.nodeAnimals.set(id, obj);
	}

	deleteNodeAnimal(id: NodeId) {
		this.nodeAnimals.delete(id);
	}

	getNodeAnimal(id: NodeId): DataNodeAnimal | undefined {
		let obj = this.nodeAnimals.get(id);
		console.assert(obj, "Could not find nodeAnimal with id '" + id + "'");
		return obj;
	}


	/* Node Plants */

	newNodePlant(id: NodeId): DataNodePlant {
		let obj: DataNodePlant = {
			size: PlantSize.Tree,
			stem: PlantStem.Woody,
			age: PlantAge.Perennial,
		};
		this.addNodePlant(id, obj);
		return obj;
	}

	addNodePlant(id: NodeId, obj: DataNodePlant) {
		console.assert(!this.nodePlants.has(id));
		this.nodePlants.set(id, obj);
	}

	deleteNodePlant(id: NodeId) {
		this.nodePlants.delete(id);
	}

	getNodePlant(id: NodeId): DataNodePlant | undefined {
		let obj = this.nodePlants.get(id);
		console.assert(obj, "Could not find nodePlant with id '" + id + "'");
		return obj;
	}


	/* Node Services */

	newNodeService(id: NodeId): DataNodeService {
		let obj: DataNodeService = {
			category: ServiceCategory.Support,
		};
		this.addNodeService(id, obj);
		return obj;
	}

	addNodeService(id: NodeId, obj: DataNodeService) {
		console.assert(!this.nodeServices.has(id));
		this.nodeServices.set(id, obj);
	}

	deleteNodeService(id: NodeId) {
		this.nodeServices.delete(id);
	}

	getNodeService(id: NodeId): DataNodeService | undefined {
		let obj = this.nodeServices.get(id);
		console.assert(obj, "Could not find nodeService with id '" + id + "'");
		return obj;
	}


	/* Node Relations */

	newNodeRelation(predId: NodeId, preyId: NodeId): DataNodeRelation {
		let obj: DataNodeRelation = {
			predId,
			preyId,
			interaction: RelationInteraction.Predation,
			preference: 100,
		};
		this.addNodeRelation(obj);
		return obj;
	}

	addNodeRelation(obj: DataNodeRelation) {
		this.getNode(obj.predId); // Check
		this.getNode(obj.preyId); // Check
		this.nodeRelations.push(obj);
	}

	deleteNodeRelation(obj: DataNodeRelation) {
		let index = this.nodeRelations.indexOf(obj, 0);
		if (index > -1) {
			this.nodeRelations.splice(index, 1);
		}
	}

	getNodeRelation(predId: NodeId, preyId: NodeId): DataNodeRelation | undefined {
		for (let relation of this.nodeRelations) {
			if (predId == relation.predId && preyId == relation.preyId) {
				return relation;
			}
		}
		return undefined;
	}

	getNodePredRelations(id: NodeId): DataNodeRelation[] {
		let result: DataNodeRelation[] = [];
		for (let relation of this.nodeRelations) {
			if (id == relation.predId) {
				result.push(relation);
			}
		}
		return result;
	}

	getNodePreyRelations(id: NodeId): DataNodeRelation[] {
		let result: DataNodeRelation[] = [];
		for (let relation of this.nodeRelations) {
			if (id == relation.preyId) {
				result.push(relation);
			}
		}
		return result;
	}


	/* Event */

	newEvent(eventId: EventId): DataEvent {
		let obj: DataEvent = {
			eventId,
			name: "New event",
			description: "",
			image: "",
			duration: 0,
			ownerId: undefined,
		};
		this.addEvent(obj);
		return obj;
	}

	addEvent(obj: DataEvent) {
		console.assert(!this.events.has(obj.eventId));
		this.events.set(obj.eventId, obj);
		this.eventEffects.set(obj.eventId, []);
	}

	deleteEvent(id: EventId) {
		this.events.delete(id);
		this.eventEffects.delete(id);
	}

	getEvent(id: EventId): DataEvent | undefined {
		let obj = this.events.get(id);
		console.assert(obj, "Could not find event with id '" + id + "'");
		return obj;
	}


	/* Event Effects */

	newEventEffect(id: EventId, nodeId: NodeId): DataEventEffect {
		let obj: DataEventEffect = {
			nodeId: nodeId,
			method: EffectMethod.Relative,
			value: 0,
		};
		this.addEventEffect(id, obj);
		return obj;
	}

	addEventEffect(id: EventId, obj: DataEventEffect) {
		this.getEvent(id); // Check
		this.eventEffects.get(id)!.push(obj);
	}

	deleteEventEffect(id: EventId, nodeId: NodeId) {
		this.getEvent(id); // Check
		let effects = this.eventEffects.get(id) || [];
		for (let index = 0; index < effects.length; index++) {
			if (nodeId == effects[index].nodeId) {
				effects.splice(index, 1);
				break;
			}
		}
	}

	getEventEffects(id: EventId): DataEventEffect[] {
		this.getEvent(id); // Check
		return this.eventEffects.get(id) || [];
	}


	/* Scenario */

	newScenario(scenarioId: ScenarioId): DataScenario {
		let obj: DataScenario = {
			scenarioId,
			name: "New scenario",
			budget: 0,
			budgetReward: 0,
			research: 0,
			researchReward: 0,
			description: "",
			stars: 0,
			position: {x:0, y:0},
			sunlight: 0,
			territory: 0,
		};
		this.addScenario(obj);
		return obj;
	}

	addScenario(obj: DataScenario) {
		console.assert(!this.scenarios.has(obj.scenarioId));
		this.scenarios.set(obj.scenarioId, obj);
		this.scenarioActors.set(obj.scenarioId, []);
		this.scenarioActions.set(obj.scenarioId, []);
	}

	deleteScenario(id: ScenarioId) {
		this.scenarios.delete(id);
		this.scenarioActors.delete(id);
		this.scenarioActions.delete(id);
	}

	getScenario(id: ScenarioId): DataScenario | undefined {
		let obj = this.scenarios.get(id);
		console.assert(obj, "Could not find scenario with id '" + id + "'");
		return obj;
	}


	/* Scenario Actors */

	newScenarioActor(id: ScenarioId, nodeId: NodeId): DataScenarioActor {
		let obj: DataScenarioActor = {
			nodeId,
			population: 0,
			visibility: ActorVisibility.Explored,
			position: {x:0, y:0},
			fixed: false,
		};
		this.addScenarioActor(id, obj);
		return obj;
	}

	addScenarioActor(id: ScenarioId, obj: DataScenarioActor) {
		this.getScenario(id); // Check
		this.scenarioActors.get(id)!.push(obj);
	}

	deleteScenarioActor(id: ScenarioId, nodeId: NodeId) {
		this.getScenario(id); // Check
		let actors = this.scenarioActors.get(id) || [];
		for (let index = 0; index < actors.length; index++) {
			if (nodeId == actors[index].nodeId) {
				actors.splice(index, 1);
				break;
			}
		}
	}

	getScenarioActors(id: ScenarioId): DataScenarioActor[] {
		this.getScenario(id); // Check
		return this.scenarioActors.get(id) || [];
	}


	/* Scenario Actions */

	newScenarioAction(id: ScenarioId, eventId: EventId): DataScenarioAction {
		let obj: DataScenarioAction = {
			eventId,
			type: ActionType.Player,
			time: 0,
			cost: 0,
		};
		this.addScenarioAction(id, obj);
		return obj;
	}

	addScenarioAction(id: ScenarioId, obj: DataScenarioAction) {
		this.getScenario(id); // Check
		this.scenarioActions.get(id)!.push(obj);
	}

	deleteScenarioAction(id: ScenarioId, eventId: EventId) {
		this.getScenario(id); // Check
		let actions = this.scenarioActions.get(id) || [];
		for (let index = 0; index < actions.length; index++) {
			if (eventId == actions[index].eventId) {
				actions.splice(index, 1);
				break;
			}
		}
	}

	getScenarioActions(id: ScenarioId): DataScenarioAction[] {
		this.getScenario(id); // Check
		return this.scenarioActions.get(id) || [];
	}


	/* Legacy import */

	legacyImport(data: any) {
		function load(obj, data, key, required) {
			if (typeof obj[key] === typeof data[key]) {
				obj[key] = data[key];
			}
			else if (!required && data[key] == null) {
				obj[key] = undefined;
			}
			else {
				console.warn(`(${key}): ${obj[key]} != ${data[key]}`);
			}
		}

		for (let nodeData of data.nodes) {
			let node = this.newNode(nodeData.id.toString());
			load(node, nodeData, "name", true);
			load(node, nodeData, "eng", false);
			load(node, nodeData, "swe", false);
			load(node, nodeData, "chi", false);
			load(node, nodeData, "group", true);
			load(node, nodeData, "iucn", false);
			load(node, nodeData, "image", true);
			load(node, nodeData, "color", true);
			load(node, nodeData, "type", true);

			// Animal properties
			if (node.type == NodeType.Animal) {
				console.assert(nodeData.animal, "Animal type node missing animal data");
				if (nodeData.animal) {
					let animal = this.newNodeAnimal(node.nodeId);

					console.assert(Object.values(AnimalFood).includes(nodeData.animal.food), "Unknown animal food");
					animal.food = nodeData.animal.food;
				}
			}

			// Plant properties
			if (node.type == NodeType.Plant) {
				console.assert(nodeData.plant, "Plant type node missing plant data");
				if (nodeData.plant) {
					let plant = this.newNodePlant(node.nodeId);

					console.assert(Object.values(PlantSize).includes(nodeData.plant.size), "Unknown plant size");
					console.assert(Object.values(PlantStem).includes(nodeData.plant.stem), "Unknown plant stem");
					console.assert(Object.values(PlantAge).includes(nodeData.plant.age), "Unknown plant age");
					plant.size = nodeData.plant.size;
					plant.stem = nodeData.plant.stem;
					plant.age = nodeData.plant.age;
				}
			}

			// Service properties
			if (node.type == NodeType.Service) {
				console.assert(nodeData.service, "Service type node missing service data");
				if (nodeData.service) {
					let service = this.newNodeService(node.nodeId);

					console.assert(Object.values(ServiceCategory).includes(nodeData.service.category), "Unknown service category");
					service.category = nodeData.service.category;
				}
			}
		}

		for (let nodeData of data.nodes) {
			if (nodeData.relations) {
				for (let relationData of nodeData.relations) {
					let predId = nodeData.id.toString();
					let preyId = relationData.node_id.toString();
					let relation = this.newNodeRelation(predId, preyId);

					console.assert(Object.values(RelationInteraction).includes(relationData.interaction), "Unknown relation interaction");
					relation.interaction = relationData.interaction;
					if (relationData.preference != null) {
						relation.preference = parseInt(relationData.preference);
					}
				}
			}
		}

		for (let scenarioData of data.scenarios) {
			let scenario = this.newScenario(scenarioData.id.toString());
			load(scenario, scenarioData, "name", true);

			for (let actorData of scenarioData.actors) {
				let nodeId = actorData.node_id.toString();
				let actor = this.newScenarioActor(scenario.scenarioId, nodeId);
				// actor.population, actor.visibility, actor.position, actor.fixed
			}
		}

	}
}


let database: Database = new Database();

export { database };