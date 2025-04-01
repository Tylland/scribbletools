import { Margin } from "./Margin.ts";
import { Point } from "./Point.ts";
import type { IRect } from "./IRect.ts";

export class Rect implements IRect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public static create(x: number, y: number, width: number, height: number): IRect {
        return new Rect(new Point(x, y), new Point(x + width, y + height));
    }

    public static fromRadius(point: Point, radius: number): IRect {
        return Rect.create(point.x - radius, point.y - radius, radius * 2, radius * 2);
    }

    constructor(public min: Point, public max: Point) {
        this.x = min.x;
        this.y = min.y;
        this.width = max.x - min.x;
        this.height = max.y - min.y;
    }
    getCenter(): Point {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    contains(point: Point): boolean {
        return this.min.x <= point.x && point.x <= this.max.x && this.min.y <= point.y && point.y <= this.max.y;
    }

    apply(margin: Margin): IRect {
        return Rect.create(this.x + margin.left,
            this.y + margin.top,
            this.width - margin.left - margin.right,
            this.height - margin.top - margin.bottom);
    }
}
