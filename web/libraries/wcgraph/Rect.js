import { Margin } from "./Margin.js";
import { Point } from "./Point.js";
export class Rect {
    static create(x, y, width, height) {
        return new Rect(new Point(x, y), new Point(x + width, y + height));
    }
    static fromRadius(point, radius) {
        return Rect.create(point.x - radius, point.y - radius, radius * 2, radius * 2);
    }
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.x = min.x;
        this.y = min.y;
        this.width = max.x - min.x;
        this.height = max.y - min.y;
    }
    getCenter() {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }
    contains(point) {
        return this.min.x <= point.x && point.x <= this.max.x && this.min.y <= point.y && point.y <= this.max.y;
    }
    apply(margin) {
        return Rect.create(this.x + margin.left, this.y + margin.top, this.width - margin.left - margin.right, this.height - margin.top - margin.bottom);
    }
}
