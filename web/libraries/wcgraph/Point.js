export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    offsetVertical(offset) {
        return new Point(this.x, this.y + offset);
    }
    distanceTo(point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    }
}
