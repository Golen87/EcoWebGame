import { NodeId, EventId } from "../database/Types";
import { ActionType } from "../database/Enums";
import { DataEvent, DataScenarioAction } from "../database/Interfaces";
import { database } from "../database/Database";

export class BaseEvent {
	// Event data
	public id: EventId;
	public name: string;
	public description: string;
	public image: string;
	public duration: number;
	public ownerId?: NodeId;

	// Action data
	public type: ActionType;
	public time: number;
	public cost: number;

	// public autoTime: any;
	// public effects: any;
	// public enabled: any;

	constructor(event: DataEvent, action: DataScenarioAction) {
		// Event data
		this.id = event.eventId;
		this.name = event.name;
		this.description = event.description;
		this.image = event.image;
		this.duration = event.duration;
		this.ownerId = event.ownerId;

		// Action data
		this.type = action.type;
		this.time = action.time;
		this.cost = action.cost;

		/*
		this.id = event.id;
		this.name = event.name;
		this.description = event.description;
		this.image = event.image;
		this.duration = event.duration;
		this.ownerId = event.ownerId;

		this.type = action.type;
		this.cost = (this.type == "player") ? action.cost : null;
		this.autoTime = (this.type == "automatic") ? action.time : null;

		this.enabled = true;


		this.effects = scenario.[];

		for (const effect of event.effects) {
			for (const node of database.getAffectedNodes(effect)) {

				//const func = (effect.value / this.duration).toString() + " * t";
				const func = "t * t * (3 - 2*t)";

				this.effects.push({
					"nodeId": node.id,
					"method": effect.method,
					"value": effect.value,
					"duration": this.duration,
					// "derivative": math.derivative(func, "t").compile(),
				});
			}
		}
		*/
	}
}

// export class ActiveEvent {
// 	public event: any;
// 	public startTime: any;
// 	public endTime: any;
// 	public active: any;

// 	constructor(event, time) {
// 		this.event = event;
// 		this.startTime = time;
// 		this.endTime = time + event.duration;
// 		this.active = false;
// 	}

// 	setActive(value) {
// 		this.active = value;
// 	}
// }