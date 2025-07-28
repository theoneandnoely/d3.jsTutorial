// TODO(Noel): Look into best method for importing packages/modules
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('body').append('svg');
svg
    .attr('width',width)
    .attr('height',height)
    .attr('id','viewport')
;

const n = width / 20;
svg
    .append('g')
        .attr('id','bg')
    .selectAll('rect.horizontal')
    .data(d3.range(n))
    .join('rect')
        .attr('y', (d) => d * 20)
        .attr('width', width)
        .attr('height', 10)
        .attr('class','horizontal')
        .attr('mask', 'url(#mask-bg)')
;
svg
    .append('g')
        .attr('id','shape')
    .selectAll('rect.vertical')
    .data(d3.range(n))
    .join('rect')
        .attr('x', (d) => d * 20)
        .attr('height',height)
        .attr('width',10)
        .attr('class','vertical')
        .attr('mask','url(#mask-shape)')
;

let i = 0;
add_mask('mask-bg', d3.symbol(d3.symbols[i],100000), true);
add_mask('mask-shape', d3.symbol(d3.symbols[i],100000), false);

// OnClick Handler:
document.getElementById('viewport').addEventListener('click', function(e) {
    i++;
    if (i >= d3.symbols.length){
        i = 0;
    }
    console.log(i);
    update_mask(d3.symbol(d3.symbols[i],100000));
})

// Functions:
function add_mask(id, shape, inverted) {
    const m = svg.append('mask').attr('id',id);
    m
        .append('rect')
        .attr('height',height)
        .attr('width',width)
        .attr('fill',inverted ? 'black' : 'white')
    ;
    m
        .append('g')
            .attr('transform',`translate(${width/2},${height/2})`)
        .append('path')
            .attr('d', shape)
            .attr('fill',inverted ? 'white' : 'black')
    ;
    return m
};

function update_mask(shape){
    svg
        .select('mask#mask-bg')
        .select('g')
        .select('path')
            .attr('d',shape)
    ;
    svg
        .select('mask#mask-shape')
        .select('g')
        .select('path')
            .attr('d',shape)
    ;
};