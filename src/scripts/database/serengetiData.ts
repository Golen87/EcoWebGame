let serengetiData = JSON.stringify(
{
	"version": 4,
	"nodes": [
		{
			"id": "abutilon_bidentatum",
			"name": "Abutilon bidentatum",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acalypha_fruticosa",
			"name": "Acalypha fruticosa",
			"eng": null,
			"swe": null,
			"chi": "\u91d1\u5408\u6b22",
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acacia_robusta",
			"name": "Acacia robusta",
			"eng": "Ankle thorn",
			"swe": "Vachellia robusta",
			"chi": "\u91d1\u5408\u6b22",
			"group": 13,
			"iucn": "LC",
			"image": "icon-tree",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "tree",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acacia_senegal",
			"name": "Acacia senegal",
			"eng": "Senegalia senegal",
			"swe": null,
			"chi": "\u585e\u5185\u52a0\u5c14\u91d1\u5408\u6b22",
			"group": 12,
			"iucn": "NE",
			"image": "ACASEN",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acacia_seyal",
			"name": "Acacia seyal",
			"eng": "Vachellia seyal",
			"swe": null,
			"chi": "\u91d1\u5408\u6b22",
			"group": 11,
			"iucn": "LC",
			"image": "ACASEY",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acacia_tortilis",
			"name": "Acacia tortilis",
			"eng": "Umbrella thorn acacia",
			"swe": null,
			"chi": "\u6d0b\u76f8\u601d",
			"group": 9,
			"iucn": "LC",
			"image": "ACATOR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "tree",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acacia_xanthophloea",
			"name": "Acacia xanthophloea",
			"eng": "Fever tree",
			"swe": null,
			"chi": "\u6d0b\u76f8\u601d",
			"group": 11,
			"iucn": "LC",
			"image": "ACAXAN",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "tree",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "achyranthes_aspera",
			"name": "Achyranthes aspera",
			"eng": null,
			"swe": null,
			"chi": "\u571f\u725b\u819d",
			"group": 13,
			"iucn": "NE",
			"image": "ACHASP",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "acinonyx_jubatus",
			"name": "Acinonyx jubatus",
			"eng": "Cheetah",
			"swe": "Gepard",
			"chi": "\u730e\u8c79",
			"group": 1,
			"iucn": "VU",
			"image": "ACIJUB",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aepyceros_melampus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ourebia_ourebi",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phacochoerus_africanus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "redunca_redunca",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "aepyceros_melampus",
			"name": "Aepyceros melampus",
			"eng": "Impala",
			"swe": "Impala",
			"chi": "\u9ad8\u89d2\u7f9a ",
			"group": 4,
			"iucn": "LC",
			"image": "AEPMEL",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acacia_senegal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_gayana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "combretum_molle",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_festivus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "albizia_harveyi",
			"name": "Albizia harveyi",
			"eng": null,
			"swe": null,
			"chi": "\u54c8\u7ef4\u6728",
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "albuca_abyssinica",
			"name": "Albuca abyssinica",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "alcelaphus_buselaphus",
			"name": "Alcelaphus buselaphus",
			"eng": "Hartebeest",
			"swe": "Hartebeest",
			"chi": "\u72f7\u7f9a",
			"group": 4,
			"iucn": "LC",
			"image": "ALCBUS",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_scalarum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "dinebra_retroflexa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_spicatus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "allophylus_rubifolius",
			"name": "Allophylus rubifolius",
			"eng": null,
			"swe": null,
			"chi": "\u7ea2\u82b1",
			"group": 13,
			"iucn": "LC",
			"image": "ALLRUB",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "aloe_macrosiphon",
			"name": "Aloe macrosiphon",
			"eng": null,
			"swe": null,
			"chi": "\u82a6\u835f",
			"group": 13,
			"iucn": "NE",
			"image": "ALOMAC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "aloe_secundiflora",
			"name": "Aloe secundiflora",
			"eng": null,
			"swe": null,
			"chi": "\u82a6\u835f",
			"group": 13,
			"iucn": "LC",
			"image": "ALOSEC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "andropogon_greenwayi",
			"name": "Andropogon greenwayi",
			"eng": null,
			"swe": null,
			"chi": "\u7a7f\u5fc3\u83b2",
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "andropogon_schirensis",
			"name": "Andropogon schirensis",
			"eng": null,
			"swe": null,
			"chi": "\u62df\u5357\u82a5",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "aristida_adoensis",
			"name": "Aristida adoensis",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "balanites_aegyptiaca",
			"name": "Balanites aegyptiaca",
			"eng": "Egyptian balsam",
			"swe": "Ökendadel",
			"chi": null,
			"group": 9,
			"iucn": "LC",
			"image": "BALAEG",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "blepharis_acanthodioides",
			"name": "Blepharis acanthodioides",
			"eng": null,
			"swe": null,
			"chi": "\u68d8\u5706\u866b",
			"group": 13,
			"iucn": "NE",
			"image": "BLEACA",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "boscia_angustifolia",
			"name": "Boscia angustifolia",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 14,
			"iucn": "NE",
			"image": "BOSAUG",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "bothriochloa_insculpta",
			"name": "Bothriochloa insculpta",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "brachiaria_semiundulata",
			"name": "Brachiaria semiundulata",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "canis_aureus",
			"name": "Canis aureus",
			"eng": "Golden jackal",
			"swe": "Guldschakal",
			"chi": "\u91d1\u9ec4\u72d0\u72fc",
			"group": 2,
			"iucn": "LC",
			"image": "CANAUR",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "equus_quagga",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "canis_mesomelas",
			"name": "Canis mesomelas",
			"eng": "Black-backed jackal",
			"swe": "Schabrakschakal",
			"chi": "\u9ed1\u80cc\u80e1\u72fc",
			"group": 2,
			"iucn": "LC",
			"image": "CANMES",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "capparis_tomentosa",
			"name": "Capparis tomentosa",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "CAPTOM",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "caracal_caracal",
			"name": "Caracal caracal",
			"eng": "Caracal",
			"swe": "\u00d6kenlo",
			"chi": "\u72de\u732b",
			"group": 2,
			"iucn": "LC",
			"image": "CARCAR",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pedetes_capensis",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "procavia_capensis",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhabdomys_pumilio",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "pennisetum_ciliare",
			"name": "Pennisetum ciliare",
			"eng": "Cenchrus ciliaris",
			"swe": "Cenchrus ciliaris",
			"chi": "\u7ea4\u6bdb\u72fc\u5c3e\u8349",
			"group": 13,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "chloris_gayana",
			"name": "Chloris gayana",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "CHLGAY",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "chloris_pycnothrix",
			"name": "Chloris pycnothrix",
			"eng": null,
			"swe": null,
			"chi": "\u864e\u5c3e\u8349",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "chloris_roxburghiana",
			"name": "Chloris roxburghiana",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "cissus_quadrangularis",
			"name": "Cissus quadrangularis",
			"eng": null,
			"swe": null,
			"chi": "\u56db\u68f1\u7c89\u85e4",
			"group": 13,
			"iucn": "NE",
			"image": "CISQUA",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "cissus_rotundifolia",
			"name": "Cissus rotundifolia",
			"eng": null,
			"swe": null,
			"chi": "\u5706\u53f6\u83ca\u82b1",
			"group": 13,
			"iucn": "NE",
			"image": "CISROT",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "commelina_africana",
			"name": "Commelina africana",
			"eng": null,
			"swe": null,
			"chi": "\u975e\u6d32\u83ca",
			"group": 13,
			"iucn": "LC",
			"image": "COMMEAFR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "commiphora_merkeri",
			"name": "Commiphora merkeri",
			"eng": null,
			"swe": "Commiphora viminea",
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "commiphora_trothae",
			"name": "Commiphora trothae",
			"eng": null,
			"swe": null,
			"chi": "\u91d1\u94f6\u82b1",
			"group": 14,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "combretum_molle",
			"name": "Combretum molle",
			"eng": null,
			"swe": null,
			"chi": "\u5b54\u96c0\u8349",
			"group": 8,
			"iucn": "LC",
			"image": "COMMOL",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "commiphora_schimperi",
			"name": "Commiphora schimperi",
			"eng": null,
			"swe": null,
			"chi": "\u9999\u67cf",
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "connochaetes_taurinus",
			"name": "Connochaetes taurinus",
			"eng": "Blue wildebeest",
			"swe": "Strimmig gnu",
			"chi": "\u6591\u7eb9\u89d2\u9a6c ",
			"group": 4,
			"iucn": "LC",
			"image": "CONTAU",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_gayana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_diagonalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_scalarum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "dinebra_retroflexa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_cilianensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 300
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "microchloa_kunthii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "cordia_ovalis",
			"name": "Cordia ovalis",
			"eng": null,
			"swe": "Cordia monoica",
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "crocuta_crocuta",
			"name": "Crocuta crocuta",
			"eng": "Spotted hyena",
			"swe": "Fl\u00e4ckig hyena",
			"chi": "\u9b23\u72d7",
			"group": 1,
			"iucn": "LC",
			"image": "CROCRO",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aepyceros_melampus",
					"interaction": "predation",
					"preference": 300
				},
				{
					"type": "node",
					"node_id": "alcelaphus_buselaphus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "damaliscus_korrigum",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "equus_quagga",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kobus_ellipsiprymnus",
					"interaction": "predation",
					"preference": 200
				},
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ourebia_ourebi",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phacochoerus_africanus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "redunca_redunca",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "croton_dichogamus",
			"name": "Croton dichogamus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "croton_macrostachyus",
			"name": "Croton macrostachyus",
			"eng": null,
			"swe": null,
			"chi": "\u5df4\u8c46",
			"group": 9,
			"iucn": "LC",
			"image": "CROMAC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "crotalaria_spinosa",
			"name": "Crotalaria spinosa",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-annual-flower",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "cymbopogon_excavatus",
			"name": "Cymbopogon excavatus",
			"eng": null,
			"swe": "Cymbopogon caesius",
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "cynodon_dactylon",
			"name": "Cynodon dactylon",
			"eng": null,
			"swe": "Hundtandsgr\u00e4s",
			"chi": "\u72d7\u7259\u6839",
			"group": 9,
			"iucn": "NE",
			"image": "CYNDAC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "cyperus_juncelliformis",
			"name": "Cyperus juncelliformis",
			"eng": null,
			"swe": null,
			"chi": "\u9999\u9644\u5b50",
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "cyphostemma_princeae",
			"name": "Cyphostemma princeae",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "damaliscus_korrigum",
			"name": "Damaliscus korrigum",
			"eng": "Topi",
			"swe": "Topi",
			"chi": "\u8f6c\u89d2\u725b\u7f9a",
			"group": 3,
			"iucn": "VU",
			"image": "DAMKOR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_cilianensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "psilolemma_jaegeri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_spicatus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "digitaria_diagonalis",
			"name": "Digitaria diagonalis",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "digitaria_macroblephara",
			"name": "Digitaria macroblephara",
			"eng": null,
			"swe": null,
			"chi": "\u6d0b\u767d\u82b1",
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "digitaria_milanjiana",
			"name": "Digitaria milanjiana",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "digitaria_scalarum",
			"name": "Digitaria scalarum",
			"eng": null,
			"swe": "Abessinsk fingerhirs",
			"chi": null,
			"group": 7,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "digitaria_ternata",
			"name": "Digitaria ternata",
			"eng": null,
			"swe": null,
			"chi": "\u6d0b\u767d\u82b1",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "digitaria_velutina",
			"name": "Digitaria velutina",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "diheteropogon_amplectens",
			"name": "Diheteropogon amplectens",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "dinebra_retroflexa",
			"name": "Dinebra retroflexa",
			"eng": null,
			"swe": "Julgransgr\u00e4s",
			"chi": null,
			"group": 7,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "duosperma_kilimandscharica",
			"name": "Duosperma kilimandscharica",
			"eng": null,
			"swe": null,
			"chi": "\u9e92\u9e9f\u83dc",
			"group": 8,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "echinochloa_haploclada",
			"name": "Echinochloa haploclada",
			"eng": null,
			"swe": null,
			"chi": "\u8349",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "emilia_coccinea",
			"name": "Emilia coccinea",
			"eng": "Tasselflower",
			"swe": "Tofsblomster",
			"chi": "\u7ed2\u7f28\u83ca",
			"group": 13,
			"iucn": "NE",
			"image": "EMICOC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "equus_quagga",
			"name": "Equus quagga",
			"eng": "Plains zebra",
			"swe": "St\u00e4ppzebra",
			"chi": "\u6591\u9a6c",
			"group": 4,
			"iucn": "NT",
			"image": "EQUBUR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "dinebra_retroflexa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 300
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "eragrostis_aspera",
			"name": "Eragrostis aspera",
			"eng": null,
			"swe": null,
			"chi": "\u753b\u7709\u8349",
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "eragrostis_cilianensis",
			"name": "Eragrostis cilianensis",
			"eng": null,
			"swe": "Stort k\u00e4rleksgr\u00e4s",
			"chi": "\u7ea4\u6bdb\u8349",
			"group": 8,
			"iucn": "NE",
			"image": "ERACIL",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "eragrostis_exasperata",
			"name": "Eragrostis exasperata",
			"eng": null,
			"swe": null,
			"chi": "\u753b\u7709\u8349",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "eragrostis_tenuifolia",
			"name": "Eragrostis tenuifolia",
			"eng": null,
			"swe": "Eragrostis patula",
			"chi": "\u4e2d\u534e\u8349",
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "eriochloa_nubica",
			"name": "Eriochloa nubica",
			"eng": null,
			"swe": "Eriochloa fatmensis",
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "euphorbia_candelabrum",
			"name": "Euphorbia candelabrum",
			"eng": "Candelabra tree",
			"swe": null,
			"chi": "\u534e\u70db\u9e92\u9e9f ",
			"group": 11,
			"iucn": "LC",
			"image": "EUPCAN",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "tree",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "eustachys_paspaloides",
			"name": "Eustachys paspaloides",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "EUSPAS",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ficus_glumosa",
			"name": "Ficus glumosa",
			"eng": null,
			"swe": null,
			"chi": "\u6995\u6811",
			"group": 13,
			"iucn": "LC",
			"image": "FICGLU",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ficus_ingens",
			"name": "Ficus ingens",
			"eng": null,
			"swe": null,
			"chi": "\u6995\u6811",
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ficus_thonningii",
			"name": "Ficus thonningii",
			"eng": null,
			"swe": null,
			"chi": "\u6995\u6811",
			"group": 13,
			"iucn": "LC",
			"image": "FICTHI",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "nanger_granti",
			"name": "Nanger granti",
			"eng": "Grant's gazelle",
			"swe": "Grantgasell",
			"chi": "\u845b\u6c0f\u77aa\u7f9a",
			"group": 4,
			"iucn": "LC",
			"image": "GAZGRA",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_scalarum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "dinebra_retroflexa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "duosperma_kilimandscharica",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "microchloa_kunthii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_stramineum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_fimbriatus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "eudorcas_thomsonii",
			"name": "Eudorcas thomsonii",
			"eng": "Thomson's gazelle",
			"swe": "Thomsongasell",
			"chi": "\u6c64\u6c0f\u77aa\u7f9a",
			"group": 4,
			"iucn": "LC",
			"image": "GAZTHO",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_diagonalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_scalarum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "dinebra_retroflexa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_cilianensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_rufa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "microchloa_kunthii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_fimbriatus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "giraffa_camelopardalis",
			"name": "Giraffa camelopardalis",
			"eng": "Northern giraffe",
			"swe": "Giraff",
			"chi": "\u957f\u9888\u9e7f",
			"group": 6,
			"iucn": "VU",
			"image": "GIRCAM",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acacia_robusta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_senegal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_seyal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_trothae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cordia_ovalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_fallax",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_trichocarpa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_lunariifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "maerua_cafra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "olea_capensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavetta_assimilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phyllanthus_sepialis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "grewia_bicolor",
			"name": "Grewia bicolor",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "GREBIC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "grewia_fallax",
			"name": "Grewia fallax",
			"eng": null,
			"swe": "Grewia arborea",
			"chi": "\u7d2b\u6749",
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "grewia_trichocarpa",
			"name": "Grewia trichocarpa",
			"eng": null,
			"swe": null,
			"chi": "\u6bdb\u679c\u85dc",
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "harpachne_schimperi",
			"name": "Harpachne schimperi",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "heliotropium_steudneri",
			"name": "Heliotropium steudneri",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "HELSTE",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "heterohyrax_brucei",
			"name": "Heterohyrax brucei",
			"eng": "Yellow-spotted rock hyrax",
			"swe": "Gulprickig hyrax",
			"chi": "\u8e44\u5154",
			"group": 5,
			"iucn": "LC",
			"image": "HETBRU",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "abutilon_bidentatum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acalypha_fruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_robusta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "albizia_harveyi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "albuca_abyssinica",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "allophylus_rubifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aloe_macrosiphon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aloe_secundiflora",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "capparis_tomentosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_ciliare",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_quadrangularis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_rotundifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commelina_africana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_merkeri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cordia_ovalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_dichogamus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cyphostemma_princeae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_velutina",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "emilia_coccinea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_glumosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_ingens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_thonningii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_fallax",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_trichocarpa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heliotropium_steudneri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_lunariifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hoslundia_opposita",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hypoestes_forskaolii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_basiflora",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ipomoea_obscura",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "jasminum_stenolobum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kalanchoe_prittwitzii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kedrostis_foetidissima",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "lantana_ukambensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "maerua_cafra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ocimum_dambicola",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pappea_capensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavetta_assimilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavonia_patens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_stramineum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phyllanthus_sepialis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pupalia_lappacea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sclerocarya_birrea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "senna_didymobotrya",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_ehrenbergii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_suffruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_dennekense",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "tricholaena_teneriffae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "turraea_fischeri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ximenia_caffra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ziziphus_abyssinica",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "heteropogon_contortus",
			"name": "Heteropogon contortus",
			"eng": "Black speargrass",
			"swe": "Spjutgräs",
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "HETCON",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hibiscus_diversifolius",
			"name": "Hibiscus diversifolius",
			"eng": null,
			"swe": null,
			"chi": "\u6728\u69ff",
			"group": 9,
			"iucn": "NE",
			"image": "HIB",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hibiscus_lunariifolius",
			"name": "Hibiscus lunariifolius",
			"eng": null,
			"swe": null,
			"chi": "\u8299\u84c9\u82b1",
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hippopotamus_amphibius",
			"name": "Hippopotamus amphibius",
			"eng": "Hippopotamus",
			"swe": "Flodh\u00e4st",
			"chi": "\u6cb3\u9a6c",
			"group": 3,
			"iucn": "VU",
			"image": "HIPAMP",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_gayana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_repens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "hoslundia_opposita",
			"name": "Hoslundia opposita",
			"eng": "Hoslundia",
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "HOSOPP",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hyperthelia_dissoluta",
			"name": "Hyperthelia dissoluta",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hyparrhenia_filipendula",
			"name": "Hyparrhenia filipendula",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "hypoestes_forskaolii",
			"name": "Hypoestes forskaolii",
			"eng": null,
			"swe": null,
			"chi": "\u62df\u5357\u82a5",
			"group": 13,
			"iucn": "NE",
			"image": "HYPFOR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "hyparrhenia_rufa",
			"name": "Hyparrhenia rufa",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 7,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "iboza_spp.",
			"name": "Iboza spp.",
			"eng": "Tetradenia",
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "indigofera_basiflora",
			"name": "Indigofera basiflora",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "indigofera_hochstetteri",
			"name": "Indigofera hochstetteri",
			"eng": "Indigofera",
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "LC",
			"image": "INDHOC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "ipomoea_obscura",
			"name": "Ipomoea obscura",
			"eng": null,
			"swe": null,
			"chi": "\u9690\u5b62\u5b50\u866b",
			"group": 13,
			"iucn": "NE",
			"image": "IPOOBS",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "jasminum_stenolobum",
			"name": "Jasminum stenolobum",
			"eng": null,
			"swe": null,
			"chi": "\u8309\u8389",
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "kalanchoe_prittwitzii",
			"name": "Kalanchoe prittwitzii",
			"eng": null,
			"swe": null,
			"chi": "\u5361\u5170\u4e54",
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "kedrostis_foetidissima",
			"name": "Kedrostis foetidissima",
			"eng": null,
			"swe": null,
			"chi": "\u9e45\u638c",
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "kigelia_africana",
			"name": "Kigelia africana",
			"eng": "Kigelia",
			"swe": "Korvtr\u00e4d",
			"chi": "\u975e\u6d32\u83ca",
			"group": 11,
			"iucn": "LC",
			"image": "KIGAFR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "kobus_ellipsiprymnus",
			"name": "Kobus ellipsiprymnus",
			"eng": "Waterbuck",
			"swe": "Ellipsvattenbock",
			"chi": "\u6c34\u7f9a",
			"group": 3,
			"iucn": "LC",
			"image": "KOBELL",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 300
				},
				{
					"type": "node",
					"node_id": "andropogon_schirensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_gayana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cymbopogon_excavatus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_ternata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 200
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phragmites_mauritianus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "typha_capensis",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "kyllinga_nervosa",
			"name": "Kyllinga nervosa",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "leptailurus_serval",
			"name": "Leptailurus serval",
			"eng": "Serval",
			"swe": "Serval",
			"chi": "\u85ae\u732b",
			"group": 2,
			"iucn": "LC",
			"image": "LEPSER",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "rhabdomys_pumilio",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "lantana_ukambensis",
			"name": "Lantana ukambensis",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "lonchocarpus_eriocalyx",
			"name": "Lonchocarpus eriocalyx",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "loxodonta_africana",
			"name": "Loxodonta africana",
			"eng": "African bush elephant",
			"swe": "Savannelefant",
			"chi": "\u975e\u6d32\u8c61",
			"group": 6,
			"iucn": "EN",
			"image": "LOXAFR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "abutilon_bidentatum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acalypha_fruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_senegal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "allophylus_rubifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "blepharis_acanthodioides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "capparis_tomentosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_quadrangularis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_rotundifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commelina_africana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_merkeri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cordia_ovalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_dichogamus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_glumosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_ingens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_fallax",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_trichocarpa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_lunariifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "iboza_spp.",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_basiflora",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "maerua_cafra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pappea_capensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavetta_assimilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phyllanthus_sepialis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhoicissus_revoilii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sclerocarya_birrea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_ehrenbergii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ximenia_caffra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ziziphus_abyssinica",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "lycaon_pictus",
			"name": "Lycaon pictus",
			"eng": "African wild dog",
			"swe": "Afrikansk vildhund",
			"chi": "\u91ce\u72d7",
			"group": 1,
			"iucn": "EN",
			"image": "LYCPIC",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aepyceros_melampus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "alcelaphus_buselaphus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "damaliscus_korrigum",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "equus_quagga",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kobus_ellipsiprymnus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ourebia_ourebi",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phacochoerus_africanus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "redunca_redunca",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhabdomys_pumilio",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "tragelaphus_scriptus",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "madoqua_kirkii",
			"name": "Madoqua kirkii",
			"eng": "Kirk's dik-dik",
			"swe": "Kirks dik-dik",
			"chi": "\u67ef\u6c0f\u72ac\u7f9a",
			"group": 6,
			"iucn": "LC",
			"image": "MADKIR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acalypha_fruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "achyranthes_aspera",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "allophylus_rubifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aloe_macrosiphon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "boscia_angustifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "capparis_tomentosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_ciliare",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commelina_africana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_trothae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cordia_ovalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_glumosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_trichocarpa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_lunariifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hoslundia_opposita",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_basiflora",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "indigofera_hochstetteri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kalanchoe_prittwitzii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "maerua_cafra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ocimum_dambicola",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_ehrenbergii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_dennekense",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_nigrum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "maerua_cafra",
			"name": "Maerua cafra",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "MAETRI",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "microchloa_kunthii",
			"name": "Microchloa kunthii",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ocimum_dambicola",
			"name": "Ocimum dambicola",
			"eng": null,
			"swe": null,
			"chi": "\u4e39\u76ae\u8349",
			"group": 13,
			"iucn": "NE",
			"image": "icon-annual-flower",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "olea_capensis",
			"name": "Olea capensis",
			"eng": "Black ironwood",
			"swe": null,
			"chi": "\u6728\u7280\u6984\u5c5e ",
			"group": 11,
			"iucn": "LC",
			"image": "OLE",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "tree",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ourebia_ourebi",
			"name": "Ourebia ourebi",
			"eng": "Oribi",
			"swe": "Oribi",
			"chi": "\u4f8f\u7f9a",
			"group": 3,
			"iucn": "LC",
			"image": "OUROUR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "panicum_coloratum",
			"name": "Panicum coloratum",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "PANCOL",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "panicum_deustum",
			"name": "Panicum deustum",
			"eng": null,
			"swe": null,
			"chi": "\u5706\u9525\u82b1",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "panthera_leo",
			"name": "Panthera leo",
			"eng": "Lion",
			"swe": "Lejon",
			"chi": "\u72ee\u5b50",
			"group": 1,
			"iucn": "VU",
			"image": "PANLEO",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aepyceros_melampus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "alcelaphus_buselaphus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 1000
				},
				{
					"type": "node",
					"node_id": "crocuta_crocuta",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "damaliscus_korrigum",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "equus_quagga",
					"interaction": "predation",
					"preference": 200
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "giraffa_camelopardalis",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kobus_ellipsiprymnus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ourebia_ourebi",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panthera_leo",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phacochoerus_africanus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "redunca_redunca",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhabdomys_pumilio",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "syncerus_caffer",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "taurotragus_oryx",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "tragelaphus_scriptus",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "panicum_maximum",
			"name": "Panicum maximum",
			"eng": "Megathyrsus maximus",
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "PANMAX",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "panthera_pardus",
			"name": "Panthera pardus",
			"eng": "Leopard",
			"swe": "Leopard",
			"chi": "\u8c79",
			"group": 1,
			"iucn": "VU",
			"image": "PANPAR",
			"color": "#ea4335",
			"type": "animal",
			"animal": {
				"food": "carnivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acinonyx_jubatus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aepyceros_melampus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "alcelaphus_buselaphus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "canis_aureus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "canis_mesomelas",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "connochaetes_taurinus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "damaliscus_korrigum",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "equus_quagga",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "nanger_granti",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eudorcas_thomsonii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heterohyrax_brucei",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kobus_ellipsiprymnus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "leptailurus_serval",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "madoqua_kirkii",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ourebia_ourebi",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "papio_anubis",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pedetes_capensis",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phacochoerus_africanus",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "redunca_redunca",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhabdomys_pumilio",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "taurotragus_oryx",
					"interaction": "predation",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "tragelaphus_scriptus",
					"interaction": "predation",
					"preference": 100
				}
			]
		},
		{
			"id": "panicum_repens",
			"name": "Panicum repens",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "LC",
			"image": "PANREP",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "papio_anubis",
			"name": "Papio anubis",
			"eng": "Olive baboon",
			"swe": "Anubisbabian",
			"chi": "\u72d2\u72d2",
			"group": 6,
			"iucn": "LC",
			"image": "PAPANU",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acalypha_fruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_robusta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_senegal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_seyal",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_xanthophloea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "albizia_harveyi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "balanites_aegyptiaca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "capparis_tomentosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_rotundifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_trothae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_dichogamus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "crotalaria_spinosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_milanjiana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_velutina",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "echinochloa_haploclada",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "euphorbia_candelabrum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ipomoea_obscura",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kigelia_africana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_deustum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sarga_versicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sclerocarya_birrea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "pappea_capensis",
			"name": "Pappea capensis",
			"eng": "Pappea",
			"swe": null,
			"chi": "\u756a\u6728\u74dc",
			"group": 13,
			"iucn": "LC",
			"image": "PAPCAP",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pavetta_assimilis",
			"name": "Pavetta assimilis",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pavonia_patens",
			"name": "Pavonia patens",
			"eng": null,
			"swe": null,
			"chi": "\u7d2b\u8349",
			"group": 13,
			"iucn": "NE",
			"image": "icon-herb",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pedetes_capensis",
			"name": "Pedetes capensis",
			"eng": "South African springhare",
			"swe": "Springhare",
			"chi": "\u8df3\u5154",
			"group": 3,
			"iucn": "LC",
			"image": "PEDCAP",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_pycnothrix",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_diagonalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_ternata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_exasperata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "pellaea_calomelanos",
			"name": "Pellaea calomelanos",
			"eng": null,
			"swe": null,
			"chi": "\u5343\u91cc\u9999",
			"group": 13,
			"iucn": "NE",
			"image": "PELCAL",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pennisetum_mezianum",
			"name": "Pennisetum mezianum",
			"eng": null,
			"swe": null,
			"chi": "\u58a8\u897f\u54e5\u72fc\u5c3e\u8349",
			"group": 9,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pennisetum_stramineum",
			"name": "Pennisetum stramineum",
			"eng": null,
			"swe": null,
			"chi": "\u72fc\u5c3e\u8349",
			"group": 10,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "phacochoerus_africanus",
			"name": "Phacochoerus africanus",
			"eng": "Common warthog",
			"swe": "V\u00e5rtsvin",
			"chi": "\u75a3\u732a",
			"group": 3,
			"iucn": "LC",
			"image": "PHAAET",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_gayana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "echinochloa_haploclada",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_exasperata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "phragmites_mauritianus",
			"name": "Phragmites mauritianus",
			"eng": null,
			"swe": null,
			"chi": "\u82a6\u82c7",
			"group": 11,
			"iucn": "LC",
			"image": "PHRMAU",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "phyllanthus_sepialis",
			"name": "Phyllanthus sepialis",
			"eng": null,
			"swe": null,
			"chi": "\u6960\u7af9",
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "procavia_capensis",
			"name": "Procavia capensis",
			"eng": "Rock hyrax",
			"swe": "Klipphyrax",
			"chi": "\u8e44\u5154",
			"group": 5,
			"iucn": "LC",
			"image": "PROCAP",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "abutilon_bidentatum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acalypha_fruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_robusta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "achyranthes_aspera",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "albizia_harveyi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "albuca_abyssinica",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "allophylus_rubifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aloe_macrosiphon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aloe_secundiflora",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "blepharis_acanthodioides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "capparis_tomentosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_ciliare",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_pycnothrix",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_quadrangularis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cissus_rotundifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commelina_africana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "combretum_molle",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "commiphora_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cordia_ovalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_dichogamus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cyperus_juncelliformis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cyphostemma_princeae",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_ternata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "diheteropogon_amplectens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "emilia_coccinea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_aspera",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eriochloa_nubica",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_glumosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ficus_ingens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_fallax",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_trichocarpa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_lunariifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hoslundia_opposita",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hypoestes_forskaolii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "iboza_spp.",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ipomoea_obscura",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "jasminum_stenolobum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kedrostis_foetidissima",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "kyllinga_nervosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "maerua_cafra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "microchloa_kunthii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ocimum_dambicola",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pappea_capensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavetta_assimilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pavonia_patens",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pellaea_calomelanos",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_stramineum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "phyllanthus_sepialis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pupalia_lappacea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "rhoicissus_revoilii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sclerocarya_birrea",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "senna_didymobotrya",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_ehrenbergii",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sansevieria_suffruticosa",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_dennekense",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_nigrum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pellucidus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_stapfianus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "turraea_fischeri",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "ximenia_caffra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "psilolemma_jaegeri",
			"name": "Psilolemma jaegeri",
			"eng": "Psilolemma",
			"swe": null,
			"chi": null,
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "pupalia_lappacea",
			"name": "Pupalia lappacea",
			"eng": null,
			"swe": null,
			"chi": "up\u8349",
			"group": 13,
			"iucn": "LC",
			"image": "icon-annual-flower",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "redunca_redunca",
			"name": "Redunca redunca",
			"eng": "Bohor reedbuck",
			"swe": "Bohorr\u00f6rbock",
			"chi": "\u82c7\u7f9a",
			"group": 3,
			"iucn": "LC",
			"image": "REDRED",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyperthelia_dissoluta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "rhabdomys_pumilio",
			"name": "Rhabdomys pumilio",
			"eng": "Four-striped grass mouse",
			"swe": null,
			"chi": "\u7eb9\u9f20\u5c5e ",
			"group": 3,
			"iucn": "LC",
			"image": "RHAPUM",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_roxburghiana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eragrostis_tenuifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "rhoicissus_revoilii",
			"name": "Rhoicissus revoilii",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "RHOREV",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sarga_versicolor",
			"name": "Sarga versicolor",
			"eng": null,
			"swe": "Sorghum versicolor",
			"chi": "\u6742\u8272\u85fb",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "sclerocarya_birrea",
			"name": "Sclerocarya birrea",
			"eng": null,
			"swe": "Marula",
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "SCLBIR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "senna_didymobotrya",
			"name": "Senna didymobotrya",
			"eng": null,
			"swe": "Kandelaberkassia",
			"chi": "\u756a\u6cfb\u53f6\u53cc\u6b67",
			"group": 13,
			"iucn": "LC",
			"image": "SENDID",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sansevieria_ehrenbergii",
			"name": "Sansevieria ehrenbergii",
			"eng": "Dracaena hanningtonii",
			"swe": null,
			"chi": "\u9ed1\u5e26\u864e\u5c3e\u8349",
			"group": 13,
			"iucn": "NE",
			"image": "SENEHR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sansevieria_suffruticosa",
			"name": "Sansevieria suffruticosa",
			"eng": "Dracaena suffruticosa",
			"swe": null,
			"chi": "\u864e\u8033\u8349",
			"group": 13,
			"iucn": "NE",
			"image": "SENSUF",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "setaria_pallidefusca",
			"name": "Setaria pallidefusca",
			"eng": null,
			"swe": null,
			"chi": "\u72d7\u5c3e\u8349",
			"group": 11,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "setaria_sphacelata",
			"name": "Setaria sphacelata",
			"eng": null,
			"swe": null,
			"chi": "\u72d7\u5c3e\u8349",
			"group": 11,
			"iucn": "LC",
			"image": "SETSPH",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "sida_rhombifolia",
			"name": "Sida rhombifolia",
			"eng": null,
			"swe": "Smalmalva",
			"chi": "\u6241\u6843",
			"group": 9,
			"iucn": "NE",
			"image": "SID",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "solanum_dennekense",
			"name": "Solanum dennekense",
			"eng": null,
			"swe": null,
			"chi": "\u9f99\u8475",
			"group": 13,
			"iucn": "LC",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "solanum_incanum",
			"name": "Solanum incanum",
			"eng": "Thorn apple",
			"swe": "Bitteräpple",
			"chi": "\u8304\u8304",
			"group": 9,
			"iucn": "LC",
			"image": "SOLINC",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "herb",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "solanum_nigrum",
			"name": "Solanum nigrum",
			"eng": null,
			"swe": "Nattskatta",
			"chi": "\u9f99\u8475",
			"group": 13,
			"iucn": "NE",
			"image": "SOLNIG",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "annual",
				"stem": "nonwoody",
				"age": "annual"
			},
			"relations": []
		},
		{
			"id": "sporobolus_festivus",
			"name": "Sporobolus festivus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_fimbriatus",
			"name": "Sporobolus fimbriatus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_ioclados",
			"name": "Sporobolus ioclados",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_pellucidus",
			"name": "Sporobolus pellucidus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_pyramidalis",
			"name": "Sporobolus pyramidalis",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "SPOPYR",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_spicatus",
			"name": "Sporobolus spicatus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 8,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "sporobolus_stapfianus",
			"name": "Sporobolus stapfianus",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "LC",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "syncerus_caffer",
			"name": "Syncerus caffer",
			"eng": "African buffalo",
			"swe": "Afrikansk buffel",
			"chi": "\u6c34\u725b",
			"group": 6,
			"iucn": "NT",
			"image": "SYNCAF",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "andropogon_greenwayi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "aristida_adoensis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "brachiaria_semiundulata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "croton_macrostachyus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_macroblephara",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "harpachne_schimperi",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hibiscus_diversifolius",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_coloratum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "pennisetum_mezianum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sida_rhombifolia",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "solanum_incanum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_ioclados",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "sporobolus_pyramidalis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "taurotragus_oryx",
			"name": "Taurotragus oryx",
			"eng": "Common eland",
			"swe": "Vanlig eland",
			"chi": "\u725b\u5934\u89d2\u7f9a",
			"group": 3,
			"iucn": "LC",
			"image": "TAUORY",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "acacia_tortilis",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "bothriochloa_insculpta",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "chloris_roxburghiana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "combretum_molle",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "cynodon_dactylon",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "digitaria_milanjiana",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "duosperma_kilimandscharica",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "eustachys_paspaloides",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "grewia_bicolor",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "lonchocarpus_eriocalyx",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_deustum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "panicum_maximum",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "setaria_pallidefusca",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "setaria_sphacelata",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "themeda_triandra",
			"name": "Themeda triandra",
			"eng": "Kangaroo grass",
			"swe": "K\u00e4ngurugr\u00e4s",
			"chi": null,
			"group": 9,
			"iucn": "NE",
			"image": "THETRI",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "tragelaphus_scriptus",
			"name": "Tragelaphus scriptus",
			"eng": "Harnessed bushbuck",
			"swe": "Buskbock",
			"chi": "\u85ae\u7f9a ",
			"group": 3,
			"iucn": "LC",
			"image": "TRASCR",
			"color": "#fbbc05",
			"type": "animal",
			"animal": {
				"food": "herbivore"
			},
			"relations": [
				{
					"type": "node",
					"node_id": "echinochloa_haploclada",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "heteropogon_contortus",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "hyparrhenia_filipendula",
					"interaction": "herbivory",
					"preference": 100
				},
				{
					"type": "node",
					"node_id": "themeda_triandra",
					"interaction": "herbivory",
					"preference": 100
				}
			]
		},
		{
			"id": "tricholaena_teneriffae",
			"name": "Tricholaena teneriffae",
			"eng": null,
			"swe": null,
			"chi": null,
			"group": 13,
			"iucn": "NE",
			"image": "icon-grass",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "turraea_fischeri",
			"name": "Turraea fischeri",
			"eng": null,
			"swe": null,
			"chi": "\u675c\u9e43\u82b1",
			"group": 13,
			"iucn": "NE",
			"image": "icon-shrub",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "typha_capensis",
			"name": "Typha capensis",
			"eng": null,
			"swe": null,
			"chi": "\u9999\u84b2",
			"group": 11,
			"iucn": "LC",
			"image": "TYPCAP",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "graminoid",
				"stem": "nonwoody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ximenia_caffra",
			"name": "Ximenia caffra",
			"eng": null,
			"swe": null,
			"chi": "\u897f\u6885\u5c3c\u4e9a",
			"group": 13,
			"iucn": "LC",
			"image": "XIMCAF",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		},
		{
			"id": "ziziphus_abyssinica",
			"name": "Ziziphus abyssinica",
			"eng": null,
			"swe": null,
			"chi": "\u9752\u67a3",
			"group": 13,
			"iucn": "LC",
			"image": "ZIZ",
			"color": "#34a853",
			"type": "plant",
			"plant": {
				"size": "shrub",
				"stem": "woody",
				"age": "perennial"
			},
			"relations": []
		}
	],
	"events": [],
	"scenarios": [
		{
			"id": "serengeti_all",
			"name": "Serengeti All",
			"actors": [
				{
					"node_id": "abutilon_bidentatum"
				},
				{
					"node_id": "acalypha_fruticosa"
				},
				{
					"node_id": "acacia_robusta"
				},
				{
					"node_id": "acacia_senegal"
				},
				{
					"node_id": "acacia_seyal"
				},
				{
					"node_id": "acacia_tortilis"
				},
				{
					"node_id": "acacia_xanthophloea"
				},
				{
					"node_id": "achyranthes_aspera"
				},
				{
					"node_id": "acinonyx_jubatus"
				},
				{
					"node_id": "aepyceros_melampus"
				},
				{
					"node_id": "albizia_harveyi"
				},
				{
					"node_id": "albuca_abyssinica"
				},
				{
					"node_id": "alcelaphus_buselaphus"
				},
				{
					"node_id": "allophylus_rubifolius"
				},
				{
					"node_id": "aloe_macrosiphon"
				},
				{
					"node_id": "aloe_secundiflora"
				},
				{
					"node_id": "andropogon_greenwayi"
				},
				{
					"node_id": "andropogon_schirensis"
				},
				{
					"node_id": "aristida_adoensis"
				},
				{
					"node_id": "balanites_aegyptiaca"
				},
				{
					"node_id": "blepharis_acanthodioides"
				},
				{
					"node_id": "boscia_angustifolia"
				},
				{
					"node_id": "bothriochloa_insculpta"
				},
				{
					"node_id": "brachiaria_semiundulata"
				},
				{
					"node_id": "canis_aureus"
				},
				{
					"node_id": "canis_mesomelas"
				},
				{
					"node_id": "capparis_tomentosa"
				},
				{
					"node_id": "caracal_caracal"
				},
				{
					"node_id": "pennisetum_ciliare"
				},
				{
					"node_id": "chloris_gayana"
				},
				{
					"node_id": "chloris_pycnothrix"
				},
				{
					"node_id": "chloris_roxburghiana"
				},
				{
					"node_id": "cissus_quadrangularis"
				},
				{
					"node_id": "cissus_rotundifolia"
				},
				{
					"node_id": "commelina_africana"
				},
				{
					"node_id": "commiphora_merkeri"
				},
				{
					"node_id": "commiphora_trothae"
				},
				{
					"node_id": "combretum_molle"
				},
				{
					"node_id": "commiphora_schimperi"
				},
				{
					"node_id": "connochaetes_taurinus"
				},
				{
					"node_id": "cordia_ovalis"
				},
				{
					"node_id": "crocuta_crocuta"
				},
				{
					"node_id": "croton_dichogamus"
				},
				{
					"node_id": "croton_macrostachyus"
				},
				{
					"node_id": "crotalaria_spinosa"
				},
				{
					"node_id": "cymbopogon_excavatus"
				},
				{
					"node_id": "cynodon_dactylon"
				},
				{
					"node_id": "cyperus_juncelliformis"
				},
				{
					"node_id": "cyphostemma_princeae"
				},
				{
					"node_id": "damaliscus_korrigum"
				},
				{
					"node_id": "digitaria_diagonalis"
				},
				{
					"node_id": "digitaria_macroblephara"
				},
				{
					"node_id": "digitaria_milanjiana"
				},
				{
					"node_id": "digitaria_scalarum"
				},
				{
					"node_id": "digitaria_ternata"
				},
				{
					"node_id": "digitaria_velutina"
				},
				{
					"node_id": "diheteropogon_amplectens"
				},
				{
					"node_id": "dinebra_retroflexa"
				},
				{
					"node_id": "duosperma_kilimandscharica"
				},
				{
					"node_id": "echinochloa_haploclada"
				},
				{
					"node_id": "emilia_coccinea"
				},
				{
					"node_id": "equus_quagga"
				},
				{
					"node_id": "eragrostis_aspera"
				},
				{
					"node_id": "eragrostis_cilianensis"
				},
				{
					"node_id": "eragrostis_exasperata"
				},
				{
					"node_id": "eragrostis_tenuifolia"
				},
				{
					"node_id": "eriochloa_nubica"
				},
				{
					"node_id": "euphorbia_candelabrum"
				},
				{
					"node_id": "eustachys_paspaloides"
				},
				{
					"node_id": "ficus_glumosa"
				},
				{
					"node_id": "ficus_ingens"
				},
				{
					"node_id": "ficus_thonningii"
				},
				{
					"node_id": "nanger_granti"
				},
				{
					"node_id": "eudorcas_thomsonii"
				},
				{
					"node_id": "giraffa_camelopardalis"
				},
				{
					"node_id": "grewia_bicolor"
				},
				{
					"node_id": "grewia_fallax"
				},
				{
					"node_id": "grewia_trichocarpa"
				},
				{
					"node_id": "harpachne_schimperi"
				},
				{
					"node_id": "heliotropium_steudneri"
				},
				{
					"node_id": "heterohyrax_brucei"
				},
				{
					"node_id": "heteropogon_contortus"
				},
				{
					"node_id": "hibiscus_diversifolius"
				},
				{
					"node_id": "hibiscus_lunariifolius"
				},
				{
					"node_id": "hippopotamus_amphibius"
				},
				{
					"node_id": "hoslundia_opposita"
				},
				{
					"node_id": "hyperthelia_dissoluta"
				},
				{
					"node_id": "hyparrhenia_filipendula"
				},
				{
					"node_id": "hypoestes_forskaolii"
				},
				{
					"node_id": "hyparrhenia_rufa"
				},
				{
					"node_id": "iboza_spp."
				},
				{
					"node_id": "indigofera_basiflora"
				},
				{
					"node_id": "indigofera_hochstetteri"
				},
				{
					"node_id": "ipomoea_obscura"
				},
				{
					"node_id": "jasminum_stenolobum"
				},
				{
					"node_id": "kalanchoe_prittwitzii"
				},
				{
					"node_id": "kedrostis_foetidissima"
				},
				{
					"node_id": "kigelia_africana"
				},
				{
					"node_id": "kobus_ellipsiprymnus"
				},
				{
					"node_id": "kyllinga_nervosa"
				},
				{
					"node_id": "leptailurus_serval"
				},
				{
					"node_id": "lantana_ukambensis"
				},
				{
					"node_id": "lonchocarpus_eriocalyx"
				},
				{
					"node_id": "loxodonta_africana"
				},
				{
					"node_id": "lycaon_pictus"
				},
				{
					"node_id": "madoqua_kirkii"
				},
				{
					"node_id": "maerua_cafra"
				},
				{
					"node_id": "microchloa_kunthii"
				},
				{
					"node_id": "ocimum_dambicola"
				},
				{
					"node_id": "olea_capensis"
				},
				{
					"node_id": "ourebia_ourebi"
				},
				{
					"node_id": "panicum_coloratum"
				},
				{
					"node_id": "panicum_deustum"
				},
				{
					"node_id": "panthera_leo"
				},
				{
					"node_id": "panicum_maximum"
				},
				{
					"node_id": "panthera_pardus"
				},
				{
					"node_id": "panicum_repens"
				},
				{
					"node_id": "papio_anubis"
				},
				{
					"node_id": "pappea_capensis"
				},
				{
					"node_id": "pavetta_assimilis"
				},
				{
					"node_id": "pavonia_patens"
				},
				{
					"node_id": "pedetes_capensis"
				},
				{
					"node_id": "pellaea_calomelanos"
				},
				{
					"node_id": "pennisetum_mezianum"
				},
				{
					"node_id": "pennisetum_stramineum"
				},
				{
					"node_id": "phacochoerus_africanus"
				},
				{
					"node_id": "phragmites_mauritianus"
				},
				{
					"node_id": "phyllanthus_sepialis"
				},
				{
					"node_id": "procavia_capensis"
				},
				{
					"node_id": "psilolemma_jaegeri"
				},
				{
					"node_id": "pupalia_lappacea"
				},
				{
					"node_id": "redunca_redunca"
				},
				{
					"node_id": "rhabdomys_pumilio"
				},
				{
					"node_id": "rhoicissus_revoilii"
				},
				{
					"node_id": "sarga_versicolor"
				},
				{
					"node_id": "sclerocarya_birrea"
				},
				{
					"node_id": "senna_didymobotrya"
				},
				{
					"node_id": "sansevieria_ehrenbergii"
				},
				{
					"node_id": "sansevieria_suffruticosa"
				},
				{
					"node_id": "setaria_pallidefusca"
				},
				{
					"node_id": "setaria_sphacelata"
				},
				{
					"node_id": "sida_rhombifolia"
				},
				{
					"node_id": "solanum_dennekense"
				},
				{
					"node_id": "solanum_incanum"
				},
				{
					"node_id": "solanum_nigrum"
				},
				{
					"node_id": "sporobolus_festivus"
				},
				{
					"node_id": "sporobolus_fimbriatus"
				},
				{
					"node_id": "sporobolus_ioclados"
				},
				{
					"node_id": "sporobolus_pellucidus"
				},
				{
					"node_id": "sporobolus_pyramidalis"
				},
				{
					"node_id": "sporobolus_spicatus"
				},
				{
					"node_id": "sporobolus_stapfianus"
				},
				{
					"node_id": "syncerus_caffer"
				},
				{
					"node_id": "taurotragus_oryx"
				},
				{
					"node_id": "themeda_triandra"
				},
				{
					"node_id": "tragelaphus_scriptus"
				},
				{
					"node_id": "tricholaena_teneriffae"
				},
				{
					"node_id": "turraea_fischeri"
				},
				{
					"node_id": "typha_capensis"
				},
				{
					"node_id": "ximenia_caffra"
				},
				{
					"node_id": "ziziphus_abyssinica"
				}
			]
		},
		{
			"id": "serengeti_1",
			"name": "Serengeti 1",
			"actors": [
				{
					"node_id": "acacia_tortilis"
				},
				{
					"node_id": "aepyceros_melampus"
				},
				{
					"node_id": "allophylus_rubifolius"
				},
				{
					"node_id": "connochaetes_taurinus"
				},
				{
					"node_id": "digitaria_scalarum"
				},
				{
					"node_id": "equus_quagga"
				},
				{
					"node_id": "heteropogon_contortus"
				},
				{
					"node_id": "kobus_ellipsiprymnus"
				},
				{
					"node_id": "crocuta_crocuta"
				},
				{
					"node_id": "madoqua_kirkii"
				},
				{
					"node_id": "eustachys_paspaloides"
				},
				{
					"node_id": "panthera_leo"
				},
				{
					"node_id": "themeda_triandra"
				}
			]
		},
		{
			"id": "serengeti_2",
			"name": "Serengeti 2",
			"actors": []
		}
	],
	"tags": []
}
);

export { serengetiData };