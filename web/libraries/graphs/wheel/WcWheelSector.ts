import { Brush } from "../../wcgraph/Brush.ts";
import type { IRenderer } from "../../wcgraph/IRenderer.ts";
import type { IWcView } from "../../wcgraph/IWcView.ts";
import { Pen } from "../../wcgraph/Pen.ts";
import { Point } from "../../wcgraph/Point.ts";
import { WcFigure } from "../../wcgraph/WcFigure.ts";
import { WcPointF } from "../../wcgraph/WcPointF.ts";
import type { Category } from "./model/Category.ts";
import { WheelSettings } from "./WheelSettings.ts";
import type { IDrawCommand } from "../../wcgraph/IDrawCommand.ts";
import { Arc } from "../../wcgraph/ArcTo.ts";
import { ColorInfo } from "../../palette/ColorInfo.ts";
import { TextAlignment } from "../../wcgraph/TextAlignment.ts";



export class WcWheelSector extends WcFigure {
    private brush: Brush;
    private pen: Pen;
    constructor(private center: WcPointF, private startAngle: number, private endAngle: number, private category: Category, color: ColorInfo, private settings: WheelSettings) {
        super();

        this.brush = new Brush(color.mediumHex);
        this.pen = new Pen(color.darkHex, 1);
    }

    //drawLine(renderer: IRenderer, view: IWcView, startX: number, startY: number, endX: number, endY: number): void {
    //    let startPoint: Point = view.worldPointToDevice(new WcPointF(startX, startY));
    //    let endPoint: Point = view.worldPointToDevice(new WcPointF(endX, endY));

    //    renderer.drawLine(startPoint, endPoint, this.settings.gridLine);
    //}

    //private calcPoint(center: WcPointF, radius: number, angle: number): WcPointF {
    //    const x = center.x + radius * Math.cos(angle)
    //    const y = center.y + radius * Math.sin(angle)

    //    return new WcPointF(x, y);
    //}

    public draw(renderer: IRenderer, view: IWcView): void {
        const radiusRange = this.settings.maxRadius - this.settings.minRadius;
        const score: number = Math.min(this.category.score, this.settings.maxScore)
        const scoreRadius = this.settings.minRadius + radiusRange * (score / this.settings.maxScore);

        const center: Point = view.worldPointToDevice(this.center);

        //renderer.debugPoint(center);

        const innerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.minRadius, this.startAngle));
        const outerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, scoreRadius, this.startAngle));
        //const outerEnd = view.worldPointToDevice(this.calcPoint(center, outerRadius, this.endAngle));
        //const innerEnd = view.worldPointToDevice(this.calcPoint(center, innerRadius, this.endAngle));

        //renderer.debugPoint(innerStart);
        //renderer.debugPoint(outerStart);

        const innerRadius = center.distanceTo(innerStart);
        const outerRadius = center.distanceTo(outerStart);

        const commands: IDrawCommand[] = [];

        commands.push(new Arc(center.x, center.y, outerRadius, this.startAngle, this.endAngle));
        commands.push(new Arc(center.x, center.y, innerRadius, this.endAngle, this.startAngle));


        renderer.drawPath(commands, this.brush, this.pen);

        const labelLocation = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.maxRadius + this.settings.labelOffset, (this.startAngle + this.endAngle) / 2));

        const labelAngle = this.settings.calcTextAngle((this.startAngle + this.endAngle) / 2);

        renderer.drawRotatedText(this.category.label, labelLocation, this.settings.labelFont.toFont(view.device.viewport.width), this.settings.labelBrush, TextAlignment.CenterMiddle, labelAngle);
        
    }
}