import { DataNode } from "../database/Interfaces";
import swedishData from './sv.json';
import englishData from './en.json';


interface BoundObject {
	key: string;
	previous: string;
	callback?: () => void;
}


class LanguageManager {
	private languageList: string[];
	private languageData: Map<string, any>;
	private currentLanguage: string;
	private boundObjects: Map<Phaser.GameObjects.Text, BoundObject>;

	constructor() {
		this.languageList = ["English", "Swedish"];
		this.currentLanguage = "Swedish";
		this.boundObjects = new Map();

		this.setupLanguageData();
		this.checkLanguageData();
	}

	// Load data from imported jsons
	setupLanguageData(): void {
		this.languageData = new Map();
		this.languageData.set("Swedish", swedishData);
		this.languageData.set("English", englishData);

		for (let language of this.languageList) {
			this.languageData.get(language)[""] = "";
		}
	}

	// Check that all language keys are shared
	checkLanguageData(): void {
		let keyMap = {};
		for (let language of this.languageList) {
			for (let key in this.languageData.get(language)) {
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
		this.languageData.get("English")[node.nodeId] = node.eng || node.name;
		this.languageData.get("Swedish")[node.nodeId] = node.swe || node.name;
		// this.languageData.Chinese[node.nodeId] = node.chi || node.name;
	}


	// Change language
	setLanguage(language: string): void {
		console.assert(this.languageList.includes(language) && this.languageData.get(language), "Language not available.");
		if (this.currentLanguage != language) {
			this.currentLanguage = language;
			this.updateAllObjects();
		}
	}

	// Return key-mapped phrase of current selected language
	get(key: string): string {
		let text = this.languageData.get(this.currentLanguage)[key];
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

			if (textObject.scene === undefined) {
				console.warn("Attempting to update destroyed object:", blob.key);
				this.unbind(textObject);
				return;
			}

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