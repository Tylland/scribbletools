import { Point } from "./Point.js";
import { WcFigure } from "./WcFigure.js";
import { Brush } from "./Brush.js";
import { Pen } from "./Pen.js";
export class WcRectangle {
    constructor(rect, fill, stroke) {
        this.rect = rect;
        this.fill = fill;
        this.stroke = stroke;
    }
    draw(renderer, view) {
        const rect = view.worldRectToDevice(this.rect);
        renderer.drawRect(rect, this.fill, this.stroke);
    }
    hitTest(view, point, _foundFigures) {
        const rect = view.worldRectToDevice(this.rect);
        //return false;
        return rect.contains(point);
    }
}
