/* Interface */

interface Asset {
	key: string;
	path: string;
}


/* Images */

import bg_serengeti from "../../assets/serengeti/backgrounds/serengeti-blur.png";
import bg_serengeti_preview from "../../assets/serengeti/backgrounds/serengeti-preview.jpeg";
import bg_grass from "../../assets/serengeti/backgrounds/grass.png";

import map_africa from "../../assets/serengeti/icons/eco/icon-map-africa.png";
import globe_melting from "../../assets/serengeti/icons/eco/icon-globe-melting.png";
import qr_code from "../../assets/serengeti/icons/qr.png";
import gradient from "../../assets/serengeti/icons/gradient.png";

const images: Asset[] = [
	{ key: "bg_serengeti",			path: bg_serengeti },
	{ key: "bg_serengeti_preview",	path: bg_serengeti_preview },
	{ key: "bg_grass",				path: bg_grass },

	{ key: "map-africa",			path: map_africa },
	{ key: "globe-melting",			path: globe_melting },
	{ key: "qr-code",				path: qr_code },
	{ key: "gradient",				path: gradient },
];


/* Spritesheets */

import species_128 from "../../assets/serengeti/nodes/species_128.png";
import icons_64 from "../../assets/serengeti/icons_64.png";

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