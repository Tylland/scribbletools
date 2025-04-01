import { Margin } from "./Margin.ts";
import { Point } from "./Point.ts";

export interface IRect {
    min: Point;
    max: Point;
    x: number;
    y: number;
    width: number;
    height: number;

    apply(margin: Margin): IRect;
    getCenter(): Point;
    contains(point: Point): boolean;
}
