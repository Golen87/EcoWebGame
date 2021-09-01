import { nodes as uniNodes, icons as uniIcons } from "../assets/serengetiAssets";


/* Interface */

interface Asset {
	key: string;
	path: string;
}


/* Nodes */

// Serengeti
import crocuta_crocuta from "../../assets/ecoweb/nodes/128/Toppkonsument_Crocuta_crocuta.png"; // Hyena
import leptailurus_serval from "../../assets/ecoweb/nodes/128/Toppkonsument_Leptailurus_serval.png"; // Serval
import lycaon_pictus from "../../assets/ecoweb/nodes/128/Toppkonsument_Lycaon_pictus.png"; // Vildhund
import panthera_leo_f from "../../assets/ecoweb/nodes/128/Toppkonsument_Panthera_leo_f.png"; // Lejon
import connochaetes_taurinus from "../../assets/ecoweb/nodes/128/Konsument_Connochaetes_taurinus.png"; // Gnu
import equus_quagga from "../../assets/ecoweb/nodes/128/Konsument_Equus_quagga.png"; // Zebra
import giraffa_camelopardalis from "../../assets/ecoweb/nodes/128/Konsument_Giraffa_camelopardalis_tippelskirchii.png"; // Giraff
import loxodonta_africana from "../../assets/ecoweb/nodes/128/Konsument_Loxodonta_africana.png"; // Elefant
import madoqua_kirkii from "../../assets/ecoweb/nodes/128/Konsument_Madoqua_kirkii.png"; // Dikdik
import rhabdomys_pumilio from "../../assets/ecoweb/nodes/128/Konsument_Rhabdomys_pumilio.png"; // Mus
import acacia_senegal from "../../assets/ecoweb/nodes/128/Producent_Acacia_senegal.png"; // Acacia
import acalypha_fruticosa from "../../assets/ecoweb/nodes/128/Producent_Acalypha_fruticosa.png"; // Acalypha
import aristidia from "../../assets/ecoweb/nodes/128/Producent_Aristidia.png"; // Aristidia
import balanites_aegyptiaca from "../../assets/ecoweb/nodes/128/Producent_Balanites_aegyptiaca.png"; // Balanties
import heteropogon_contortus from "../../assets/ecoweb/nodes/128/Producent_Heteropogon_contortus.png"; // Heteropogon
import solanum_incanum from "../../assets/ecoweb/nodes/128/Producent_Solanum_incanum.png"; // Solanum
import themeda_triandra from "../../assets/ecoweb/nodes/128/Producent_Themeda_triandra.png"; // Themeda

// Bondgården
// import syrphidae from "../../assets/ecoweb/nodes/128/Toppkonsument_Syrphidae.png"; // Geting
// import anthophila from "../../assets/ecoweb/nodes/128/Konsument_Anthophila.png"; // Bi
// import argyresthia_conjugella from "../../assets/ecoweb/nodes/128/Konsument_Argyresthia_conjugella.png"; // Rönnbärsmal
// import bombus from "../../assets/ecoweb/nodes/128/Konsument_Bombus.png"; // Humla
// import deroceras_reticulatum from "../../assets/ecoweb/nodes/128/Konsument_Deroceras_reticulatum.png"; // Åkersnigel
// import meligethes_aeneus from "../../assets/ecoweb/nodes/128/Konsument_Meligethes_aeneus.png"; // Rapsbagge
// import rhopalocera from "../../assets/ecoweb/nodes/128/Konsument_Rhopalocera.png"; // Dagfjäril
// import avena_sativa from "../../assets/ecoweb/nodes/128/Producent_Avena_sativa.png"; // Havre
// import brassica_napus from "../../assets/ecoweb/nodes/128/Producent_Brassica_napus.png"; // Raps
// import carum_carvi from "../../assets/ecoweb/nodes/128/Producent_Carum_carvi.png"; // Kummin
// import festuca_rubra from "../../assets/ecoweb/nodes/128/Producent_Festuca_rubra.png"; // Rödsvingel
// import hordeum_vulgare from "../../assets/ecoweb/nodes/128/Producent_Hordeum_vulgare.png"; // Korn
// import lactuca_sativa from "../../assets/ecoweb/nodes/128/Producent_Lactuca_sativa.png"; // Sallat
// import malus_domestica from "../../assets/ecoweb/nodes/128/Producent_Malus_domestica.png"; // Äppelträd

