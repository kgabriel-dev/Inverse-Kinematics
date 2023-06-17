let SIZE = Math.ceil(Math.min(500, window.innerWidth * 0.8, window.innerHeight * 0.8));
const FIXATION = new Point(SIZE/2, SIZE/2);

let lastClickedPosition = null;
let robotArms = [];
let totalArmsLength = 0;

const variableMap = {
    'arm-length': 0,
    'arms-number': 0
};

function setup() {
    readInValues();

    const canvas = createCanvas(SIZE, SIZE);
    canvas.parent('canvas');
    canvas.mouseClicked(mouseClickedInCanvas);

    const robotArmLength = Math.ceil(SIZE / 2 * 0.8 / variableMap['arms-number']);
    for(let i = 0; i < variableMap['arms-number']; i++)
        robotArms.push(new RobotArm({x: FIXATION.x, y: FIXATION.y + i*robotArmLength}, {x: FIXATION.x, y: FIXATION.y + (i+1) * robotArmLength}, robotArmLength));
    document.getElementById('arm-length').value = robotArmLength;

    totalArmsLength = getTotalArmsLength(robotArms);

    lastClickedPosition = new Point(
        FIXATION.x + Math.cos(Math.random() * 2 * Math.PI) * (totalArmsLength / 2),
        FIXATION.y + Math.sin(Math.random() * 2 * Math.PI) * (totalArmsLength / 2)
    );

    moveUsingFabrik(lastClickedPosition, robotArms);
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

function mouseClickedInCanvas() {
    lastClickedPosition = new Point(mouseX, mouseY);
    moveUsingFabrik(new Point(mouseX, mouseY), robotArms);
}

function valueChange(id) {
    let value = document.getElementById(id).value;
    
    if(Number.isNaN(value)) return;
    value = Number(value);

    if(variableMap[id])
        variableMap[id] = value;
    else return;
    
    if(id == 'arm-length') {
        robotArms.forEach(arm => arm.len = value);
        totalArmsLength = getTotalArmsLength(robotArms);

        moveUsingFabrik(lastClickedPosition, robotArms);
    }
    else if(id == 'arms-number') {
        robotArms = [];
        const robotArmLength = variableMap['arm-length'];

        for(let i = 0; i < value; i++)
            robotArms.push(new RobotArm({x: FIXATION.x, y: FIXATION.y + i*robotArmLength}, {x: FIXATION.x, y: FIXATION.y + (i+1) * robotArmLength}, robotArmLength));
        
        totalArmsLength = getTotalArmsLength(robotArms);
        moveUsingFabrik(lastClickedPosition, robotArms);
    }
}

function readInValues() {
    for(let id in variableMap) {
        let value = document.getElementById(id).value;
        
        if(Number.isNaN(value)) {
            console.log(`Value of ${id} is NaN`);
            continue;
        };
        
        variableMap[id] = Number(value);
    }
}