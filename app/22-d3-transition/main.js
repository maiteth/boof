var table = [
	'coucou maite',
	'comment vas-tu',
	'ca va bien'
];



function add() {
	var str = document.querySelector('#text').value;
	table.push(str);
	console.log('table', table);
	refresh();
}

function remove() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	var checkedArray = Array.prototype.map.call(checkboxes, n => n.checked);

	console.log('checkboxes', checkboxes);
	console.log('checkedArray', checkedArray);

	for (var i = checkboxes.length - 1; i >= 0; i--) {
		if (checkedArray[i]) {
			table.splice(i, 1);
		}
	}
	console.log('table', table);

	refresh();
}

function refresh() {
	var selection = d3.select('ul');
	console.log('selection', selection);
	var selectAll = selection.selectAll('li');
	console.log('selectAll', selectAll);

	var bind = selectAll.data(table);
	console.log('bind', bind);

	// enter
	var enter = bind.enter();
	console.log('enter', enter);

	var comingLi = enter.append('li');
	comingLi.style("background-color", "red").transition().duration(2000).ease(d3.easeLinear).style("background-color", "transparent");
		

	// update
	comingLi.merge(bind).html(function(d, i) {
		return `<input type="checkbox" id="li-${i}">${i} - ${d}`;
	});

	// exit
	var exit = bind.exit();
	console.log('exit', exit);
	exit.remove();
}

refresh();
