interface StoryNode {
	name: string;
	category: number;
	position: {
		x: number;
		y: number;
	};
	placed: boolean;
	growthChange?: number;
}

interface Story {
	chapter: number;
	key: string;
	next: string;
	prev: string;
	intro: string;
	outro?: string;
	persist?: boolean;
	disableGraph?: boolean;
	disableSimulation?: boolean;
	disablePlacing?: boolean;
	enableSlider?: boolean;
	species: StoryNode[];
}

interface Chapter {
	number: number;
	title: string;
	descriptions: string[];
	image: string;
}

const chapterData: { [key: number]: Chapter } = {
	1: {
		number: 1,
		title: "challenge_title_1",
		descriptions: ["challenge_desc_1"],
		image: ""
	},
	2: {
		number: 2,
		title: "challenge_title_2",
		descriptions: ["challenge_desc_2a", "challenge_desc_2b", "challenge_desc_2c"],
		image: ""
	},
};

const storyData: { [key: string]: Story; } = {
	"1a": {
		chapter: 1,
		key: "1a",
		next: "1b",
		prev: "network",
		intro: "1a_intro",
		outro: "1a_outro",
		disableGraph: true,
		disableSimulation: true,
		species: [
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.49, y: 0.15 },
				placed: false
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.62, y: 0.40 },
				placed: false
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.53, y: 0.65 },
				placed: false
			},
		]
	},
	"1b": {
		chapter: 1,
		key: "1b",
		next: "1c",
		prev: "1a",
		intro: "1b_intro",
		disablePlacing: true,
		species: [
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.53, y: 0.65 },
				placed: false
			},
		]
	},
	"1c": {
		chapter: 1,
		key: "1c",
		next: "1d",
		prev: "1b",
		intro: "1c_intro",
		outro: "1c_outro",
		persist: true,
		species: [
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.53, y: 0.65 },
				placed: true
			},
		]
	},
	"1d": {
		chapter: 1,
		key: "1d",
		next: "2a",
		prev: "1c",
		intro: "1d_intro",
		outro: "1d_outro",
		species: [
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.49, y: 0.15 },
				placed: true
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.62, y: 0.40 },
				placed: true
			},
			{
				name: "madoqua_kirkii",
				category: 1,
				position: { x: 0.38, y: 0.40 },
				placed: false
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.53, y: 0.65 },
				placed: true
			},
			{
				name: "allophylus_rubifolius",
				category: 0,
				position: { x: 0.27, y: 0.65 },
				placed: false
			},
			{
				name: "eustachys_paspaloides",
				category: 0,
				position: { x: 0.75, y: 0.65 },
				placed: false
			},
		]
	},
	"2a": {
		chapter: 2,
		key: "2a",
		next: "2b",
		prev: "1d",
		intro: "2a_intro",
		outro: "2a_outro",
		enableSlider: false,
		species: [
			{
				name: "crocuta_crocuta",
				category: 2,
				position: { x: 0.39, y: 0.15 },
				placed: false
			},
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.63, y: 0.15 },
				placed: true
			},

			{
				name: "kobus_ellipsiprymnus",
				category: 1,
				position: { x: 0.18, y: 0.40 },
				placed: false
			},
			{
				name: "aepyceros_melampus",
				category: 1,
				position: { x: 0.38, y: 0.40 },
				placed: false
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.58, y: 0.40 },
				placed: true
			},
			{
				name: "connochaetes_taurinus",
				category: 1,
				position: { x: 0.78, y: 0.40 },
				placed: false
			},

			{
				name: "acacia_tortilis",
				category: 0,
				position: { x: 0.25, y: 0.65 },
				placed: false,
				growthChange: -0.05
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.42, y: 0.65 },
				placed: true,
				growthChange: -0.2
			},
			{
				name: "themeda_triandra",
				category: 0,
				position: { x: 0.61, y: 0.65 },
				placed: false,
				growthChange: -0.3
			},
			{
				name: "eustachys_paspaloides",
				category: 0,
				position: { x: 0.82, y: 0.65 },
				placed: false,
				growthChange: -0.4
			},
		]
	},
	"2b": {
		chapter: 2,
		key: "2b",
		next: "2c",
		prev: "2a",
		intro: "2b_intro",
		outro: "2b_outro",
		enableSlider: true,
		species: [
			{
				name: "crocuta_crocuta",
				category: 2,
				position: { x: 0.39, y: 0.15 },
				placed: true
			},
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.63, y: 0.15 },
				placed: true
			},

			{
				name: "kobus_ellipsiprymnus",
				category: 1,
				position: { x: 0.18, y: 0.40 },
				placed: true
			},
			{
				name: "aepyceros_melampus",
				category: 1,
				position: { x: 0.38, y: 0.40 },
				placed: true
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.58, y: 0.40 },
				placed: true
			},
			{
				name: "connochaetes_taurinus",
				category: 1,
				position: { x: 0.78, y: 0.40 },
				placed: true
			},

			{
				name: "acacia_tortilis",
				category: 0,
				position: { x: 0.25, y: 0.65 },
				placed: true,
				growthChange: -0.1
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.42, y: 0.65 },
				placed: true,
				growthChange: -0.5
			},
			{
				name: "themeda_triandra",
				category: 0,
				position: { x: 0.61, y: 0.65 },
				placed: true,
				growthChange: -0.4
			},
			{
				name: "eustachys_paspaloides",
				category: 0,
				position: { x: 0.82, y: 0.65 },
				placed: true,
				growthChange: -0.7
			},
		]
	},
	"2c": {
		chapter: 2,
		key: "2c",
		next: "network",
		prev: "2b",
		intro: "2c_intro",
		outro: "2c_outro",
		enableSlider: true,
		species: [
			{
				name: "crocuta_crocuta",
				category: 2,
				position: { x: 0.39, y: 0.15 },
				placed: true
			},
			{
				name: "panthera_leo",
				category: 2,
				position: { x: 0.63, y: 0.15 },
				placed: true
			},

			{
				name: "kobus_ellipsiprymnus",
				category: 1,
				position: { x: 0.18, y: 0.40 },
				placed: true
			},
			{
				name: "aepyceros_melampus",
				category: 1,
				position: { x: 0.38, y: 0.40 },
				placed: true
			},
			{
				name: "equus_quagga",
				category: 1,
				position: { x: 0.58, y: 0.40 },
				placed: true
			},
			{
				name: "connochaetes_taurinus",
				category: 1,
				position: { x: 0.78, y: 0.40 },
				placed: true
			},

			{
				name: "acacia_tortilis",
				category: 0,
				position: { x: 0.25, y: 0.65 },
				placed: true,
				growthChange: -0.6
			},
			{
				name: "heteropogon_contortus",
				category: 0,
				position: { x: 0.42, y: 0.65 },
				placed: true,
				growthChange: -1.0
			},
			{
				name: "themeda_triandra",
				category: 0,
				position: { x: 0.61, y: 0.65 },
				placed: true,
				growthChange: -0.7
			},
			{
				name: "eustachys_paspaloides",
				category: 0,
				position: { x: 0.82, y: 0.65 },
				placed: true,
				growthChange: -0.9
			},
		]
	},
};

export {
	StoryNode,
	Story,
	storyData,
	chapterData
};