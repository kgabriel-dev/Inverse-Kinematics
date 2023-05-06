class RobotArm {
    constructor(a, b, len) {
        this.a = a;
        this.len = len;
        
        this.b = this.calculateB(b);
    }

    draw() {
        stroke(0);
        strokeWeight(2);
        
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    calculateB(b) {
        let dx = b.x - this.a.x;
        let dy = b.y - this.a.y;

        let dist = Math.sqrt(dx*dx + dy*dy);

        let ratio = this.len / dist;

        return new Point(this.a.x + dx * ratio, this.a.y + dy * ratio);
    }
}