class RobotArm {
    constructor(a, b, len) {
        this.a = a;
        this.b = b;
        this.len = len;
        
        this.calculateB();
    }

    draw(color=0, weight=2) {
        stroke(color);
        strokeWeight(weight);
        
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    calculateB() {
        const deltaX = this.b.x - this.a.x;
        const deltaY = this.b.y - this.a.y;

        const deltaLength = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        const ratioX = deltaX / deltaLength,
            ratioY = deltaY / deltaLength;

        const newBPosition = {
            x: this.a.x + ratioX * this.len,
            y: this.a.y + ratioY * this.len
        };

        this.b = newBPosition;
    }

    calculateA() {
        const deltaX = this.a.x - this.b.x,
        deltaY = this.a.y - this.b.y;

        const deltaLength = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        const ratioX = deltaX / deltaLength,
            ratioY = deltaY / deltaLength;

        const newAPosition = {
            x: this.b.x + ratioX * this.len,
            y: this.b.y + ratioY * this.len
        }

        this.a = newAPosition;
    }
}