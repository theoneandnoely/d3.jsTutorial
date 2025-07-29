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

    const n = 10 + (Math.sin(t/20) * 10); // variability to range size
    const data = d3.range(n).map((d) => ({
        x: d * (width/22) + 50,
        y: height/2 + Math.sin(d * 0.5 + (t/20)) * ((height-100)/2),
        r: 20 + (Math.sin(d * 0.5 + t/20)*5),
        fill: `rgba(${(Math.cos(d*0.5)*50) + (Math.sin(t/20)*120)},${(Math.sin(d*0.5)*50) + (Math.cos(t/20)*120)}, ${(Math.cos(d*0.5)*50) + (Math.sin(t/20)*120)}, 1)`
    }));

    // const circles = svg
    //     .selectAll('circle')
    //     .data(data)
    // ;
    // const circlesEnter = circles
    //     .enter()
    //     .append('circle')
    // ;
    // circles.merge(circlesEnter)
    //     .attr('r',20)
    //     .attr('cx',(d) => d.x)
    //     .attr('cy',(d) => d.y)
    // ;
    // circles.exit().remove();

    // Equivalent to the above using only join
    const circles = svg
        .selectAll('circle')
        .data(data)
        .join('circle') // enters the selection on first pass through, merges with the update on subsequent pass throughs, exits and removes any elements when they are no longer in the data
        .attr('r',(d) => d.r)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('fill', (d) => d.fill)
    ;
    t++;
}, 1000 / fps);