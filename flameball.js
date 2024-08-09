//This is a new class that has been im,plemted to control the flames that are produced by the rocket when moving.
//The flames change position according to the arrow key that is pressed

class FlameBall {
    constructor(tempX, tempY, tempR, dir) {
        this.x = tempX;
        this.y = tempY;
        this.radius = tempR;
        this.dir = dir;

        // pick a random color
        this.color = color(255);
        let r = random(3);
        if (r < 1) {
            this.color = color(255, 100, 20, 50); // orange
        } else if (r >= 1 && r < 2) {
            this.color = color(255, 200, 10, 50); // yellow
        } else if (r >= 2) {
            this.color = color(255, 80, 5, 50); // reddish
        }
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.radius);
    }

    //This changes the direction of the flames according to whcih direction is sent to the method
    move() {
        if (this.dir = 'UP') {
            this.x += random(-5, 5);
            this.y -= random(-1, -3);
        }


        if (this.dir = 'DOWN') {
            this.x += random(-5, 5);
            this.y -= random(1, 3);
        }


        if (this.dir = 'LEFT') {
            this.x += random(-1, -3);
            this.y -= random(-5, 5);
        }


        if (this.dir = 'RIGHT') {
            this.x += random(1, 3);
            this.y -= random(-5, 5);
        }

    }

    shrink() {
        // shrink size over time
        this.radius -= 0.4;
    }


}