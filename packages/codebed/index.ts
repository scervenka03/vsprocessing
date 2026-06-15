
const canvasElement = document.getElementById('canvas');

if (!(canvasElement instanceof HTMLCanvasElement)) {
	throw new Error('Expected a canvas element with id "canvas".');
}

const canvas = canvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
	throw new Error('Expected a 2D canvas context.');
}

const context2d = ctx;

let width = canvas.width;
let height = canvas.height;
let exit = false;

Object.defineProperty(globalThis, 'width', {
	get() {
		return width;
	},
});

Object.defineProperty(globalThis, 'height', {
	get() {
		return height;
	},
});

Object.defineProperty(globalThis, 'exit', {
	get() {
		return exit;
	},
	set(value) {
		exit = Boolean(value);
	},
});

function resizeCanvas(nextWidth = window.innerWidth, nextHeight = window.innerHeight) {
	width = nextWidth;
	height = nextHeight;
	canvas.width = nextWidth;
	canvas.height = nextHeight;
}

function clearCanvas() {
	context2d.clearRect(0, 0, canvas.width, canvas.height);
}

function circle(x: number, y: number, radius: number) {
	context2d.beginPath();
	context2d.arc(x, y, radius, 0, 2 * Math.PI);
	context2d.fillStyle = 'blue';
	context2d.fill();
}

function rect(x: number, y: number, width: number, height: number) {
	context2d.beginPath();
	context2d.rect(x, y, width, height);
	context2d.fillStyle = 'red';
	context2d.fill();
}

function line(x1: number, y1: number, x2: number, y2: number) {
	context2d.beginPath();
	context2d.moveTo(x1, y1);
	context2d.lineTo(x2, y2);
	context2d.strokeStyle = 'black';
	context2d.stroke();
}

function getSketchHook(name: string) {
	const hook = globalThis[name as keyof typeof globalThis];
	return typeof hook === 'function' ? hook.bind(globalThis) : null;
}

async function run() {
	Object.assign(globalThis, {
		canvas,
		ctx: context2d,
		resizeCanvas,
		clearCanvas,
		circle,
		rect,
		line,
	});

	const setup = getSketchHook('setup');
	const draw = getSketchHook('draw');

	resizeCanvas();

	if (setup) {
		setup();
	}

	while (!exit) {
		if (draw) {
			draw();
		}
		await new Promise(requestAnimationFrame);
	}
}

run();