const WIDTH = 750;
const HEIGHT = 500;
const FIXATION = new Point(200, 100);

let lastClickedPosition = null;
let robotArms = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);

    const robotArmLength = 100;
    for(let i = 0; i < 3; i++)
        robotArms.push(new RobotArm({x: FIXATION.x, y: FIXATION.y + i*robotArmLength}, {x: FIXATION.x, y: FIXATION.y + (i+1) * robotArmLength}, robotArmLength));
}

function draw() {
    background(150);

    for(let i = 0; i < robotArms.length; i++) {
        robotArms[i].draw(0, robotArms.length - i + 1);
    }

    if(lastClickedPosition) {
        fill(255, 0, 0);
        ellipse(lastClickedPosition.x, lastClickedPosition.y, 10, 10);
    }
}

function mouseClicked() {
    lastClickedPosition = new Point(mouseX, mouseY);
    moveUsingFabrik(new Point(mouseX, mouseY), robotArms);
}