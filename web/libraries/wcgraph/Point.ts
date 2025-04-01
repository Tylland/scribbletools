export class Point {
    constructor(public x: number, public y: number) { }

    offsetVertical(offset: number): Point {
        return new Point(this.x, this.y + offset);
    }

    distanceTo(point: Point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    }
}
