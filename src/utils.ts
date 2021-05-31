// Add path to beginning of each element's path
function prependPath(path, array) {
	for (let obj of array) {
		obj.path = path + obj.path;
	}
	return array;
}

// Creates Phaser text object
function createText(scene, x=0, y=0, size=20, color="#FFF", text="") {
	return scene.add.text(x, y, text, {
		fontFamily: "Mukta",
		fontSize: Math.max(size, 1) + "px",
		fill: color
	});
}


export { prependPath, createText };