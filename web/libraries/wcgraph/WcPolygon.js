import { Brush } from "./Brush.js";
import { Pen } from "./Pen.js";
import { WcFigure } from "./WcFigure.js";
export class WcPolygon extends WcFigure {
    constructor(points, fill, stroke) {
        super();
        this.points = points;
        this.fill = fill;
        this.stroke = stroke;
    }
    draw(renderer, view) {
        var devicePoints = this.points.map(p => view.worldPointToDevice(p));
        renderer.drawPolygon(devicePoints, this.fill, this.stroke);
    }
}
