import { Brush } from "./Brush.ts";
import { Font } from "./Font.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcView } from "./IWcView.ts";
import { TextAlignment } from "./TextAlignment.ts";
import { WcFigure } from "./WcFigure.ts";

export class WcText extends WcFigure {
    constructor(private text: string, private location: IWcPoint, private font: Font, private fill: Brush, private alignment: TextAlignment) {
        super();   
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        const devicePoint = view.worldPointToDevice(this.location);

        renderer.drawText(this.text, devicePoint, this.font, this.fill, this.alignment);
    }
}