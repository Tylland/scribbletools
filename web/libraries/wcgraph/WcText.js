import { Brush } from "./Brush.js";
import { Font } from "./Font.js";
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
        renderer.drawText(this.text, devicePoint, this.font, this.fill, this.alignment);
    }
}
