document.addEventListener('DOMContentLoaded', function(event) {
    const bggen = document.createElement('bggen');
    const parent = document.querySelector('.bggen');
    parent.appendChild(bggen);
	const width = bggen.clientWidth;
	const height = bggen.clientHeight;
	console.log('height', height);
	const c = {
		x: Math.floor(Math.random() * width),
		y: Math.floor(Math.random() * height),
		r: Math.floor(Math.random() * 50),
	};
	const content = `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" stroke="black" stroke-width="3" fill="red" />`;
	const svg = `<svg>${content}</svg>`;
	bggen.innerHTML = svg;


});
