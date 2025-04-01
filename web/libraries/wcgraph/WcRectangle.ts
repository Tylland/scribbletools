import { Point } from "./Point.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcRect } from "./IWcRect.ts";
import type { IWcView } from "./IWcView.ts";
import { WcFigure } from "./WcFigure.ts";
import { Brush } from "./Brush.ts";
import { Pen } from "./Pen.ts";

export class WcRectangle implements WcFigure {
    constructor(public rect: IWcRect, private fill: Brush, private stroke: Pen) { }

    public draw(renderer: IRenderer, view: IWcView): void {
        const rect = view.worldRectToDevice(this.rect);

        renderer.drawRect(rect, this.fill, this.stroke);
    }

    public hitTest(view: IWcView, point: Point, _foundFigures: WcFigure[]): boolean {
        const rect = view.worldRectToDevice(this.rect);

        //return false;

        return rect.contains(point);
    }
}