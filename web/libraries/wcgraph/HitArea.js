import { Extent } from "./Extent.js";
import { Point } from "./Point.js";
export class HitArea {
    constructor() {
        this.areas = [];
        this.boundary = new Extent([]);
    }
    addArea(area) {
        this.areas.push(area);
        this.boundary.containPoint(area.min);
        this.boundary.containPoint(area.max);
    }
    hitted(point) {
        if (this.boundary.toRectangle().contains(point))
            return true;
        if (this.areas.find(a => a.contains(point)))
            return true;
        return false;
    }
}
