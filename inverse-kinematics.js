const WIDTH = 750;
const HEIGHT = 500;

let lastClickedPosition = null;
let robotArms = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);

    for(let i = 0; i < 2; i++)
        robotArms.push(new RobotArm({x: WIDTH/2, y: HEIGHT/2 + i*100}, {x: WIDTH/2, y: HEIGHT/2 + (i+1) * 100}, 100));
}

function draw() {
    background(128);

    for(let i = 0; i < robotArms.length; i++) {
        robotArms[i].draw();
    }

    if(lastClickedPosition) {
        fill(255, 0, 0);
        ellipse(lastClickedPosition.x, lastClickedPosition.y, 10, 10);
    }
}

function mouseClicked() {
    lastClickedPosition = {x: mouseX, y: mouseY};
}