import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcTransformation } from "./IWcTransformation.ts";

export interface IWcCoordinateSystem extends IWcTransformation {
    supports(point: IWcPoint): boolean;
}