var Engine = Matter.Engine,
    World = Matter.World,
     Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var pegs = [];
var boundaries = [];
var particleFrequency = 60;
var columns = 11;
var rows = 10;
let font,
    fontSize = 40;
var totalScoreId = "score";


function preload() {
    font = loadFont('assets/OpenSans-Bold.ttf');
}


function setup() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;

    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    
    initializeCanvas();
}


function initializeCanvas() {
    createCanvas(600, 700);
    var spacing = width / columns;
    populatePegs(spacing);
    populateCanvasBoundaries();
    populatePointZones(spacing);

}


function populatePegs(spacing) {
    let radius = 4;
    for (var row = 0; row < rows; row++){
        for (var col = 0; col < columns; col++){
            var x = col * spacing + 12;
            if (row % 2 == 1)
                x += spacing/2;
            var y = spacing + row * spacing;
            var p = new Peg(x, y, radius);
            pegs.push(p);
        }
    }
}

function populatePointZones(spacing) {
    for (var i = 0; i < columns; i++){
        var h = 70;
        var w = 5;
        var x = i * spacing - w / 2;
        var y = height - h / 2;
        var wall = new Boundary(x, y, w, h);
        boundaries.push(wall);
    }
}


function populateCanvasBoundaries() {
    var bottomHeight = 100;
    var bottomXCoord = width / 2;
    var bottomYCoord = height + bottomHeight / 2;

    var sideWidth = 50;
    var leftXCoord = -1 * sideWidth / 2;
    var rightXCoord = width + sideWidth / 2;
    var sideYCoord = height / 2;

    var left = new Boundary(leftXCoord, sideYCoord, sideWidth, height);
    var right = new Boundary(rightXCoord, sideYCoord, sideWidth, height);
    var bottom = new Boundary(bottomXCoord, bottomYCoord, width, bottomHeight);

    boundaries.push(bottom, left, right);
}


function createNewParticle() {
    var p = new Particle(300, 0, 12);
    particles.push(p);
}


function removeAllParticles() {
    for(var i=0; i < particles.length; i++)
        World.remove(world, particles[i].body);
    particles.splice(0, particles.length);
}


function removeParticle(counter) {
    World.remove(world, particles[counter].body);
    particles.splice(counter, 1);
}


function drawParticles() {
    for(var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen())
            removeParticle(i--);
    }
}


function drawPegs() {
    for(var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
}


function drawBoundaries() {
    for(var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
}


function drawPointLabels() {
    var point = 1;
    var delta = 1;
    var max = Math.round(columns/2);
    var yCoord = 650;
    var zoneWidth = width/columns;
    var offset = zoneWidth / 2 - 2;

    for(var i = 0; i < columns; i++){
        var xCoord = zoneWidth * i + offset;
        drawLabel(point.toString(), xCoord, yCoord);
        if(point == max)
            delta *= -1;
        point += delta;
    }

    
    function drawLabel(value, x, y){
        fill(185);
        stroke(185);
        text(value, x, y);
    }
}



function assignPointValuesAndDisplay() {
    var threshold = 630;   
    var sum = 0;
    var zoneWidth = width/columns;
    
    particles.forEach(setParticlePointValue)
    displaySum();

    
    function setParticlePointValue(particle){
        var yCoord = particle.body.position.y;
        if(yCoord >= threshold){
            var xCoord = particle.body.position.x;
            particle.setPointValue(pointZones(xCoord));
        }
    }

    
    function pointZones(xCoord) {
        var point = 1;
        var delta = 1;
        var max = Math.round(columns/2);

        
        return 0;
    } 

    
    function displaySum() {
        particles.forEach(p => sum += p.pointValue);
        document.getElementById(totalScoreId).innerHTML = sum;
    }
}


function draw() {
    background(50);
    Engine.update(engine);

    //spawnParticles();

    drawPointLabels();
    drawPegs();
    drawParticles();
    drawBoundaries();

    assignPointValuesAndDisplay();
}

function spawnParticles() {
    if (frameCount % particleFrequency == 0) {
        createNewParticle();
    }
}