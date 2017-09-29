const a = [1, 2, 3, 10, 22, 30, 60, 90, 100, 110, 120, 130];

const median = d3.quantile(a, 0.75);

console.log('median', median);
