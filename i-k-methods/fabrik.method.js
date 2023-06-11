const epsilon = 0.1;

function moveUsingFabrik(target, robotArms) {
    _fabrikBackwards(target, robotArms);
}

function _fabrikBackwards(target, robotArms) {
    for(let i = robotArms.length; i > 0; i--) {
        const currArm = robotArms[i - 1],
            nextArm = robotArms[i - 2],
            prevArm = robotArms[i];

        console.log(`curr: ${currArm}, next: ${nextArm}, prev: ${prevArm}`);

        currArm.b = prevArm ? prevArm.a : target;
        currArm.a = nextArm ? nextArm.b : FIXATION;

        currArm.calculateA();
    }
}