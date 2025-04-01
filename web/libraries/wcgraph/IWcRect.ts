import type { IWcPoint } from "./IWcPoint.js";

export interface IWcRect
{
    min: IWcPoint;
    max: IWcPoint;

    getWidth(): number;
    getHeight(): number;
}