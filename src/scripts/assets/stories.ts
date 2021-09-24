interface StoryNode {
	name: string;
	fakeKey: string;
	position: {
		x: number;
		y: number;
	};
	placed: boolean;
}

interface Story {
	chapter?: number;
	key: string;
	next: string;
	intro: string;
	outro?: string;
	persist?: boolean;
	disableGraph?: boolean;
	disableSimulation?: boolean;
	disablePlacing?: boolean;
	enableSlider?: boolean;
	species: StoryNode[];
}

const storyData: { [key: string]: Story; } = {
	"1a": {
		chapter: 1,
		key: "1a",
		next: "1b",
		intro: "1a_intro",
		outro: "1a_outro",
		disableGraph: true,
		disableSimulation: true,
		species: [
			{
				name: "panthera_leo",
				fakeKey: "node_carnivore",
				position: { x: 0.49, y: 0.15 },
				placed: false
			},
			{
				name: "equus_quagga",
				fakeKey: "node_herbivore",
				position: { x: 0.62, y: 0.40 },
				placed: false
			},
			{
				name: "heteropogon_contortus",
				fakeKey: "node_plant",
				position: { x: 0.53, y: 0.65 },
				placed: false
			},
		]
	},
	"1b": {
		key: "1b",
		next: "1c",
		intro: "1b_intro",
		disablePlacing: true,
		species: [
			{
				name: "panthera_leo",
				fakeKey: "node_carnivore",
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				fakeKey: "node_herbivore",
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "heteropogon_contortus",
				fakeKey: "node_plant",
				position: { x: 0.53, y: 0.65 },
				placed: true
			},
		]
	},
	"1c": {
		key: "1c",
		next: "1d",
		intro: "1c_intro",
		outro: "1c_outro",
		persist: true,
		species: [
			{
				name: "panthera_leo",
				fakeKey: "node_carnivore",
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				fakeKey: "node_herbivore",
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "heteropogon_contortus",
				fakeKey: "node_plant",
				position: { x: 0.53, y: 0.65 },
				placed: true
			},
		]
	},
	"1d": {
		key: "1d",
		next: "2a",
		intro: "1d_intro",
		outro: "1d_outro",
		species: [
			{
				name: "panthera_leo",
				fakeKey: "node_carnivore",
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				fakeKey: "node_herbivore",
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "madoqua_kirkii",
				fakeKey: "node_herbivore",
				position: { x: 0.38, y: 0.40 },
				placed: false
			},
			{
				name: "heteropogon_contortus",
				fakeKey: "node_plant",
				position: { x: 0.53, y: 0.65 },
				placed: true
			},
			{
				name: "allophylus_rubifolius",
				fakeKey: "node_plant",
				position: { x: 0.27, y: 0.65 },
				placed: false
			},
			{
				name: "eustachys_paspaloides",
				fakeKey: "node_plant",
				position: { x: 0.75, y: 0.65 },
				placed: false
			},
		]
	},
	"2a": {
		chapter: 2,
		key: "2a",
		next: "network",
		intro: "2a_intro",
		outro: "2a_outro",
		enableSlider: true,
		species: [
			{
				name: "panthera_leo",
				fakeKey: "node_carnivore",
				position: { x: 0.63, y: 0.15 },
				placed: true
			},
			{
				name: "crocuta_crocuta",
				fakeKey: "node_carnivore",
				position: { x: 0.39, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				fakeKey: "node_herbivore",
				position: { x: 1-0.62, y: 0.40 },
				placed: true
			},
			{
				name: "connochaetes_taurinus",
				fakeKey: "node_herbivore",
				position: { x: 1-0.22, y: 0.40 },
				placed: true
			},
			{
				name: "aepyceros_melampus",
				fakeKey: "node_herbivore",
				position: { x: 1-0.42, y: 0.40 },
				placed: true
			},
			{
				name: "kobus_ellipsiprymnus",
				fakeKey: "node_herbivore",
				position: { x: 1-0.82, y: 0.40 },
				placed: true
			},
			{
				name: "themeda_triandra",
				fakeKey: "node_plant",
				position: { x: 1-0.39, y: 0.65 },
				placed: true
			},
			{
				name: "heteropogon_contortus",
				fakeKey: "node_plant",
				position: { x: 1-0.58, y: 0.65 },
				placed: true
			},
			{
				name: "eustachys_paspaloides",
				fakeKey: "node_plant",
				position: { x: 1-0.75, y: 0.65 },
				placed: true
			},
			{
				name: "acacia_tortilis",
				fakeKey: "node_plant",
				position: { x: 1-0.18, y: 0.65 },
				placed: true
			},
		]
	},
};

export {
	StoryNode,
	Story,
	storyData
};