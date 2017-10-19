var data = [
	{ name: 'patate', famille: "legumes", calories: 200 },
	{ name: 'carotte', famille: "legumes", calories: 300 },
	{ name: 'miel', famille: "sucreries", calories: 800 },
	{ name: 'bonbons', famille: "sucreries", calories: 600 },
	{ name: 'pomme', famille: "fruits", calories: 600 },
	{ name: 'poire', famille: "fruits", calories: 600 },
];

var nest = d3.nest()
	.key(function(d) { return d.famille; })
	.key(function(d) { return d.name; })
	.entries(data);

console.log('nest', nest);
