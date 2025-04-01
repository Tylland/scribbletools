import { Brush } from "./Brush.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcView } from "./IWcView.ts";
import { Pen } from "./Pen.ts";
import { WcFigure } from "./WcFigure.ts";

export class WcPolygon extends WcFigure {
    constructor(private points: IWcPoint[], private fill: Brush, private stroke: Pen) {
        super();   
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        var devicePoints = this.points.map(p => view.worldPointToDevice(p));

        renderer.drawPolygon(devicePoints, this.fill, this.stroke);
    }
}