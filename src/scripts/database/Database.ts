import { serengetiData } from "./serengetiData";
import { ecowebData } from "./ecowebData";
import { isPlainObject, uuidv4 } from "../utils";
import { language } from "../language/LanguageManager";
import { DatabaseStructure, DataNode, DataNodeAnimal, DataNodeService, DataNodeRelation, DataEvent, DataEventEffect, DataScenario, DataScenarioActor, DataScenarioAction } from "./Interfaces";
import { NodeType, AnimalFood, AnimalSize, PlantLayer, PlantShade, ServiceCategory, RelationInteraction, ActorVisibility, ActionType, EffectMethod } from "./Enums";
import { NodeId, EventId, ScenarioId, Point } from "./Types";
import { DATABASE_VERSION, DATABASE_LOCKED, UNIVERSEUM } from "../constants";

class Database {
	private nodes: Map<NodeId, DataNode>;
	private nodeAnimals: Map<NodeId, DataNodeAnimal>;
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

		// if (data && isPlainObject(data) && data.version == DATABASE_VERSION) {
			// this.loadNodes(data.nodes);
			// this.loadEvents(data.events);
			// this.loadScenarios(data.scenarios);
			// this.loadCustomTags(data.tags);

			//this.updateUniqueId();
		// }
		// else {
			// console.error("Ignore loading old database.");
			// return false;
		// }

