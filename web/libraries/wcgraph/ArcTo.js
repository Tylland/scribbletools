export class Arc {
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.type = 'arc';
        this.counterClockwise = startAngle > endAngle;
    }
}
