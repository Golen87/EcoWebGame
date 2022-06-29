/* Interface */

interface Asset {
	key: string;
	path: string;
}


/* Images */

import bg_sweden from "../../assets/sweden/background.png";
import bg_grass from "../../assets/sweden/grass.png";
import map from "../../assets/sweden/map.png";

const images: Asset[] = [
	{ key: "bg_sweden",	path: bg_sweden },
	{ key: "bg_grass",	path: bg_grass },
	{ key: "bg_map",	path: map },
];


/* Spritesheets */

import species_128 from "../../assets/sweden/species_128.png";
import icons_64 from "../../assets/sweden/icons_64.png";

interface SpriteSheet {
	key: string;
	path: string;
	width: number;
	height: number;
}
const spritesheets: SpriteSheet[] = [
	{ key: "species",	path: species_128,	width: 128,	height: 128 },
	{ key: "icons",		path: icons_64,		width: 64,	height: 64 },
];


/* Export */

const videos: Asset[] = [];

export {
	images,
	spritesheets,
	videos
};