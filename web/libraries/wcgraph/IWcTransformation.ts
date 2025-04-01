import { Point } from "./Point.ts";
import type { IRect } from "./IRect.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcRect } from "./IWcRect.ts";

export interface IWcTransformation
{
    worldPointToDevice(worldPoint: IWcPoint): Point;
    devicePointToWorld(devicePoint: Point): IWcPoint;

    worldRectToDevice(worldRect: IWcRect): IRect;
    deviceRectToWorld(deviceRect: IRect): IWcRect;
}