const nodes: Asset[] = [
	// Serengeti
	{ key: "crocuta_crocuta",			path: crocuta_crocuta }, // Hyena
	{ key: "leptailurus_serval",		path: leptailurus_serval }, // Serval
	{ key: "lycaon_pictus",				path: lycaon_pictus }, // Vildhund
	{ key: "panthera_leo_f",			path: panthera_leo_f }, // Lejon
	{ key: "connochaetes_taurinus",		path: connochaetes_taurinus }, // Gnu
	{ key: "equus_quagga",				path: equus_quagga }, // Zebra
	{ key: "giraffa_camelopardalis",	path: giraffa_camelopardalis }, // Giraff
	{ key: "loxodonta_africana",		path: loxodonta_africana }, // Elefant
	{ key: "madoqua_kirkii",			path: madoqua_kirkii }, // Dikdik
	{ key: "rhabdomys_pumilio",			path: rhabdomys_pumilio }, // Mus
	{ key: "acacia_senegal",			path: acacia_senegal }, // Acacia
	{ key: "acalypha_fruticosa",		path: acalypha_fruticosa }, // Acalypha
	{ key: "aristidia",					path: aristidia }, // Aristidia
	{ key: "balanites_aegyptiaca",		path: balanites_aegyptiaca }, // Balanties
	{ key: "heteropogon_contortus",		path: heteropogon_contortus }, // Heteropogon
	{ key: "solanum_incanum",			path: solanum_incanum }, // Solanum
	{ key: "themeda_triandra",			path: themeda_triandra }, // Themeda

	// Bondgården
	// { key: "syrphidae",					path: syrphidae }, // Geting
	// { key: "anthophila",				path: anthophila }, // Bi
	// { key: "argyresthia_conjugella",	path: argyresthia_conjugella }, // Rönnbärsmal
	// { key: "bombus",					path: bombus }, // Humla
	// { key: "deroceras_reticulatum",		path: deroceras_reticulatum }, // Åkersnigel
	// { key: "meligethes_aeneus",			path: meligethes_aeneus }, // Rapsbagge
	// { key: "rhopalocera",				path: rhopalocera }, // Dagfjäril
	// { key: "avena_sativa",				path: avena_sativa }, // Havre
	// { key: "brassica_napus",			path: brassica_napus }, // Raps
	// { key: "carum_carvi",				path: carum_carvi }, // Kummin
	// { key: "festuca_rubra",				path: festuca_rubra }, // Rödsvingel
	// { key: "hordeum_vulgare",			path: hordeum_vulgare }, // Korn
	// { key: "lactuca_sativa",			path: lactuca_sativa }, // Sallat
	// { key: "malus_domestica",			path: malus_domestica }, // Äppelträd
];


/* Backgrounds */

import planet_still from "../../assets/ecoweb/backgrounds/planet.jpg";
import bg_serengeti from "../../assets/ecoweb/backgrounds/serengeti-blur2.jpg";

const backgrounds: Asset[] = [
	{ key: "planet_still",	path: planet_still },
	{ key: "bg_serengeti",	path: bg_serengeti },
];


/* Videos */

import planet_video from "../../assets/ecoweb/videos/planet.mp4";

const videos: Asset[] = [
	{ key: "planet_video",	path: planet_video },
];


/* Export */

const images: Asset[] = nodes.concat(backgrounds, uniNodes, uniIcons);

export {
	images,
	videos,

	nodes,
	backgrounds,
};