		// this.nodes.sort(this.nodeCompare);
		return true;
	}

	exportJSON(prettyprint: boolean=false): string {
		// let data: DatabaseStructure = {
			// version: DATABASE_VERSION,
			// nodes: this.nodes,
			// events: this.events,
			// scenarios: this.scenarios,
			// tags: this.customTags,
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

		if (UNIVERSEUM) {
			this.importJSON(serengetiData);
		}
		else {
			this.importJSON(ecowebData);
		}

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
			if (node.type == NodeType.Animal && nodeData.animal) {
				let animal = this.newNodeAnimal(node.nodeId);

				console.assert(Object.values(AnimalFood).includes(nodeData.animal.food), "Unknown animal food");
				animal.food = nodeData.animal.food;
			}

			// Service properties
			if (node.type == NodeType.Service && nodeData.service) {
				let service = this.newNodeService(node.nodeId);

				console.assert(Object.values(ServiceCategory).includes(nodeData.service.category), "Unknown service category");
				service.category = nodeData.service.category;
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

		for (let eventData of data.events) {
			console.error("Unimplemented");
			// let newEvent = this.newEvent();
			// newEvent.eventId = eventData.id.toString();
			// this.addevent(newEvent);
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


	/* Nodes */

	// getNodesByTags(tags: any): DataNode[] {
	// 	let result: DataNode[] = [];
	// 	for (const node of this.nodes) {
	// 		if (this.hasTags(node, tags)) {
	// 			result.push(node);
	// 		}
	// 	}
	// 	return result;
	// }

	// hasTags(node: DataNode, otherTags: any): boolean {
	// 	let myTags = node.tags.slice();

	// 	if (node.type)
	// 		myTags.push("Type: " + getTextFromValue(NODE_TYPES, node.type));
	// 	if (node.animal.food)
	// 		myTags.push("Animal Diet: " + getTextFromValue(ANIMAL_FOODS, node.animal.food));
	// 	if (node.animal.size)
	// 		myTags.push("Animal Size: " + getTextFromValue(ANIMAL_SIZES, node.animal.size));
	// 	if (node.service.category)
	// 		myTags.push("Service Category: " + getTextFromValue(SERVICE_CATEGORIES, node.service.category));

	// 	for (const tag of otherTags) {
	// 		if (!myTags.includes(tag)) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	// cloneNode(id: NodeId): DataNode {
	// 	let clone = JSON.parse(JSON.stringify(this.getNode(id)));
	// 	if (clone) {
	// 		clone.id = this.newUuid();
	// 		clone.name = null;
	// 		return clone;
	// 	}
	// }

	/*
	nodeCompare(a: DataNode, b: DataNode): number {
		if (a.type != b.type) {
			if (NODE_TYPES_VALUES.indexOf(a.type) < NODE_TYPES_VALUES.indexOf(b.type)) {
				return -1;
			}
			if (NODE_TYPES_VALUES.indexOf(a.type) > NODE_TYPES_VALUES.indexOf(b.type)) {
				return 1;
			}
		}
		if (a.type == "animal") {
			if (ANIMAL_FOODS_VALUES.indexOf(a.animal.food) < ANIMAL_FOODS_VALUES.indexOf(b.animal.food)) {
				return -1;
			}
			if (ANIMAL_FOODS_VALUES.indexOf(a.animal.food) > ANIMAL_FOODS_VALUES.indexOf(b.animal.food)) {
				return 1;
			}
		// 	if (a.animal.weight > b.animal.weight) {
		// 		return -1;
		// 	}
		// 	if (a.animal.weight < b.animal.weight) {
		// 		return 1;
		// 	}
		}
		if (a.type == "service") {
			if (SERVICE_CATEGORIES_VALUES.indexOf(a.service.category) < SERVICE_CATEGORIES_VALUES.indexOf(b.service.category)) {
				return -1;
			}
			if (SERVICE_CATEGORIES_VALUES.indexOf(a.service.category) > SERVICE_CATEGORIES_VALUES.indexOf(b.service.category)) {
				return 1;
			}
		}
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	}
	*/

	// addRelation(id: NodeId, other: DataNode) {
	// 	let relation: DataNodeRelation = {
	// 		// "type": type,
	// 		"nodeId": null,
	// 		// "tags": [],
	// 		//"category": "",
	// 		"interaction": "",
	// 		"preference": 100,
	// 	};
	// 	this.nodeRelations.set(id, relation);
	// }

	// deleteRelation(node: DataNode, index: number) {
	// 	node.relations.splice(index, 1);
	// }

	// isAffected(relation: DataNodeRelation, node: DataNode): boolean {
	// 	if (relation && node) {
	// 		if (relation.type == "node") {
	// 			if (relation.nodeId == node.id) {
	// 				return true;
	// 			}
	// 		}
	// 		// TODO: Add animal data non-tag checking
	// 		// if (relation.type == "tags") {
	// 			// if (relation.tags.length > 0 && this.hasTags(node, relation.tags)) {
	// 				// return true;
	// 			// }
	// 		// }
	// 	}
	// 	return false;
	// }

	// getAffectedNodes(relation: DataNodeRelation): DataNode[] {
	// 	let results: DataNode[] = [];
	// 	for (const node of this.nodes) {
	// 		if (this.isAffected(relation, node)) {
	// 			results.push(node);
	// 		}
	// 	}
	// 	return results;
	// }

	// getIncomingRelations(node: DataNode): any {
	// 	let results: any = [];
	// 	for (const other of this.nodes) {
	// 		if (node.id != other.id) {

	// 			if (other.relations) {
	// 				for (const rel of other.relations) {

	// 					if (this.isAffected(rel, node)) {
	// 						results.push({
	// 							"node": other,
	// 							"relation": rel,
	// 						});
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return results;
	// }

	// getOutgoingRelations(node: DataNode) {
	// 	let results: any = [];
	// 	for (const other of this.nodes) {
	// 		if (node.id != other.id) {

	// 			if (node.relations) {
	// 				for (const rel of node.relations) {

	// 					if (this.isAffected(rel, other)) {
	// 						results.push({
	// 							"node": other,
	// 							"relation": rel,
	// 						});
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return results;
	// }

	// getRelationPreference(node: DataNode, relation: DataNodeRelation): number {
	// 	let total = 0;
	// 	for (const rel of node.relations) {
	// 		if (rel.preference) {
	// 			total += rel.preference;
	// 		}
	// 	}
	// 	return relation.preference / total;
	// }


	/* Events */

	// getEventsByOwner(id: EventId): DataEvent[] {
	// 	let results: DataEvent[] = [];
	// 	for (const event of this.events) {
	// 		if (event.owner_id == id) {
	// 			results.push(event);
	// 		}
	// 	}
	// 	return results;
	// }

	// cloneEvent(id: EventId): DataEvent {
	// 	let clone = JSON.parse(JSON.stringify(this.getEvent(id)));
	// 	if (clone) {
	// 		clone.id = this.newUuid();
	// 		clone.name = null;
	// 		return clone;
	// 	}
	// }

	// moveEvent(id: EventId, dir: number) {
		// this.moveObj(this.events, id, dir);
	// }

	// eventCompare(a: any, b: any): number {
	// 	if (a.name < b.name) {
	// 		return -1;
	// 	}
	// 	if (a.name > b.name) {
	// 		return 1;
	// 	}
	// 	return 0;
	// }

	// addEffect(event: DataEvent): DataEventEffect {
	// 	// if (!["node", "tags"].includes(type)) {
	// 		// console.error("Unknown relation type");
	// 		// return;
	// 	// }
	// 	let effect: DataEventEffect = {
	// 		// "type": type,
	// 		"nodeId": null,
	// 		// "tags": [],
	// 		"method": EffectMethod.Relative,
	// 		"value": 0
	// 	};
	// 	event.effects.push(effect);
	// 	return effect;
	// }

	// deleteEffect(event: DataEvent, index: number) {
	// 	event.effects.splice(index, 1);
	// }


	/* Scenarios */

	// cloneScenario(id: ScenarioId): DataScenario {
	// 	let clone = JSON.parse(JSON.stringify(this.getScenario(id)));
	// 	if (clone) {
	// 		clone.id = this.newUuid();
	// 		clone.name = null;
	// 		return clone;
	// 	}
	// }

	// moveScenario(id: ScenarioId, dir: number) {
		// this.moveObj(this.scenarios, id, dir);
	// }

	// scenarioCompare(a: DataScenario, b: DataScenario): number {
	// 	if (a.name < b.name) {
	// 		return -1;
	// 	}
	// 	if (a.name > b.name) {
	// 		return 1;
	// 	}
	// 	return 0;
	// }

	// Actor: node in a scenario
	// addActor(scenario: DataScenario): DataScenarioActor {
	// 	let actor: DataScenarioActor = {
	// 		"nodeId": null,
	// 		"population": 1,
	// 		"popfunc": "0.5",
	// 		"visibility": ActorVisibility.Explored,
	// 		"position": [0,0],
	// 		"fixed": false,
	// 	};
	// 	scenario.actors.push(actor);
	// 	return actor;
	// }

	// setActors(scenario: DataScenario, nodeList: string[]) {
	// 	// Save old data
	// 	let data = {};
	// 	for (const i in scenario.actors) {
	// 		let actor = scenario.actors[i];
	// 		data[actor.nodeId] = actor;
	// 	}
	// 	scenario.actors.splice(0, scenario.actors.length);

	// 	// Add new actors from list in order
	// 	for (const node of this.nodes) {
	// 		if (nodeList.includes(node.id)) {
	// 			let actor = this.addActor(scenario);
	// 			this.transferObject(data[node.id], actor);
	// 			actor.nodeId = node.id;
	// 		}
	// 	}
	// }

	// Action: event in a scenario
	// addAction(scenario: DataScenario): DataScenarioAction {
	// 	let action: DataScenarioAction = {
	// 		"eventId": null,
	// 		"type": ActionType.Player,
	// 		"time": 0,
	// 		"cost": 0,
	// 	};
	// 	scenario.actions.push(action);
	// 	return action;
	// }

	// setActions(scenario: DataScenario, eventList: string[]) {
	// 	// Save old data
	// 	let data = {};
	// 	for (const i in scenario.actions) {
	// 		let action = scenario.actions[i];
	// 		data[action.eventId] = action;
	// 	}
	// 	scenario.actions.splice(0, scenario.actions.length);

	// 	// Add new actions from list in order
	// 	for (const event of this.events) {
	// 		if (eventList.includes(event.id)) {
	// 			let action = this.addAction(scenario);
	// 			this.transferObject(data[event.id], action);
	// 			action.eventId = event.id;
	// 		}
	// 	}
	// }

	// setConditions(scenario: DataScenario, newConditions: any, activeList: any) {
	// 	for (const tier in scenario.conditions) {
	// 		scenario.conditions[tier] = {};

	// 		for (const id in newConditions[tier]) {
	// 			if (activeList[tier][id]) {
	// 				const range = newConditions[tier][id];
	// 				if (Array.isArray(range) && range[0] !== null && range[1] !== null) {
	// 					scenario.conditions[tier][id] = newConditions[tier][id];
	// 				}
	// 			}
	// 		}

	// 		scenario.conditions[tier].description = newConditions[tier].description;
	// 	}
	// }


	/* Tags */

	// parseTags(list: any) {
	// 	let result: any = [];
	// 	let occupied = this.getDefaultTags();
	// 	let allowSpace = false;

	// 	for (const tag of list) {
	// 		if ((!result.includes(tag) && !occupied.includes(tag)) || (tag == "" && allowSpace)) {
	// 			result.push(tag);

	// 			if (tag != "") {
	// 				allowSpace = true;
	// 			}
	// 		}
	// 	}

	// 	// Remove trailing spaces
	// 	while (result[result.length-1] == "") {
	// 		result.splice(result.length-1, 1);
	// 	}

	// 	return result;
	// }

	// // Check for removed tags that break nodes or relations
	// checkTagWarnings(list: any) {
	// 	return this.setCustomTags(list, false);
	// }

	// setCustomTags(list: any, overwrite: any=true) {
	// 	let warnings: any = [];
	// 	let extra = this.getDefaultTags();

	// 	// Remove legacy tags (should issue warning)
	// 	for (const node of this.nodes) {
	// 		let t = node.tags.length;
	// 		while (t--) {
	// 			let tag = node.tags[t];
	// 			if (!list.includes(tag)) {
	// 				warnings.push({tag, text: "removed from node", name: node.name});
	// 				if (overwrite) {
	// 					node.tags.splice(t, 1);
	// 				}
	// 			}
	// 		}

	// 		for (const rel of node.relations) {
	// 			let t = rel.tags.length;
	// 			while (t--) {
	// 				let tag = rel.tags[t];
	// 				if (!list.includes(tag) && !extra.includes(tag)) {
	// 					warnings.push({tag, text: "removed from relation in node", name: node.name});
	// 					if (overwrite) {
	// 						rel.tags.splice(t, 1);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	for (const event of this.events) {
	// 		for (const eff of event.effects) {
	// 			let e = eff.tags.length;
	// 			while (e--) {
	// 				let tag = eff.tags[e];
	// 				if (!list.includes(tag) && !extra.includes(tag)) {
	// 					warnings.push({tag, text: "removed from effect in event", name: event.name});
	// 					if (overwrite) {
	// 						eff.tags.splice(e, 1);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	if (overwrite) {
	// 		this.customTags.splice(0, this.customTags.length);
	// 		for (const tag of this.parseTags(list)) {
	// 			this.customTags.push(tag);
	// 		}

	// 		for (const warning of warnings) {
	// 			console.warn(warning.tag, warning.text, warning.name);
	// 		}
	// 	}

	// 	return warnings;
	// }

	// getCustomTags(removeEmpty: any=false) {
	// 	if (removeEmpty) {
	// 		return this.customTags.filter(Boolean);
	// 	}
	// 	return this.customTags;
	// }

	// getDefaultTags() {
	// 	let result: any = [];

	// 	function addCategory(list: any, name: any) {
	// 		result.push("");
	// 		for (const tag of list) {
	// 			result.push(name + ": " + tag.text);
	// 		}
	// 	}

	// 	addCategory(NODE_TYPES, "Type");
	// 	addCategory(ANIMAL_FOODS, "Animal Diet");
	// 	addCategory(ANIMAL_SIZES, "Animal Size");
	// 	addCategory(SERVICE_CATEGORIES, "Service Category");

	// 	return result;
	// }

	// getAllTags(customTags: any) {
	// 	let result = customTags.slice();
	// 	return result.concat(this.getDefaultTags());
	// }

	// loadCustomTags(list: any) {
	// 	if (list && Array.isArray(list)) {
	// 		this.setCustomTags(list);
	// 	}
	// }


	/* General actions */

	// moveObj(objs: any, id: UUID, dir: any) {
	// 	for (let i = objs.length-1; i >= 0; i--) {
	// 		if (objs[i].id == id && objs[i+dir]) {
	// 			let min = Math.min(i, i+dir);
	// 			let max = Math.max(i, i+dir);
	// 			objs.splice(min, 2, objs[max], objs[min]);
	// 			return;
	// 		}
	// 	}
	// }

	// Recursively copies data where keys match
	// transferObject(data: any, obj: any) {
	// 	if (!isPlainObject(data)) {
	// 		return;
	// 	}
	// 	for (const key in obj) {
	// 		if (data.hasOwnProperty(key)) {
	// 			if (isPlainObject(data[key])) {
	// 				this.transferObject(data[key], obj[key]);
	// 			}
	// 			else if ((typeof obj[key] === typeof data[key] || (!isNaN(obj[key]) && !isNaN(data[key]))) || obj[key] === null) {
	// 				obj[key] = data[key];
	// 			}
	// 			else {
	// 				console.warn("Type changed variable discarded:", obj[key], data[key]);
	// 			}
	// 		}
	// 	}
	// }
}


let database: Database = new Database();

export { database };