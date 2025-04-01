import type { IRect } from "./IRect.ts";
import { Point } from "./Point.ts";
import { Rect } from "./Rect.ts";


export class Extent {
    minX: number = Number.MAX_VALUE;
    maxX: number = -Number.MAX_VALUE;
    minY: number = Number.MAX_VALUE;
    maxY: number = -Number.MAX_VALUE;


    containPoint(point: Point): void {
        this.minX = Math.min(this.minX, point.x);
        this.maxX = Math.max(this.maxX, point.x);
        this.minY = Math.min(this.minY, point.y);
        this.maxY = Math.max(this.maxY, point.y);
    }

    containPoints(points: Point[]): void {
        for (var i: number = 0; i < points.length; i++) {
            this.containPoint(points[i]);
        }
    }

    getWidth(): number {
        return this.maxX - this.minX;
    }

    getHeight(): number {
        return this.maxY - this.minY;
    }

    getRatio(): number {
        return this.getWidth() / this.getHeight();
    }

    toRectangle(): IRect {
        return Rect.create(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
    }

    constructor(points: Point[]) {
        this.containPoints(points);
    }
}