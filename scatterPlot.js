const {
    scaleLinear, 
    extent, 
    axisLeft, 
    axisBottom,
    transition
} = d3;

export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let margin;
    let radius;
    let colourMap;

    const my = (selection) => {
        const x = scaleLinear()
            .domain(extent(data, xValue))
            .range([margin.left, width - margin.right])
        ;

        const y = scaleLinear()
            .domain(extent(data, yValue))
            .range([height - margin.bottom, margin.top])
        ;

        const marks = data.map(d => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
            title: `Species: ${d.species.charAt(0).toUpperCase() + d.species.slice(1)}\nPetal Length: ${xValue(d)} cm\nSepal Length: ${yValue(d)} cm`,
            fill: colourMap.get(d.species)
        }));

        const t = transition()
            .duration(250)
        ;

        selection
            .selectAll('circle')
            .data(marks)
            .join(
                (enter) => enter
                    .append('circle')
                        .attr('cx', (d) => d.x)
                        .attr('cy', (d) => d.y)
                        .attr('r',0)
                        .attr('fill', (d) => d.fill)
                    .call((enter) => 
                        enter.transition(t).attr('r',radius)),
                (update) => update
                    .call((update) => 
                        update
                            .transition(t)
                            .attr('cx',(d) => d.x)
                            .attr('cy', (d) => d.y)
                            // .delay((d,i) => i * 2)
                        ),
                (exit) => exit.remove()
                )
        ;

        selection
            .selectAll('g.yAxis')
            .data([null])
            .join('g')
            .attr('class','yAxis')
            .attr('transform',`translate(${margin.left}, 0)`)
            .call(axisLeft(y))
        ;

        selection
            .selectAll('g.xAxis')
            .data([null])
            .join('g')
            .transition(t)
            .attr('class','xAxis')
            .attr('transform',`translate(0,${height - margin.bottom})`)
            .call(axisBottom(x))
        ;
    };    


    my.width = function (_) {
        return arguments.length ? ((width = +_), my) : width;
    };

    my.height = function (_) {
        return arguments.length ? ((height = +_), my) : height;
    };

    my.data = function (_) {
        return arguments.length ? ((data = _), my) : data;
    }

    my.xValue = function (_) {
        return arguments.length ? ((xValue = _), my) : xValue;
    }

    my.yValue = function (_) {
        return arguments.length ? ((yValue = _), my) : yValue;
    }

    my.margin = function (_) {
        return arguments.length ? ((margin = _), my) : margin;
    }

    my.radius = function (_) {
        return arguments.length ? ((radius = +_), my) : radius;
    }

    my.colourMap = function (_) {
        return arguments.length ? ((colourMap = _), my) : colourMap;
    }

    return my;
};