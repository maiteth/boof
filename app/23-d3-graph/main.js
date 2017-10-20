var width = 960;
var height = 500;
var margin = {
	top: 20,
	bottom: 20,
	left: 20,
	right: 20
}

var svg = d3.select("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

var y = d3.scaleLinear()
	.range([height, 0])
	.domain([-4, 4]);

var yAxis = d3.axisLeft()
	.scale(y)
	.tickSize(10);

svg.append("g")
	.attr("transform", `translate(${(width / 2) + margin.left},${margin.top})`)
	.call(yAxis);

var x = d3.scaleLinear()
	.range([0, width])
	.domain([-4, 4]);

var xAxis = d3.axisBottom()
	.scale(x)
	.tickSize(10);

svg.append("g")
	.attr("transform", `translate(${margin.left}, ${(height / 2) + margin.top})`)
	.call(xAxis);
