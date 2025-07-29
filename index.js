// Imports
const { csv, select, on } = d3;
import { scatterPlot } from "./scatterPlot.js";
import { menu } from "./menu.js";

// import and clean data
const csvUrl = [
    'https://gist.githubusercontent.com/',
    'curran/', // User
    'a08a1080b88344b0c8a7/', // ID of the GIST
    'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/', // Commit
    'iris.csv' // File name
].join('');
const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
}


const colourMap = new Map();
colourMap.set('setosa','red');
colourMap.set('versicolor','blue');
colourMap.set('virginica','green');

// Pulling out the data points to be used as the cx, cy, and radius
const radius = 5;


// Set up the size for the svg
const margin = {top: 20, right: 20, bottom: 40, left: 40};
const width = window.innerWidth;
const height = window.innerHeight;

// Set up the base SVG for the plot
const svg = select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
;

const menuContainer = select('body')
    .append('div')
    .attr('class','menu-container')
;

const xMenu = menuContainer.append('div');
const yMenu = menuContainer.append('div');

// Render the scatter plot
const main = async () => {
    const plot = scatterPlot()
        .width(width)
        .height(height)
        .data(await csv(csvUrl, parseRow))
        .xValue((d) => d.petal_length)
        .yValue((d) => d.petal_length)
        .margin(margin)
        .radius(radius)
        .colourMap(colourMap)
    ;
    const options = [
        { value: 'petal_length', label: 'Petal Length' },
        { value: 'petal_width', label: 'Petal Width' },
        { value: 'sepal_length', label: 'Sepal Length' },
        { value: 'sepal_width', label: 'Sepal Width' }
    ]
    svg.call(plot);
    xMenu.call(
        menu()
            .id('x-menu')
            .labelText('X:')
            .options(options)
            .on('change', value => {
                svg.call(plot.xValue(d => d[value]));
            })
    );
    yMenu.call(
        menu()
            .id('y-menu')
            .labelText('Y:')
            .options(options)
            .on('change', value => {
                svg.call(plot.yValue(d => d[value]));
            })
    );
}

// Call the Main function
main();