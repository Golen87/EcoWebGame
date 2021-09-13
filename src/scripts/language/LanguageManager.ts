import { DataNode } from "../database/Interfaces";

const languageData = {

	"English": {
		"": "",

		"attraction_title": "Ecoweb",
		"attraction_heading": "KEEP THE ECOWEB IN BALANCE",
		"attraction_question_1": "What are the animals of Serengeti eating?",
		"attraction_question_2": "question 2?",
		"attraction_question_3": "question 3?",

		"info_welcome": "Welcome to",
		"info_title": "Ecoweb",
		"info_pitch": "Lorem ipsum do labore voluptate est cillum et sint sunt ea minim incididunt enim ut nisi ea voluptate consequat occaecat sint et dolore non id quis exercitation occaecat mollit in ut.",
		"info_how_1": "How do I use",
		"info_how_2": "Laboris adipisicing laboris excepteur occaecat in amet cillum qui eu quis eu.",
		"info_data_1": "Source for the data?",
		"info_data_2": "Voluptate labore magna consectetur exercitation deserunt sunt proident sed enim occaecat nulla proident veniam do laborum ut deserunt in id cupidatat dolore quis dolore anim culpa adipisicing enim ad nulla officia occaecat adipisicing qui.",
		"info_data_3": "",
		"info_who_1": "Who collected this data?",
		"info_who_2": "Dolor culpa consequat eiusmod sint sunt fugiat ut eiusmod eu sit dolor.",
		"info_who_3": "",
		"info_model_1": "What model was used?",
		"info_model_2": "Commodo ea officia adipisicing reprehenderit dolor adipisicing dolor proident proident non fugiat dolor adipisicing commodo ut amet.",
		"info_rights_1": "Any disclamation and explanation",
		"info_rights_2": "Exercitation ullamco consectetur mollit elit laborum duis labore cillum dolor dolore consectetur cillum dolor fugiat deserunt proident anim aliqua.",
		"info_qr": "Scan the QR code to\nview the instruction video\non your mobile device",
		"info_copyright": "Copyright @2021 Lutra Interactive. All right reserved.",

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

		"attraction_title": "Ecoweb",
		"attraction_heading": "HÅLL EKOSYSTEMET I BALANS",
		"attraction_question_1": "Vad äter djuren i Serengeti?",
		"attraction_question_2": "Vad händer om alla lejon i Serengeti dör?",
		"attraction_question_3": "Hur kan klimatförändringar påverka Serengetis näringsväv?",

		"info_welcome": "Välkommen till",
		"info_title": "Ecoweb",
		// "info_pitch": "Om en art i ett näringskedja förändras eller ges nya förutsättningar påverkas en hel kedja av arter och ett ekosystem kan få helt nya konsekvenser. Testa vad som händer och hur ett ekologiskt nätverk påverkas genom att förändra några avgörande parametrar. Kan du till exempel se vad som händer om alla lejon i Serengeti dör, och hur vi människor påverkar livet i Serengeti? Försök hålla väven i balans. Lycka till!",
		"info_pitch": "Vad händer i ett ekosystem när en art försvinner eller omgivningen förändras? En näringsväv beskriver vem som äter vem i ett ekosystem. Om en art ges nya levnadsförutsättningar påverkas en hel kedja av arter eftersom alla är beroende av varandra. Hur ser en näringsväv på savannen i Afrika ut?  Vem av alla djur har egentligen flest byten? Vad händer om alla lejon i Serengeti skulle dö ut? Och hur påverkar klimatförändringarna livet i Serengeti? Försök hålla ekosystemet i balans!",
		"info_how_1": "Hur använder jag",
		"info_how_2": "Bygg upp en mindre näringsväv genom att koppla ihop olika arter och få energin att flöda genom väven så alla arter mår bra. Genom att förändra levndasförutsättningarna för olika arter kan du se hur resten av ekosystemet påverkas. I det stora nätverket kan du markera olika arter och se vad de äter och vem som äter dem.",
		"info_data_1": "Vilken data finns här?",
		"info_data_2": "Det här datasetet beskriver en näringsväv bestående av växter och däggdjur i Serengeti i östra Afrika. Datat publicerades av forskare i en vetenskaplig tidskrift år 2011(REF). Den stora näringsväven som beskrivs består av 161 arter (129 växter, 23 herbivorer och 9 karnivorer) och 592 länkar mellan arterna som beskriver vem som äter vem. Dessutom används i installationen mindre delar av näringsväven för att simulera hur arternas populationer förändras över tid om olika händelser inträffar.",
		"info_data_3": "Genom att beskriva ett ekosystem som ett nätverk kan vi visualisera hur energin flödar mellan olika arter och i och med det olika delar av ekosystemet samt hur olika arter påverkar varandra både direkt och indirekt, dvs i flera steg.",
		"info_who_1": "Vem har samlat in datan?",
		"info_who_2": "Baskerville, Edward B., Andy P. Dobson, Trevor Bedford, Stefano Allesina, T. Michael Anderson, and Mercedes Pascual. \"Spatial guilds in the Serengeti food web revealed by a Bayesian group model.\" PLoS computational biology 7, no. 12 (2011): e1002321.",
		"info_who_3": "Forskarna använde sig av 14 olika andra forskningsartiklar som tittat på olika arter i Serengeti och vad de äter. Utifrån den informationen kunde forskarna sätta samman det här större nätverket.",
		"info_model_1": "Vilken modell har använts?",
		"info_model_2": "För att simulera hur arternas populationer förändras över tid generaliserad Lotka-Volterra ekvationen.",
		"info_rights_1": "Om rättigheterna",
		"info_rights_2": "Exercitation ullamco consectetur mollit elit laborum duis labore cillum dolor dolore consectetur cillum dolor fugiat deserunt proident anim aliqua.",
		"info_qr": "Dolor quis consectetur\nut amet laborum nulla\nsunt labore sit.",
		"info_copyright": "Copyright @2021 Lutra Interactive. All right reserved.",

		"title": "Serengeti näringsväv",
		"next_button": "Gå vidare",

		"instruction_0": "Tryck på en art för att se dess näringsväv",
		"instruction_1": "Bygg en näringskedja genom att placera växter och djur",
		"instruction_2": "Lägg till fler arter i näringskedjan för att bygga en näringsväv",
		"instruction_3": "Ut id cupidatat sunt exercitation reprehenderit duis aliquip dolor aliquip labore.",
		"instruction_4": "Prova att bort växter och djur för att see hur de påverkar varandra",

		"explanation_1a": "Du har byggt en näringskedja!",
		"explanation_1b": "Energi flödar från växter till växtätare och sedan till köttätare",
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
		this.currentLanguage = "Swedish";
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