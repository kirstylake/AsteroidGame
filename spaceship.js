

class Spaceship {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;

    //additional code for the flame rocket thrusters
    this.flameX = 0;
    this.flameY = 0;
    this.dir = '';
    this.flameball = [];
  }

  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }


  // this is called multiple times by the differnet arrow keys
  makeFlames() {
    var radius = random(20, 40);
    var b = new FlameBall(this.flameX, this.flameY, radius, this.dir);
    this.flameball.push(b);
  }

  draw() {

    //creates the flames coming out of the rocket and shrinks them the further they get from the spacecraft
    for (let i = this.flameball.length - 1; i >= 0; i--) {
      this.flameball[i].move();
      this.flameball[i].show();
      this.flameball[i].shrink();

      if (this.flameball[i].radius <= 0) {
        //remove the ones that are too far
        this.flameball.splice(i, 1);
      }
    }

    fill(153, 0, 153);
    triangle(this.location.x - this.size / 2, this.location.y + this.size / 2,
      this.location.x + this.size / 2, this.location.y + this.size / 2,
      this.location.x, this.location.y - this.size / 2);

    //add a window to the rocket
    fill(255, 153, 255)
    ellipse(this.location.x, this.location.y + 5, this.size / 2, this.size / 2);

  }

  move() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(this.maxVelocity);

  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  interaction() {
    //these have all been adapted to draw the flmae thrusters on different sides of the rocket
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0));
      this.flameX = this.location.x + 30;
      this.flameY = this.location.y;
      this.dir = 'LEFT';
      this.makeFlames();

    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.applyForce(createVector(0.1, 0));
      this.flameX = this.location.x - 30
      this.flameY = this.location.y;
      this.dir = 'RIGHT';
      this.makeFlames();

    }
    if (keyIsDown(UP_ARROW)) {
      this.applyForce(createVector(0, -0.1));
      this.flameX = this.location.x;
      this.flameY = this.location.y + 30;
      this.dir = 'UP';
      this.makeFlames();
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.applyForce(createVector(0, 0.1));
      this.flameX = this.location.x;
      this.flameY = this.location.y - 30;
      this.dir = 'DOWN';
      this.makeFlames();
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  setNearEarth() {
    this.applyForce(createVector(0, 0.05));
    var friction = this.velocity.copy();
    friction.mult(-0.3);
    this.applyForce(friction);

  }


}