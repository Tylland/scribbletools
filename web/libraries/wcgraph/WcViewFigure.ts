import type { IWcView } from "./IWcView.ts";
import { Point } from "./Point.ts";

export class WcViewFigure {
    constructor(public view: IWcView, public figure: any, public point: Point) { }
}