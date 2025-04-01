import type { IWcView } from "./IWcView.ts";
import { Point } from "./Point.ts";
import { WcFigure } from "./WcFigure.ts";

export interface IHittable {
	hitTest(view: IWcView, point: Point, foundFigures: WcFigure[]): boolean;
}