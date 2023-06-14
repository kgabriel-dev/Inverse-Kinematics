
function moveUsingFabrik(target, robotArms) {
    const epsilon = 1;

    let steps = 0;
    let newError = Number.MAX_SAFE_INTEGER - 1, prevError;

    do {
        steps++;
        prevError = newError;

        _fabrikBackwards(target, robotArms);
        _fabrikForwards(target, robotArms);
        
        newError = calculateDistance(target, robotArms[robotArms.length - 1].b);

    } while (newError > epsilon && newError < prevError);

    console.log(`Steps: ${steps}`);
}

function _fabrikBackwards(target, robotArms) {
    for(let i = robotArms.length; i > 0; i--) {
        const currArm = robotArms[i - 1],
            nextArm = robotArms[i - 2],
            prevArm = robotArms[i];

        currArm.b = prevArm ? prevArm.a : target;
        currArm.a = nextArm ? nextArm.b : FIXATION;

        currArm.calculateA();
    }
}

function _fabrikForwards(target, robotArms) {
    for(let i = 0; i < robotArms.length; i++) {
        const currArm = robotArms[i],
            prevArm = robotArms[i - 1],
            nextArm = robotArms[i + 1];

        currArm.a = prevArm ? prevArm.b : FIXATION;
        currArm.b = nextArm ? nextArm.a : target;

        currArm.calculateB();
    }
}