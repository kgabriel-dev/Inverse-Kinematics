const epsilon = 0.1;

function moveUsingFabrik(target, robotArms) {
    _fabrikBackwards(target, robotArms);
    _fabrikForwards(target, robotArms);
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