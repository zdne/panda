function renderGraph() {

    //Constants for the SVG
    var width = 500,
        height = 500;

    //Set up the colour scale
    var color = d3.scale.category20();

    //Set up the force layout
    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(80)
        .size([width, height]);

    //Append a SVG to the body of the html page. Assign this SVG as an object to svg
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Read the data from the mis element 
    /*
    var mis = document.getElementById('data').innerHTML;
    graph = JSON.parse(mis);
    
    //Creates the graph data structure out of the json data
    force.nodes(graph.nodes)
        .links(graph.links)
        .start()
    */

    // Read CSV
    var csvData = document.getElementById('csvdata').innerHTML;
    var nodes = {};
    var links = d3.csv.parse(csvData);

    //console.log(JSON.stringify(links, " ", 2));

    links.forEach(function (link) {
        link.source = nodes[link.source] ||
            (nodes[link.source] = { name: link.source });
        link.target = nodes[link.target] ||
            (nodes[link.target] = { name: link.target });
    });

    console.log(JSON.stringify(links, " ", 2));
    console.log(JSON.stringify(nodes, " ", 2));

    force.nodes(d3.values(nodes))
        .links(links)
        .start()

    //Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .style("marker-end", "url(#suit)")

    //Do the same with the circles for the nodes - no 
    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag)

    node.append("circle")
        .attr("r", 8)
        .style("fill", function (d) {
            return color(d.group);
        })

    node.append("text")
        .attr("dx", 10)
        .attr("dy", ".35em")
        .text(function (d) {
            return d.name
        })

    //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
    force.on("tick", function () {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        d3.selectAll("circle").attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });

        d3.selectAll("text").attr("x", function (d) {
            return d.x;
        })
            .attr("y", function (d) {
                return d.y;
            });
    });

    //---Insert-------
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function (d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "#4679BD")
        .style("opacity", "0.6");
    //---End Insert---


    svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class", "link.property")
        .attr("marker-end", "url(#end)");


}

function dosomething() {
    console.log("hello!!!");
    var i = 42;
    ++i;
}