import { Brush } from "./Brush.ts";
import type { IFont } from "./Font.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IWcView } from "./IWcView.ts";
import { TextAlignment } from "./TextAlignment.ts";
import { WcFigure } from "./WcFigure.ts";

export class WcText extends WcFigure {
    constructor(private text: string, private location: IWcPoint, private font: IFont, private fill: Brush, private alignment: TextAlignment) {
        super();   
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        const devicePoint = view.worldPointToDevice(this.location);

        const v = view.window;
        
        renderer.debugPoint(devicePoint)
        renderer.drawText(this.text, devicePoint, this.font.toFont(view.device.viewport.width), this.fill, this.alignment);
    }
}