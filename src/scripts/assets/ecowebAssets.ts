import { prependPath } from "../utils";

interface Asset {
	key: string;
	path: string;
}

// { value: "blåbär",				text: "Blåbär.png" },
// { value: "daggmask",			text: "Daggmask.png" },
// { value: "detrius",				text: "Detrius.png" },
// { value: "dovhjort",			text: "Dovhjort.png" },
// { value: "duvhök",				text: "Duvhök.png" },
// { value: "fiskebåt",			text: "FiskeBåt.png" },
// { value: "gräs",				text: "Gräs.png" },
// { value: "hare",				text: "Hare.png" },
// { value: "hasselnöt",			text: "Hasselnöt.png" },
// { value: "havsfåglar",			text: "HavsFåglar.png" },
// { value: "havsfisk",			text: "HavsFisk.png" },
// { value: "havsutter",			text: "Havsutter.png" },
// { value: "jättekelp",			text: "Jättekelp.png" },
// { value: "kattuggla",			text: "Kattuggla.png" },
// { value: "kelpfisk",			text: "KelpFisk.png" },
// { value: "koltrast",			text: "Koltrast.png" },
// { value: "lo",					text: "Lo.png" },
// { value: "mussla",				text: "Mussla.png" },
// { value: "norvacka",			text: "Norvacka.png" },
// { value: "ormstjärna",			text: "Ormstjärna.png" },
// { value: "öronsäl",				text: "Öronsäl.png" },
// { value: "ört",					text: "Ört.png" },
// { value: "pirål",				text: "Pirål.png" },
// { value: "plankton",			text: "Plankton.png" },
// { value: "rådjur",				text: "Rådjur.png" },
// { value: "rankfoting",			text: "Rankfoting.png" },
// { value: "räv",					text: "Räv.png" },
// { value: "säl",					text: "Säl.png" },
// { value: "sjöborre",			text: "Sjöborre.png" },
// { value: "skalbagge",			text: "Skalbagge.png" },
// { value: "skogssork_grasiding",	text: "Skogssork_Grasiding.png" },
// { value: "snok",				text: "Snok.png" },
// { value: "späckhuggare",		text: "Späckhuggare.png" },
// { value: "svamp",				text: "Svamp.png" },
// { value: "trädlevandeinsekt",	text: "TrädlevandeInsekt.png" },
// { value: "träd",				text: "Träd.png" },
// { value: "utterjägare",			text: "UtterJägare.png" },
// { value: "valar",				text: "Valar.png" },
// { value: "vanliggroda",			text: "VanligGroda.png" },
// { value: "vithövdadhavsörn",	text: "VithövdadHavsörn.png" },

const nodes: Asset[] = prependPath("assets/ecoweb/nodes/128/", [
	// Animals
	{ key: "Blafjaril.png",				path: "Blafjaril.png" },
	{ key: "ConnochaetesTaurinus.png",	path: "Connochaetes taurinus.png" },
	{ key: "CrocutaCrocuta.png",		path: "Crocuta crocuta.png" },
	{ key: "EquusQuagga.png",			path: "Equus quagga.png" },
	{ key: "LoxodontaAfricana.png",		path: "Loxodonta africana.png" },
	{ key: "LycaonPicturus.png",		path: "Lycaon picturus.png" },
	{ key: "MadoquaKirkii.png",			path: "Madoqua kirkii.png" },
	{ key: "PantheraLeo.png",			path: "Panthera leo.png" },
	{ key: "Rapsbagge.png",				path: "Rapsbagge.png" },
	{ key: "RhabdomysPumilio.png",		path: "Rhabdomys pumilio.png" },
	{ key: "Serval.png",				path: "Serval.png" },
	// Plants
	{ key: "AcalyphaFruticosa.png",		path: "Acalypha fruticosa.png" },
	{ key: "HeteropogonContortus.png",	path: "Heteropogon contortus.png" },
	{ key: "Kummin.png",				path: "Kummin.png" },
	{ key: "Raps.png",					path: "Raps.png" },
	{ key: "ThemedaTriandra.png",		path: "Themeda triandra.png" },
]);

const backgrounds: Asset[] = prependPath("assets/ecoweb/backgrounds/", [
	{ key: "planet_still",	path: "planet.jpg" },
]);

const images: Asset[] = nodes.concat(backgrounds);

const videos: Asset[] = prependPath("assets/ecoweb/videos/", [
	{ key: "planet_video",	path: "planet.mp4" },
]);


export { nodes, images, videos };