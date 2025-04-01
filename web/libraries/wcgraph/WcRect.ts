import type { IWcPoint } from './IWcPoint.ts';
import type { IWcRect } from './IWcRect.ts'
import { WcPointF } from './WcPointF.ts';

export class WcRect implements IWcRect {
    constructor(public min: IWcPoint, public max: IWcPoint) { }
    getWidth(): number {
        return this.max.x - this.min.x;
    }
    getHeight(): number {
        return this.max.y - this.min.y;
    }

    static fromValues(x: number, y: number, width: number, height: number): WcRect {
        return new WcRect(new WcPointF(x, y), new WcPointF(x + width, y + height));
    }

    static fromCenter(center: WcPointF, width: number, height: number): WcRect {
        return WcRect.fromValues(center.x - width / 2, center.y - height / 2, width, height);
    }
}       