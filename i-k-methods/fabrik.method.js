const epsilon = 0.1;

function moveUsingFabrik(target, robotArms) {
    _fabrikBackwards(target, robotArms);
}

function _fabrikBackwards(target, robotArms) {
    const lastArm = robotArms[robotArms.length - 1],
        prevArm = robotArms[robotArms.length - 2];

    lastArm.b = target;
    lastArm.a = prevArm.b;
    
    lastArm.calculateA();
}