import { Point } from "./Point.js";
import { Rect } from "./Rect.js";
export class Extent {
    containPoint(point) {
        this.minX = Math.min(this.minX, point.x);
        this.maxX = Math.max(this.maxX, point.x);
        this.minY = Math.min(this.minY, point.y);
        this.maxY = Math.max(this.maxY, point.y);
    }
    containPoints(points) {
        for (var i = 0; i < points.length; i++) {
            this.containPoint(points[i]);
        }
    }
    getWidth() {
        return this.maxX - this.minX;
    }
    getHeight() {
        return this.maxY - this.minY;
    }
    getRatio() {
        return this.getWidth() / this.getHeight();
    }
    toRectangle() {
        return Rect.create(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
    }
    constructor(points) {
        this.minX = Number.MAX_VALUE;
        this.maxX = -Number.MAX_VALUE;
        this.minY = Number.MAX_VALUE;
        this.maxY = -Number.MAX_VALUE;
        this.containPoints(points);
    }
}
