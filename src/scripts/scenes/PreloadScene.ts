import { BaseScene } from "./BaseScene";
import { nodes, images, videos } from "../assets/serengetiAssets";
// import { nodes, images, videos } from "../assets/ecowebAssets";
import { language } from "../language/LanguageManager";
import { GrayScalePostFilter } from "../pipelines/GrayScalePostFilter";
import { BlurPostFilter } from "../pipelines/BlurPostFilter";


export class PreloadScene extends BaseScene {
	constructor() {
		super({key: "PreloadScene"});
	}

	init() {
		let renderer = (this.renderer as Phaser.Renderer.WebGL.WebGLRenderer);
		renderer.pipelines.addPostPipeline("GrayScalePostFilter", GrayScalePostFilter);
		renderer.pipelines.addPostPipeline("BlurPostFilter", BlurPostFilter);
	}

	preload() {
		// Loading bar
		let width = 0.5 * this.W;
		let x = this.CX - width/2;
		let y = this.CY;
		let bg = this.add.rectangle(x, y, width, 4, 0x666666).setOrigin(0, 0.5);
		let bar = this.add.rectangle(x, y, 1, 8, 0xDDDDDD).setOrigin(0, 0.5);

		// Loading text
		let text = this.createText(x, y, 2*bar.height, "#DDDDDD", "Loading...").setOrigin(0, 1.5);

		// Listener
		this.load.on("progress", (progress) => {
			bar.width = progress * width;
		});


		// Load assets

		for (let image of nodes) {
			this.load.image(image.key, image.path);
		}

		for (let image of images) {
			this.load.image(image.key, image.path);
		}

		for (let video of videos) {
			this.load.video(video.key, video.path, "loadeddata", false, true);
		}
	}

	create() {
		this.scene.start("SerengetiScene");
	}

	update(time, delta) {
	}
}