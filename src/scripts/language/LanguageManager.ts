import { DataNode } from "../database/Interfaces";

const languageData = {

	"English": {
		"": "",

		"title": "Serengeti Food Web",
		"next_button": "Next",

		"instruction_0": "Press a species to see its food web",
		"instruction_1": "Build a food chain by placing the plants and animals",
		"instruction_2": "Now, expand the food chain with more species to build a food web",
		"instruction_3": "Ut id cupidatat sunt exercitation reprehenderit duis aliquip dolor aliquip labore.",
		"instruction_4": "Try to remove the plants and animals to see how they influence each other",

		"explanation_1a": "You have created a food chain!",
		"explanation_1b": "The energy flows from the plant to the herbivore to the carnivore",
		"explanation_2a": "You have created a food web!",
		"explanation_2b": "Animals prefer some food over other, which makes more energy flow that way",

		"popup_1": "Animals cannot survive without anything to eat!",
		"popup_2": "The grass absorbs energy from its surroundings.",
		"popup_3": "Zebror får sin näring från någonting...",

		"node_carnivore": "Carnivore",
		"node_herbivore": "Herbivore",
		"node_plant": "Plant",

		"chapter_1": "Food Web",
		"chapter_2": "Eco Challenge",
		"chapter_3": "Eco Mission",
		"chapter_4": "Eco Web",

		"slider_groups": "Layout:  Groups",
		"slider_links": "Links",

		"graph_population": "Population size",
		"graph_jan": "Jan",
		"graph_feb": "Feb",
		"graph_mar": "Mar",
		"graph_apr": "Apr",
		"graph_may": "May",
		"graph_jun": "Jun",
		"graph_jul": "Jul",
		"graph_aug": "Aug",
		"graph_sep": "Sep",
		"graph_oct": "Oct",
		"graph_nov": "Nov",
		"graph_dec": "Dec",

		"iucn_status": "Conservation status:",
		"iucn_EX": "Extinct",
		"iucn_EW": "Extinct in the wild",
		"iucn_CR": "Critically endangered",
		"iucn_EN": "Endangered",
		"iucn_VU": "Vulnerable",
		"iucn_NT": "Near threatened",
		"iucn_LC": "Least concern",
		"iucn_DD": "Data deficient",
		"iucn_NE": "Not evaluated",
	},

	"Swedish": {
		"": "",

		"title": "Serengeti näringsväv",
		"next_button": "Gå vidare",

		"instruction_0": "Tryck på en art för att se dess näringsväv",
		"instruction_1": "Bygg en näringskedja genom att placera plantor och djur",
		"instruction_2": "Lägg till fler arter i näringskedjan för att bygga en näringsväv",
		"instruction_3": "Ut id cupidatat sunt exercitation reprehenderit duis aliquip dolor aliquip labore.",
		"instruction_4": "Prova att bort plantor och djur för att see hur de påverkar varandra",

		"explanation_1a": "Du har byggt en näringskedja!",
		"explanation_1b": "Energi flödar från plantor till växtätare och sedan till köttätare",
		"explanation_2a": "Du har byggt en näringsväv!",
		"explanation_2b": "Djuren föredrar ibland viss mat över annan, vilket får mer energi att flöda mellan dem",

		"popup_1": "Djuren kan inte överleva utan någonting att äta!",
		"popup_2": "Gräset får sin näring från sin omgivning.",
		"popup_3": "Zebror får sin näring från någonting...",

		"node_carnivore": "Köttätare",
		"node_herbivore": "Växtätare",
		"node_plant": "Växt",

		"chapter_1": "Näringskedjor",
		"chapter_2": "Utmaningen",
		"chapter_3": "Uppdraget",
		"chapter_4": "Ekosystemet",

		"slider_groups": "Layout:  Grupper",
		"slider_links": "Relationer",

		"graph_population": "Populationsstorlek",
		"graph_jan": "jan",
		"graph_feb": "feb",
		"graph_mar": "mar",
		"graph_apr": "apr",
		"graph_may": "maj",
		"graph_jun": "jun",
		"graph_jul": "jul",
		"graph_aug": "aug",
		"graph_sep": "sep",
		"graph_oct": "okt",
		"graph_nov": "nov",
		"graph_dec": "dec",

		"iucn_status": "Bevarandestatus:",
		"iucn_EX": "Utdöd",
		"iucn_EW": "Utdöd i vilt tillstånd",
		"iucn_CR": "Akut hotad",
		"iucn_EN": "Starkt hotad",
		"iucn_VU": "Sårbar",
		"iucn_NT": "Nära hotad",
		"iucn_LC": "Livskraftig",
		"iucn_DD": "Kunskapsbrist",
		"iucn_NE": "Ej bedömd",
	}

};


