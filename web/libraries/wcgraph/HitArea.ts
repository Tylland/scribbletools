import { Extent } from "./Extent.ts";
import { Point } from "./Point.ts";
import type { IRect } from "./IRect.ts";

export class HitArea {
    private areas: IRect[] = [];
    public boundary: Extent = new Extent([]);

    public addArea(area: IRect) {
        this.areas.push(area);

        this.boundary.containPoint(area.min);
        this.boundary.containPoint(area.max);
    }

    public hitted(point: Point): boolean {

        if (this.boundary.toRectangle().contains(point))
            return true;

        if(this.areas.find(a => a.contains(point)))
            return true;

        return false;
    }
}