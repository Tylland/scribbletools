import { Rect } from "./Rect.js";
export class CanvasDevice {
    constructor(canvas, viewport) {
        this.viewport = viewport;
        this.onInvalidated = () => { };
        this.ctx = canvas.getContext('2d');
    }
    invalidate() {
        this.onInvalidated();
    }
    measureText(text, font) {
        this.ctx.font = this.getFont(font);
        var metrics = this.ctx.measureText(text);
        return Rect.create(0, metrics.actualBoundingBoxAscent, metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    }
    getFont(font) {
        return font.getSize(this.viewport.width) + "px " + font.getFamily();
    }
}
