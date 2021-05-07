class Particle {
    constructor(x, y, r) {

        var options = {
            restitution: .8,
            friction: 0
        };
        x += random(-150, 150);
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.r = r;
        this.red = Math.max(Math.random() * 255, 20);
        this.green = Math.max(Math.random() * 255, 210);
        this.blue = Math.max(Math.random() * 255, 150);
        this.pointValue = 0;
    }

    
    isOffScreen() {
        var x = this.body.position.x;
        var y = this.body.position.y;
        return x < -50 || x > width + 50;
    }

    show() {
        fill(this.red, this.green, this.blue);
        stroke(this.red, this.green, this.blue);
        push();
        var pos = this.body.position;
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }

    setPointValue(value) {
        if (typeof value === 'number')
            this.pointValue = value;
    }
}