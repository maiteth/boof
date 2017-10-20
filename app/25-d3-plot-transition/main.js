var width = 500;
var height = 500;
var margin = {
	top: 20,
	bottom: 20,
	left: 20,
	right: 20
};

var svg = d3.select('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom);

var y = d3.scaleLinear()
	.range([height, 0])
	.domain([-4, 4]);

var yAxis = d3.axisLeft()
	.scale(y)
	.tickSize(10);

svg.append('g')
	.attr('transform', `translate(${(width / 2) + margin.left},${margin.top})`)
	.call(yAxis);

var x = d3.scaleLinear()
	.range([0, width])
	.domain([-4, 4]);

var xAxis = d3.axisBottom()
	.scale(x)
	.tickSize(10);

svg.append('g')
	.attr('transform', `translate(${margin.left}, ${(height / 2) + margin.top})`)
	.call(xAxis);

function plotTransition(config) {
	config = Object.assign({}, {
		start: 0,
		stop: 2 * Math.PI,
		step: 0.01,
		color1: 'blue',
		color2: 'red',
	}, config);
	console.log('config', config);

	var lineData1 = d3.range(config.start, config.stop, config.step).map(config.callback1);
	var lineData2 = d3.range(config.start, config.stop, config.step).map(config.callback2);

	//This is the accessor function we talked about above
	var lineFunction = d3.line()
		.x(function(d) { return x(d.x); })
		.y(function(d) { return y(d.y); })
		.curve(d3.curveCatmullRom.alpha(0.5));

	svg.append('path')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)
		.attr('d', lineFunction(lineData1))
		.attr('stroke', config.color1)
		.attr('stroke-width', 2)
		.attr('fill', 'none')
		.transition()
		.duration(10000)
		.attr('d', lineFunction(lineData2))
		.attr('stroke', config.color2);
}

var config = {
	callback1: function(t) {
		return {
			x: Math.cos(t),
			y: Math.sin(t)
		};
	},
	callback2: function(t) {
		return {
			x: Math.cos(t) + 2 * Math.cos(t / 2),
			y: Math.sin(t)
		};
	},
	stop: 4 * Math.PI
}

plotTransition(config);
