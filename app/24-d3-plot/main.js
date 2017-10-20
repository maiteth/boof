var width = 960;
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

function plot(callback, color) {
	var lineData = d3.range(-4, 4.1, 0.01).map(d => {
		return {
			x: d,
			y: callback(d)
		};
	});

	//This is the accessor function we talked about above
	var lineFunction = d3.line()
		.x(function(d) { return x(d.x); })
		.y(function(d) { return y(d.y); })
		.curve(d3.curveCatmullRom.alpha(0.5));

	svg.append('path')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)
		.attr('d', lineFunction(lineData))
		.attr('stroke', color)
		.attr('stroke-width', 2)
		.attr('fill', 'none');
}

plot(function (x) {
	return x * x;
}, 'blue');

plot(function (x) {
	return -x * x;
}, 'red');

plot(function (x) {
	return Math.sin(x*5);
}, 'green');

plot(function (x) {
	return Math.cos(x*5);
}, 'purple');

plot(function (x) {
	return Math.tan(x);
}, 'DarkSlateGray');
