import type { IWcPoint } from "./IWcPoint.ts";

export class WcPointF implements IWcPoint {
    constructor(public x: number, public y: number) { }
}