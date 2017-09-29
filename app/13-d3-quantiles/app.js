const a = [1, 2, 3, 10, 22, 30, 60, 90, 100, 110, 120, 130];

const quartile1 = d3.quantile(a, 0.25);
const median = d3.quantile(a, 0.5);
const quartile2 = d3.quantile(a, 0.75);

console.log('first quartile', quartile1);
console.log('median', median);
console.log('last quartile', quartile2);
