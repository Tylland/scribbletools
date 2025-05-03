import { Brush } from "../../wcgraph/Brush.js";
import { Pen } from "../../wcgraph/Pen.js";
import { Point } from "../../wcgraph/Point.js";
import { WcFigure } from "../../wcgraph/WcFigure.js";
import { WcPointF } from "../../wcgraph/WcPointF.js";
import { WheelSettings } from "./WheelSettings.js";
import { Arc } from "../../wcgraph/ArcTo.js";
import { ColorInfo } from "../../palette/ColorInfo.js";
import { TextAlignment } from "../../wcgraph/TextAlignment.js";
export class WcWheelSector extends WcFigure {
    constructor(center, startAngle, endAngle, category, color, settings, dark) {
        super();
        this.center = center;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.category = category;
        this.settings = settings;
        if (dark) {
            this.brush = new Brush(color.lightHex);
            this.pen = new Pen(color.mediumHex, 1);
        }
        else {
            this.brush = new Brush(color.mediumHex);
            this.pen = new Pen(color.darkHex, 1);
        }
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
    draw(renderer, view) {
        const radiusRange = this.settings.maxRadius - this.settings.minRadius;
        const score = Math.min(this.category.score, this.settings.maxScore);
        const scoreRadius = this.settings.minRadius + radiusRange * (score / this.settings.maxScore);
        const center = view.worldPointToDevice(this.center);
        //renderer.debugPoint(center);
        const innerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.minRadius, this.startAngle));
        const outerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, scoreRadius, this.startAngle));
        //const outerEnd = view.worldPointToDevice(this.calcPoint(center, outerRadius, this.endAngle));
        //const innerEnd = view.worldPointToDevice(this.calcPoint(center, innerRadius, this.endAngle));
        //renderer.debugPoint(innerStart);
        //renderer.debugPoint(outerStart);
        const innerRadius = center.distanceTo(innerStart);
        const outerRadius = center.distanceTo(outerStart);
        const commands = [];
        commands.push(new Arc(center.x, center.y, outerRadius, this.startAngle, this.endAngle));
        commands.push(new Arc(center.x, center.y, innerRadius, this.endAngle, this.startAngle));
        renderer.drawPath(commands, this.brush, this.pen);
        const labelLocation = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.maxRadius + this.settings.labelOffset, (this.startAngle + this.endAngle) / 2));
        const labelAngle = this.settings.calcTextAngle((this.startAngle + this.endAngle) / 2);
        renderer.drawRotatedText(this.category.label, labelLocation, this.settings.labelFont.toFont(view.device.viewport.width), this.settings.labelBrush, TextAlignment.CenterMiddle, labelAngle);
    }
}
