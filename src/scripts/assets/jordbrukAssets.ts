/* Interface */

interface Asset {
	key: string;
	path: string;
}


/* Images */

import bg_jordbruk from "../../assets/jordbruk/backgrounds/field-blur.png";
import bg_grass from "../../assets/jordbruk/backgrounds/grass.png";

import map_sweden from "../../assets/jordbruk/icon-map-sweden.png";
import globe_melting from "../../assets/jordbruk/icon-globe-melting.png";
import qr_code from "../../assets/jordbruk/qr.png";
import gradient from "../../assets/jordbruk/gradient.png";

import lutra_logo from "../../assets/jordbruk/lutra-logo.png";

const images: Asset[] = [
	{ key: "bg_jordbruk",			path: bg_jordbruk },
	{ key: "bg_grass",				path: bg_grass },

	{ key: "map-sweden",			path: map_sweden },
	{ key: "globe-melting",			path: globe_melting },
	{ key: "qr-code",				path: qr_code },
	{ key: "gradient",				path: gradient },

	{ key: "lutra_logo",			path: lutra_logo },
];


/* Spritesheets */

import species_128 from "../../assets/jordbruk/species_128.png";
import icons_64 from "../../assets/jordbruk/icons_64.png";

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