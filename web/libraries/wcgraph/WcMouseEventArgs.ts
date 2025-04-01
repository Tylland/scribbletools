import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcView } from "./IWcView.ts";

export class WcMouseEventArgs {
    constructor(public x: number, public y: number, public point: IWcPoint, public view: IWcView) { }
}