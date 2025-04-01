import { WcPointF } from "./WcPointF.js";
export class WcRect {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    getWidth() {
        return this.max.x - this.min.x;
    }
    getHeight() {
        return this.max.y - this.min.y;
    }
    static fromValues(x, y, width, height) {
        return new WcRect(new WcPointF(x, y), new WcPointF(x + width, y + height));
    }
    static fromCenter(center, width, height) {
        return WcRect.fromValues(center.x - width / 2, center.y - height / 2, width, height);
    }
}
