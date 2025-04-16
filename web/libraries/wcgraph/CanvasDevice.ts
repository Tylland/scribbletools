import type { IFont } from "./Font.ts";
import type { IDevice } from "./IDevice.ts";
import type { IRect } from "./IRect.ts";
import { Rect } from "./Rect.ts";

export class CanvasDevice implements IDevice {
    public onInvalidated: () => void;

    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, public viewport: IRect) {
        this.onInvalidated = () => { };
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    }

    invalidate(): void {
        this.onInvalidated();
    }

    measureText(text: string, font: IFont): IRect {
        this.ctx.font = this.getFont(font);
        var metrics = this.ctx.measureText(text);

        return Rect.create(0, metrics.actualBoundingBoxAscent, metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    }

    getFont(font: IFont): string {
        return font.getSize(this.viewport.width) + "px " + font.getFamily();
    }
}