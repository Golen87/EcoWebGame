import { prependPath } from "../utils";

interface Asset {
	key: string;
	path: string;
}

const nodes: Asset[] = prependPath("assets/ecoweb/nodes/128/", [
	// Serengeti
	{ key: "crocuta_crocuta",			path: "Toppkonsument_Crocuta_crocuta.png" }, // Hyena
	{ key: "leptailurus_serval",		path: "Toppkonsument_Leptailurus_serval.png" }, // Serval
	{ key: "lycaon_pictus",				path: "Toppkonsument_Lycaon_pictus.png" }, // Vildhund
	{ key: "panthera_leo_f",			path: "Toppkonsument_Panthera_leo_f.png" }, // Lejon
	{ key: "connochaetes_taurinus",		path: "Konsument_Connochaetes_taurinus.png" }, // Gnu
	{ key: "equus_quagga",				path: "Konsument_Equus_quagga.png" }, // Zebra
	{ key: "giraffa_camelopardalis",	path: "Konsument_Giraffa_camelopardalis_tippelskirchii.png" }, // Giraff
	{ key: "loxodonta_africana",		path: "Konsument_Loxodonta_africana.png" }, // Elefant
	{ key: "madoqua_kirkii",			path: "Konsument_Madoqua_kirkii.png" }, // Dikdik
	{ key: "rhabdomys_pumilio",			path: "Konsument_Rhabdomys_pumilio.png" }, // Mus
	{ key: "acacia_senegal",			path: "Producent_Acacia_senegal.png" }, // Acacia
	{ key: "acalypha_fruticosa",		path: "Producent_Acalypha_fruticosa.png" }, // Acalypha
	{ key: "aristidia",					path: "Producent_Aristidia.png" }, // Aristidia
	{ key: "balanites_aegyptiaca",		path: "Producent_Balanites_aegyptiaca.png" }, // Balanties
	{ key: "heteropogon_contortus",		path: "Producent_Heteropogon_contortus.png" }, // Heteropogon
	{ key: "solanum_incanum",			path: "Producent_Solanum_incanum.png" }, // Solanum
	{ key: "themeda_triandra",			path: "Producent_Themeda_triandra.png" }, // Themeda

	// Bondgården
	// { key: "syrphidae",					path: "Toppkonsument_Syrphidae.png" }, // Geting
	// { key: "anthophila",				path: "Konsument_Anthophila.png" }, // Bi
	// { key: "argyresthia_conjugella",	path: "Konsument_Argyresthia_conjugella.png" }, // Rönnbärsmal
	// { key: "bombus",					path: "Konsument_Bombus.png" }, // Humla
	// { key: "deroceras_reticulatum",		path: "Konsument_Deroceras_reticulatum.png" }, // Åkersnigel
	// { key: "meligethes_aeneus",			path: "Konsument_Meligethes_aeneus.png" }, // Rapsbagge
	// { key: "rhopalocera",				path: "Konsument_Rhopalocera.png" }, // Dagfjäril
	// { key: "avena_sativa",				path: "Producent_Avena_sativa.png" }, // Havre
	// { key: "brassica_napus",			path: "Producent_Brassica_napus.png" }, // Raps
	// { key: "carum_carvi",				path: "Producent_Carum_carvi.png" }, // Kummin
	// { key: "festuca_rubra",				path: "Producent_Festuca_rubra.png" }, // Rödsvingel
	// { key: "hordeum_vulgare",			path: "Producent_Hordeum_vulgare.png" }, // Korn
	// { key: "lactuca_sativa",			path: "Producent_Lactuca_sativa.png" }, // Sallat
	// { key: "malus_domestica",			path: "Producent_Malus_domestica.png" }, // Äppelträd
]);

