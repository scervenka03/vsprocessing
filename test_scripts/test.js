function setup() {
    resizeCanvas(400, 400);
}

let x1, y1, xSpeed1, ySpeed1;
let x2, y2, xSpeed2, ySpeed2;
x1 = 50;
y1 = 50;
xSpeed1 = 2;
ySpeed1 = 3;
x2 = 350;
y2 = 350;
xSpeed2 = -3;
ySpeed2 = -2;
function draw() {
    clearCanvas();
    circle(x1, y1, 20);
    circle(x2, y2, 20);
    rect(150, 150, 100, 100);
    x1 += xSpeed1;
    y1 += ySpeed1;
    x2 += xSpeed2;
    y2 += ySpeed2;
    if (x1 + 10 > width || x1 - 10 < 0) {
        xSpeed1 *= -1;
    }
    if (y1 + 10 > height || y1 - 10 < 0) {
        ySpeed1 *= -1;
    }
    if (x2 + 10 > width || x2 - 10 < 0) {
        xSpeed2 *= -1;
    }
    if (y2 + 10 > height || y2 - 10 < 0) {
        ySpeed2 *= -1;
    }
    line(x1, y1, x2, y2);
}