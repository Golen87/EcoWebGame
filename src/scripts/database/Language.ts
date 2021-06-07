import { NodeType, AnimalFood, AnimalSize, PlantLayer, PlantShade, ServiceCategory, RelationInteraction, ActorVisibility, ActionType, EffectMethod } from "./Enums";

export const english = {
	[NodeType.Animal]:					"Consumer (animal)",
	[NodeType.Plant]:					"Producer (plant)",
	[NodeType.Fungi]:					"Decomposer (detrivore)",
	[NodeType.Abiotic]:					"Abiotic (non-living)",
	[NodeType.Service]:					"Ecosystem services",

	[AnimalFood.Carnivore]:				"Carnivore",
	[AnimalFood.Omnivore]:				"Omnivore",
	[AnimalFood.Herbivore]:				"Herbivore",
	[AnimalFood.Detritivore]:			"Detritivore",

	[AnimalSize.Insignificant]:			"Insignificant (<0,05 kg)",
	[AnimalSize.Tiny]:					"Tiny (>0,05 kg)",
	[AnimalSize.Small]:					"Small (>0,5 kg)",
	[AnimalSize.Medium]:				"Medium (>5 kg)",
	[AnimalSize.Large]:					"Large (>40 kg)",
	[AnimalSize.Huge]:					"Huge (>500 kg)",
	[AnimalSize.Megafauna]:				"Megafauna (>1 000 kg)",
	[AnimalSize.Gigantic]:				"Gigantic (>5 000 kg)",

	[ServiceCategory.Support]:			"Support",
	[ServiceCategory.Provision]:		"Provision",
	[ServiceCategory.Regulation]:		"Regulation",
	[ServiceCategory.Culture]:			"Culture",

	[RelationInteraction.Mutualism]:	"(+,+) Mutualism",
	[RelationInteraction.Commensalism]:	"(+,o) Commensalism",
	[RelationInteraction.Predation]:	"(+,−) Predation",
	[RelationInteraction.Herbivory]:	"(+,−) Herbivory",
	[RelationInteraction.Parasitism]:	"(+,−) Parasitism",
	[RelationInteraction.Amensalism]:	"(o,−) Amensalism",
	[RelationInteraction.Competition]:	"(−,−) Competition",
	[RelationInteraction.Neutralism]:	"(o,o) Neutralism",

	[ActorVisibility.Explored]:			"■ Explored",
	[ActorVisibility.Explorable]:		"● Explorable",
	[ActorVisibility.Unexplored]:		"○ Unexplored",
	[ActorVisibility.Hidden]:			"Hidden",

	[ActionType.Player]:				"Purchasable",
	[ActionType.Automatic]:				"Automatic",

	[EffectMethod.Relative]:			"Relative",
	[EffectMethod.Target]:				"Target",
	[EffectMethod.Percentage]:			"Percentage",
};

export const swedish = {
	[NodeType.Animal]:					"Konsument",
	[NodeType.Plant]:					"Producent",
	[NodeType.Fungi]:					"Nedbrytare",
	[NodeType.Abiotic]:					"Abiotisk",
	[NodeType.Service]:					"Ekosystemtjänst",

	[AnimalFood.Carnivore]:				"Köttätare",
	[AnimalFood.Omnivore]:				"Allätare",
	[AnimalFood.Herbivore]:				"Växtätare",
	[AnimalFood.Detritivore]:			"Nedbrytare",
};