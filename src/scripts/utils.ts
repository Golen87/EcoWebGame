// Add path to beginning of each element's path
export function prependPath(path, array) {
	for (let obj of array) {
		obj.path = path + obj.path;
	}
	return array;
}

// Check if variable is Object
export function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

// Add slight randomness to avoid zero values
export function jiggle() {
	return (Math.random() - 0.5) * 1e-2;
}


// General random-ish uuid
export function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}