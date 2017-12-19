document.addEventListener('DOMContentLoaded', function(event) {
	const bggen = document.createElement('bggen');
	const parent = document.querySelector('.bggen');
	parent.appendChild(bggen);
	const width = bggen.clientWidth;
	const height = bggen.clientHeight;
    console.log('height', height);
    
    const colors = [
        'hsla(0, 100%, 50%, 0.05)',
        'hsla(120, 100%, 50%, 0.05)',
        'hsla(240, 100%, 50%, 0.05)',
        'hsla(60, 100%, 50%, 0.05)',
    ];

	let content = '';
	for (let i = 0; i < 15; i++) {
		const c = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
            r: Math.floor(Math.random() * 50 + 50),
            c: Math.floor(Math.random() * 4),
		};
		content += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" stroke="${colors[0]}" stroke-width="1" fill="${colors[c.c]}" />`;
	}

	const svg = `<svg>${content}</svg>`;
	bggen.innerHTML = svg;


});
