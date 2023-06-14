const WIDTH = 750;
const HEIGHT = 500;
const FIXATION = new Point(WIDTH/2, HEIGHT/2);

let lastClickedPosition = null;
let robotArms = [];
let robotArmCount = 3;
let robotArmLength = Math.min(WIDTH, HEIGHT) / (2 * robotArmCount + 1);
let totalArmsLength = 0;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    
    for(let i = 0; i < 3; i++)
        robotArms.push(new RobotArm({x: FIXATION.x, y: FIXATION.y + i*robotArmLength}, {x: FIXATION.x, y: FIXATION.y + (i+1) * robotArmLength}, robotArmLength));

    totalArmsLength = getTotalArmsLength(robotArms);
}

function draw() {
    background(150);

    //draw the circle in which points can be reached
    stroke(180, 150, 120);
    strokeWeight(2);
    noFill();
    circle(FIXATION.x, FIXATION.y, totalArmsLength * 2);

    // draw the arms
    for(let i = 0; i < robotArms.length; i++) {
        robotArms[i].draw(0, robotArms.length - i + 2);

        // draw a circle at the links
        if(i < robotArms.length - 1) {
            stroke(0, 0, 255);
            circle(robotArms[i].b.x, robotArms[i].b.y, 4);
        }
    }

    // draw a circle at the last clicked position
    if(lastClickedPosition) {
        fill(255, 0, 0);
        strokeWeight(2);
        ellipse(lastClickedPosition.x, lastClickedPosition.y, 10, 10);
    }
    
    // mark the fixation point
    fill(0, 150, 0);
    noStroke();
    circle(FIXATION.x, FIXATION.y, 4);
}

function mouseClicked() {
    lastClickedPosition = new Point(mouseX, mouseY);
    moveUsingFabrik(new Point(mouseX, mouseY), robotArms);
}