class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function calculateDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

function getTotalArmsLength(arms) {
    return arms.reduce((acc, arm) => acc + arm.len, 0);
}