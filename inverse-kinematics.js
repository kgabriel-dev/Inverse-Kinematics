let lastClickedPosition = null;

function setup() {
    createCanvas(750, 500);
}

function draw() {
    background(128);

    if(lastClickedPosition) {
        fill(255, 0, 0);
        ellipse(lastClickedPosition.x, lastClickedPosition.y, 10, 10);
    }
}

function mouseClicked() {
    lastClickedPosition = {x: mouseX, y: mouseY};
}