import { Brush } from "./Brush.js";
import { TextAlignment } from "./TextAlignment.js";
import { WcFigure } from "./WcFigure.js";
export class WcText extends WcFigure {
    constructor(text, location, font, fill, alignment) {
        super();
        this.text = text;
        this.location = location;
        this.font = font;
        this.fill = fill;
        this.alignment = alignment;
    }
    draw(renderer, view) {
        const devicePoint = view.worldPointToDevice(this.location);
        const v = view.window;
        renderer.debugPoint(devicePoint);
        renderer.drawText(this.text, devicePoint, this.font.toFont(view.device.viewport.width), this.fill, this.alignment);
    }
}
