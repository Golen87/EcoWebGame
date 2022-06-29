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
	next?: string;
	prev?: string;
	intro: string;
	middle?: string;
	outro?: string;
	persist?: boolean;
	disableGraph?: boolean;
	disableSimulation?: boolean;
	hintRemoval?: boolean;
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
	0: {
		number: 0,
		title: "map_title",
		descriptions: ["map_desc"],
		image: ""
	},
	1: {
		number: 1,
		title: "challenge_title_1",
		descriptions: ["challenge_desc_1"],
		image: ""
	},
	2: {
		number: 2,
		title: "challenge_title_2",
		descriptions: ["challenge_desc_2"],
		image: ""
	},
};

const storyData: { [key: string]: Story; } = {
	"1a": {
		chapter: 1,
		key: "1a",
		intro: "1a_intro",
		outro: "1a_outro",
		disableGraph: true,
		// disableSimulation: true,
		species: [
			{
				name: "rhopalosiphum_padi", // Havrebladlus
				category: 1,
				position: { x: 0.62, y: 0.38 },
				placed: false
			},
			{
				name: "hirundo_rustica", // Ladusvala
				category: 2,
				position: { x: 0.49, y: 0.13 },
				placed: false
			},
			{
				name: "avena_sativa", // Havre
				category: 0,
				position: { x: 0.53, y: 0.63 },
				placed: false
			},
		]
	},
	"1b": {
		chapter: 1,
		key: "1b",
		intro: "1b_intro",
		middle: "1c_intro",
		outro: "1c_outro",
		hintRemoval: true,
		species: [
			{
				name: "hirundo_rustica", // Ladusvala
				category: 2,
				position: { x: 0.49, y: 0.13 },
				placed: true
			},
			{
				name: "rhopalosiphum_padi", // Havrebladlus
				category: 1,
				position: { x: 0.62, y: 0.38 },
				placed: true
			},
			{
				name: "avena_sativa", // Havre
				category: 0,
				position: { x: 0.53, y: 0.63 },
				placed: false
			},
		]
	},
	"1d": {
		chapter: 1,
		key: "1d",
		intro: "1d_intro",
		outro: "1d_outro",
		persist: true,
		hintRemoval: true,
		species: [
			{
				name: "hirundo_rustica", // Ladusvala
				category: 2,
				position: { x: 0.49, y: 0.13 },
				placed: true
			},
			{
				name: "rhopalosiphum_padi", // Havrebladlus
				category: 1,
				position: { x: 0.62, y: 0.38 },
				placed: true
			},
			{
				name: "hydrellia_griseola", // Havrebladfluga
				category: 1,
				position: { x: 0.38, y: 0.38 },
				placed: false
			},
			{
				name: "malus_domestica", // Äppelträd
				category: 0,
				position: { x: 0.75, y: 0.63 },
				placed: false
			},
			{
				name: "avena_sativa", // Havre
				category: 0,
				position: { x: 0.53, y: 0.63 },
				placed: true
			},
			{
				name: "festuca_rubra", // Rödsvingel
				category: 0,
				position: { x: 0.27, y: 0.63 },
				placed: false
			},
		]
	},
	"3": {
		chapter: 3,
		key: "3",
		intro: "2a_intro",
		outro: "2a_outro",
		enableSlider: true,
		species: [
			{
				name: "deroceras_reticulatum", // Åkersnigel
				category: 1,
				position: { x: 0.39, y: 0.13 },
				placed: true
			},
			{
				name: "apoidea", // Bi
				category: 1,
				position: { x: 0.63, y: 0.13 },
				placed: true
			},

			{
				name: "lepidoptera", // Fjäril
				category: 1,
				position: { x: 0.18, y: 0.38 },
				placed: true
			},
			{
				name: "bombus", // Humla
				category: 1,
				position: { x: 0.38, y: 0.38 },
				placed: true
			},
			{
				name: "phyllotreta_vittula", // Kornjordloppa
				category: 1,
				position: { x: 0.58, y: 0.38 },
				placed: true
			},

			{
				name: "meligethes_aeneus", // Rapsbagge
				category: 0,
				position: { x: 0.25, y: 0.63 },
				placed: true,
				growthChange: -0.1
			},
			{
				name: "brassica_napus_ssp_napus", // Raps
				category: 0,
				position: { x: 0.42, y: 0.63 },
				placed: true,
				growthChange: -0.5
			},
			{
				name: "taraxacum", // Maskros 
				category: 0,
				position: { x: 0.61, y: 0.63 },
				placed: true,
				growthChange: -0.4
			},
		]
	},
};

const parts = ["1a", "1b", "1d", "3"];
for (let i = 0; i < parts.length; i++) {
	if (i+1 < parts.length)
		storyData[parts[i]].next = storyData[parts[i+1]].key;
	else
		storyData[parts[i]].next = "network";
	if (i-1 >= 0)
		storyData[parts[i]].prev = storyData[parts[i-1]].key;
	else
		storyData[parts[i]].prev = "network";
}

export {
	StoryNode,
	Story,
	storyData,
	chapterData
};
