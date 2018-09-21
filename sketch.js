var circles = [];
var d = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var w = width/(d*2) - 1;
  var h = height/(d*2) - 1
  for(var x = 0; x < w; x++) {
    for(var y = 0; y < h; y++) {
      circles.push(new Circle(x*2*d + d*1.5, y*2*d + d*1.5, (x+y)%2));
      // circles.push(new Circle(x*2*d + d*1.5, y*2*d + d*1.5, map(x+y*h, 0, w*h, 0, 1)));
    }
  }
}

function draw() {
  colorMode(RGB, 255);
  background(240);

  for(var i in circles) {
    circles[i].display();
  }

  if(mouseIsPressed) {
    var mouse = createVector(mouseX, mouseY);
    for(var i in circles) {
      var move = p5.Vector.sub(mouse, circles[i].location);
      move.setMag(1);
      circles[i].location.add(move);
    }
  } else if(keyIsPressed && key == ' ') {
    var mouse = createVector(mouseX, mouseY);
    for(var i in circles) {
      var move = p5.Vector.sub(circles[i].location, mouse);
      move.setMag(1);
      circles[i].location.add(move);
    }
  } else {
    for(var i in circles) {
      var move = p5.Vector.sub(circles[i].home, circles[i].location);
      if(move.mag() > 1) {
        move.setMag(1);
        circles[i].location.add(move);
      }
    }
  }

}

function Circle(x, y, h) {
    this.home =  createVector(x, y),
    this.h = h,
    this.location = createVector(x, y),
    this.d = d,
    this.display = function() { 
      colorMode(HSB, 1);
      // fill(this.h, .5, 1);
      fill(0, 1, this.h);
      noStroke();
      ellipse(this.location.x, this.location.y, this.d, this.d);
      return true;
    }
}