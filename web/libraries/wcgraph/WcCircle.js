import { Brush } from "./Brush.js";
import { Pen } from "./Pen.js";
import { Rect } from "./Rect.js";
import { WcFigure } from "./WcFigure.js";
export class WcCircle extends WcFigure {
    constructor(location, radius, fill, stroke) {
        super();
        this.location = location;
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
    }
    draw(renderer, view) {
        var point = view.worldPointToDevice(this.location);
        renderer.drawEllipse(Rect.fromRadius(point, this.radius), this.fill, this.stroke);
    }
}
