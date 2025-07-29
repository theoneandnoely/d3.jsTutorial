// TODO(Noel): Look into best method for importing packages/modules
// import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

// import { select, range, line } from 'd3';

let width = window.innerWidth;
let height = window.innerHeight;

const svg = d3.select('body').append('svg');
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

    const n = 6 + (Math.sin(t/40) * 6); // variability to range size
    const data = d3.range(n).map((d) => ({
        x: width/2 + (Math.cos(d * 0.5 + (t/20)) * (width-100)/2),
        y: height/2 + Math.sin(d * 0.5 + (t/20)) * ((height-100)/2),
        r: 20 + (Math.sin(d * 0.5 + t/20)*5),
        fill: `rgba(${(Math.sin(d/20)*50) + (Math.sin(t/50)*100)},${(Math.sin(d/20)*50) + (Math.cos(t/50)*100)}, ${(Math.sin(d/20)*50) + (Math.sin(t/20)*100)}, 1)`
    }));

    svg
        .selectAll('circle')
        .data(data)
        .join('circle') // enters the selection on first pass through, merges with the update on subsequent pass throughs, exits and removes any elements when they are no longer in the data
        .attr('r',(d) => d.r)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('fill', (d) => d.fill)
    ;

    const lineGenerator = d3.line()
        .x((d) => d.x)
        .y((d) => d.y)
    ;

    svg.selectAll('path')
        .data([null])
        .join('path')
        .attr('d', lineGenerator(data))
        .attr('fill', 'none')
        .attr('stroke','black')
        .attr('stroke-width',3)
    ;
    t++;
}, 1000 / fps);