interface BoundObject {
	key: string;
	previous: string;
	callback?: () => void;
}


class LanguageManager {
	private languageList: string[];
	private currentLanguage: string;
	private boundObjects: Map<Phaser.GameObjects.Text, BoundObject>;

	constructor() {
		this.languageList = ["English", "Swedish"];
		this.currentLanguage = "English";
		this.boundObjects = new Map();

		this.checkLanguageData();
	}

	// Check that all language keys are shared
	checkLanguageData(): void {
		let keyMap = {};
		for (let language of this.languageList) {
			for (let key in languageData[language]) {
				keyMap[key] = 1 + (keyMap[key] || 0);
			}
		}
		for (let key in keyMap) {
			if (keyMap[key] != 2) {
				console.error(`Phrase not found in all languages: ${key}`);
			}
		}
	}

	// Add names of all nodes to language database
	addNodeName(node: DataNode): void {
		languageData.English[node.nodeId] = node.eng || node.name;
		languageData.Swedish[node.nodeId] = node.swe || node.name;
		// languageData.Chinese[node.nodeId] = node.chi || node.name;
	}


	// Change language
	setLanguage(language: string): void {
		console.assert(this.languageList.includes(language) && languageData[language], "Language not available.");
		if (this.currentLanguage != language) {
			this.currentLanguage = language;
			this.updateAllObjects();
		}
	}

	// Return key-mapped phrase of current selected language
	get(key: string): string {
		let text = languageData[this.currentLanguage][key];
		console.assert(text != null, `Phrase not found in ${this.currentLanguage}: '${key}'`);
		return text;
	}

	// Bind a text-object to a phrase with automatic updates upon language change
	bind(textObject: Phaser.GameObjects.Text, key: string, callback?: () => void): void {
		// Remove old instance (usually when phrase is changed)
		this.unbind(textObject);

		this.boundObjects.set(textObject, { key, previous: "", callback });
		this.updateObject(textObject);
	}

	// Remove text-object from list of automatic text updates
	unbind(textObject: Phaser.GameObjects.Text): void {
		this.boundObjects.delete(textObject);
	}

	// Update text in all bound text-objects
	updateAllObjects(): void {
		this.boundObjects.forEach((value: BoundObject, key: Phaser.GameObjects.Text) => {
			this.updateObject(key);
		});
	}

	// Set text in a text-object to match its key in the current language
	updateObject(textObject: Phaser.GameObjects.Text): void {
		if (this.boundObjects.has(textObject)) {
			let blob = this.boundObjects.get(textObject)!;

			// Check that the text remains the same.
			let phraseCheck = (blob.previous == "" || blob.previous == textObject.text);
			console.assert(phraseCheck, `Phrase has changed since last bind. '${blob.key}': '${blob.previous}' != '${textObject.text}'`);
	
			let newText = this.get(blob.key);
			textObject.setText(newText);
			blob.previous = newText;

			if (blob.callback) {
				blob.callback();
			}
		}
	}
}

let language: LanguageManager = new LanguageManager();
language.setLanguage("Swedish");

export { language };