const universeumNodes: Asset[] = prependPath("assets/serengeti/nodes/128/", [
	// Animals
	{ key: "ACIJUB",	path: "ACIJUB.png" },
	{ key: "AEPMEL",	path: "AEPMEL.png" },
	{ key: "ALCBUS",	path: "ALCBUS.png" },
	{ key: "CANAUR",	path: "CANAUR.png" },
	{ key: "CANMES",	path: "CANMES.png" },
	{ key: "CARCAR",	path: "CARCAR.png" },
	{ key: "CONTAU",	path: "CONTAU.png" },
	{ key: "CROCRO",	path: "CROCRO.png" },
	{ key: "DAMKOR",	path: "DAMKOR.png" },
	{ key: "EQUBUR",	path: "EQUBUR.png" },
	{ key: "GAZGRA",	path: "GAZGRA.png" },
	{ key: "GAZTHO",	path: "GAZTHO.png" },
	{ key: "GIRCAM",	path: "GIRCAM.png" },
	{ key: "HETBRU",	path: "HETBRU.png" },
	{ key: "HIPAMP",	path: "HIPAMP.png" },
	{ key: "KOBELL",	path: "KOBELL.png" },
	{ key: "LEPSER",	path: "LEPSER.png" },
	{ key: "LOXAFR",	path: "LOXAFR.png" },
	{ key: "LYCPIC",	path: "LYCPIC.png" },
	{ key: "MADKIR",	path: "MADKIR.png" },
	{ key: "OUROUR",	path: "OUROUR.png" },
	{ key: "PANLEO",	path: "PANLEO.png" },
	{ key: "PANPAR",	path: "PANPAR.png" },
	{ key: "PAPANU",	path: "PAPANU.png" },
	{ key: "PEDCAP",	path: "PEDCAP.png" },
	{ key: "PHAAET",	path: "PHAAET.png" },
	{ key: "PROCAP",	path: "PROCAP.png" },
	{ key: "REDRED",	path: "REDRED.png" },
	{ key: "RHAPUM",	path: "RHAPUM.png" },
	{ key: "SYNCAF",	path: "SYNCAF.png" },
	{ key: "TAUORY",	path: "TAUORY.png" },
	{ key: "TRASCR",	path: "TRASCR.png" },
	// Plants
	{ key: "ACASEN",	path: "ACASEN.png" },
	{ key: "ACASEY",	path: "ACASEY.png" },
	{ key: "ACATOR",	path: "ACATOR.png" },
	{ key: "ACAXAN",	path: "ACAXAN.png" },
	{ key: "ACHASP",	path: "ACHASP.png" },
	{ key: "ALLRUB",	path: "ALLRUB.png" },
	{ key: "ALOMAC",	path: "ALOMAC.png" },
	{ key: "ALOSEC",	path: "ALOSEC.png" },
	{ key: "BALAEG",	path: "BALAEG.png" },
	{ key: "BLEACA",	path: "BLEACA.png" },
	{ key: "BOSAUG",	path: "BOSAUG.png" },
	{ key: "CAPTOM",	path: "CAPTOM.png" },
	{ key: "CHLGAY",	path: "CHLGAY.png" },
	{ key: "CISQUA",	path: "CISQUA.png" },
	{ key: "CISROT",	path: "CISROT.png" },
	{ key: "COMMEAFR",	path: "COMMEAFR.png" },
	{ key: "COMMOL",	path: "COMMOL.png" },
	{ key: "CROMAC",	path: "CROMAC.png" },
	{ key: "CYNDAC",	path: "CYNDAC.png" },
	{ key: "EMICOC",	path: "EMICOC.png" },
	{ key: "ERACIL",	path: "ERACIL.png" },
	{ key: "EUPCAN",	path: "EUPCAN.png" },
	{ key: "EUSPAS",	path: "EUSPAS.png" },
	{ key: "FICTHI",	path: "FICTHI.png" },
	{ key: "GREBIC",	path: "GREBIC.png" },
	{ key: "HELSTE",	path: "HELSTE.png" },
	{ key: "HETCON",	path: "HETCON.png" },
	{ key: "HIB",		path: "HIB.png" },
	{ key: "HOSOPP",	path: "HOSOPP.png" },
	{ key: "HYPFOR",	path: "HYPFOR.png" },
	{ key: "INDHOC",	path: "INDHOC.png" },
	{ key: "IPOOBS",	path: "IPOOBS.png" },
	{ key: "KIGAFR",	path: "KIGAFR.png" },
	{ key: "MAETRI",	path: "MAETRI.png" },
	{ key: "OLE",		path: "OLE.png" },
	{ key: "PANCOL",	path: "PANCOL.png" },
	{ key: "PANMAX",	path: "PANMAX.png" },
	{ key: "PANREP",	path: "PANREP.png" },
	{ key: "PAPCAP",	path: "PAPCAP.png" },
	{ key: "PELCAL",	path: "PELCAL.png" },
	{ key: "PHRMAU",	path: "PHRMAU.png" },
	{ key: "FICGLU",	path: "FICGLU.png" },
	{ key: "RHOREV",	path: "RHOREV.png" },
	{ key: "SCLBIR",	path: "SCLBIR.png" },
	{ key: "SENDID",	path: "SENDID.png" },
	{ key: "SENEHR",	path: "SENEHR.png" },
	{ key: "SENSUF",	path: "SENSUF.png" },
	{ key: "SETSPH",	path: "SETSPH.png" },
	{ key: "SID",		path: "SID.png" },
	{ key: "SOLINC",	path: "SOLINC.png" },
	{ key: "SOLNIG",	path: "SOLNIG.png" },
	{ key: "SPOPYR",	path: "SPOPYR.png" },
	{ key: "THETRI",	path: "THETRI.png" },
	{ key: "TYPCAP",	path: "TYPCAP.png" },
	{ key: "XIMCAF",	path: "XIMCAF.png" },
	{ key: "ZIZ",		path: "ZIZ.png" },
	// Icons
	// { key: "icon-annualFlower",	path: "PlaceHolder-Plant.png" },
	// { key: "icon-grass",		path: "PlaceHolder-Plant.png" },
	// { key: "icon-herb",			path: "PlaceHolder-Plant.png" },
	// { key: "icon-shrub",		path: "PlaceHolder-Plant.png" },
	// { key: "icon-tree",			path: "PlaceHolder-Plant.png" },
]);

