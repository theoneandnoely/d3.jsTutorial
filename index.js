// TODO(Noel): Look into best method for importing packages/modules
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

let width = window.innerWidth;
let height = window.innerHeight;

let svg = d3.select('body').append('svg');
svg
    .attr('width',width)
    .attr('height',height)
    .attr('id','viewport')
;

const fps = 60;
let t=0;
// setInterval takes a function and an interval in milliseconds and applies the function after every interval
setInterval(() => {
    // Resize the svg to the window size as the window is re-sized
    width = window.innerWidth;
    height = window.innerHeight;
    svg.attr('width',width).attr('height',height);

    const n = 20;
    const data = d3.range(20).map((d) => ({
        x: (d * ((width - (width/(n+2))) / n)) + (width/(n+2)),
        y: (height/2) + Math.sin(d * 0.5 + (t/20)) * ((height -100) / 2)
    }));

    const circles = svg
        .selectAll('circle')
        .data(data)
        .join('circle') // enters the selection on first pass through and merges with the update on subsequent pass throughs
        .attr('r',20)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
    ;
    t++;
}, 1000 / fps);