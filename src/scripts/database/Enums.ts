export enum NodeType {
	Animal = "animal",
	Plant = "plant",
	Fungi = "fungi",
	Abiotic = "abiotic",
	Service = "service"
}

export enum AnimalFood {
	Carnivore = "carnivore",
	Omnivore = "omnivore",
	Herbivore = "herbivore",
	Detritivore = "detritivore",
};

export enum AnimalSize {
	Insignificant = "insignificant",
	Tiny = "tiny",
	Small = "small",
	Medium = "medium",
	Large = "large",
	Huge = "huge",
	Megafauna = "megafauna",
	Gigantic = "gigantic",
};

export enum PlantLayer {
	Ground = 0, // Ground
	Herb = 1, // Herb (1m)
	Shrub = 5, // Shrub (5m)
	Understory = 10, // Understory (10m)
	Canopy = 30, // Canopy (30m)
};

export enum PlantShade {
	Partial = 0.25, // Partial (25%)
	Dappled = 0.50, // Dappled (50%)
	Full = 0.75, // Full (75%)
};

export enum ServiceCategory {
	Support = "support",
	Provision = "provision",
	Regulation = "regulation",
	Culture = "culture",
};

export enum RelationInteraction {
	Mutualism = "mutualism",
	Commensalism = "commensalism",
	Predation = "predation",
	Herbivory = "herbivory",
	Parasitism = "parasitism",
	Amensalism = "amensalism",
	Competition = "competition",
	Neutralism = "neutralism",
};

export enum ActorVisibility {
	Explored = "explored",
	Explorable = "explorable",
	Unexplored = "unexplored",
	Hidden = "hidden",
};

export enum ActionType {
	Player = "player",
	Automatic = "automatic",
};

export enum EffectMethod {
	Relative = "relative",
	Target = "target",
	Percentage = "percentage",
};