const backgrounds: Asset[] = prependPath("assets/ecoweb/backgrounds/", [
	{ key: "planet_still",	path: "planet.jpg" },
	{ key: "bg_serengeti",	path: "serengeti-blur2.jpg" },
]);

const icons: Asset[] = prependPath("assets/serengeti/icons/", [
	{ key: "icon-foodWeb",				path: "icon-food-web.png" },
	{ key: "icon-ecoWeb",				path: "icon-eco-web.png" },
	{ key: "icon-ecoChallenge",			path: "icon-eco-challenge.png" },
	{ key: "icon-ecoMission",			path: "icon-eco-mission.png" },
	{ key: "icon-backToBeginning",		path: "icon-back-to-beginning.png" },
	{ key: "icon-backward",				path: "icon-backward.png" },
	{ key: "icon-forward",				path: "icon-forward.png" },
	{ key: "icon-play",					path: "icon-play.png" },
	{ key: "icon-plant-soil",			path: "icon-plant-soil.png" },
	{ key: "icon-plant-sun",			path: "icon-plant-sun.png" },
	{ key: "icon-plant-rain",			path: "icon-plant-rain.png" },
	{ key: "icon-info",					path: "icon-info.png" },
	{ key: "icon-reset",				path: "icon-reset.png" },
	{ key: "icon-bookmark-saved",		path: "icon-bookmark-saved.png" },
	{ key: "icon-bookmark-selected",	path: "icon-bookmark-selected.png" },
	{ key: "icon-bookmark-unselected",	path: "icon-bookmark-unselected.png" },
	{ key: "icon-video-record",			path: "icon-video-record.png" },
	{ key: "icon-map-africa",			path: "icon-map-africa.png" },
	{ key: "icon-location",				path: "icon-location.png" },
	{ key: "icon-annual-flower",		path: "icon-annual-flower.png" },
	{ key: "icon-grass",				path: "icon-grass.png" },
	{ key: "icon-herb",					path: "icon-herb.png" },
	{ key: "icon-shrub",				path: "icon-shrub.png" },
	{ key: "icon-tree",					path: "icon-tree.png" },
	{ key: "icon-sun",					path: "icon-sun.png" },
	{ key: "icon-water",				path: "icon-water.png" },
	{ key: "icon-leaf",					path: "icon-leaf.png" },
	{ key: "icon-meat",					path: "icon-meat.png" },
	{ key: "icon-menu-flag-se",			path: "icon-menu-flag-se.png" },
	{ key: "icon-menu-flag-en",			path: "icon-menu-flag-en.png" },
]);


const images: Asset[] = nodes.concat(universeumNodes, backgrounds, icons);

const videos: Asset[] = prependPath("assets/ecoweb/videos/", [
	// { key: "planet_video",	path: "planet.mp4" },
]);


export { nodes, images, videos };