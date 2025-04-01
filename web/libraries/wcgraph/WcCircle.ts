import { Brush } from "./Brush.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcView } from "./IWcView.ts";
import { Pen } from "./Pen.ts";
import { Rect } from "./Rect.ts";
import { WcFigure } from "./WcFigure.ts";

export class WcCircle extends WcFigure {
    constructor(public location: IWcPoint, public radius: number, public fill: Brush, public stroke: Pen) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var point = view.worldPointToDevice(this.location);

        renderer.drawEllipse(Rect.fromRadius(point, this.radius), this.fill, this.stroke);
    }
}