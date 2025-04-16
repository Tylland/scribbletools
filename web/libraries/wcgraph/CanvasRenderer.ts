import { Rect } from "./Rect.ts";
import type { IRenderer } from "./IRenderer";import { Point } from "./Point.ts";
import { Brush } from "./Brush.ts";
import  { Font } from "./Font.ts";
import { HorizontalAlignment } from "./HorizontalAlignment.ts";
import { VerticalAlignment } from "./VerticalAlignment.ts";
import { TextAlignment } from "./TextAlignment.ts";
import { Pen } from "./Pen.ts";
import type { IRect } from "./IRect.ts";
import type { IDrawCommand } from "./IDrawCommand.ts";
import { MoveTo } from "./MoveTo.ts";
import { LineTo } from "./LineTo.ts";
import { Arc } from "./ArcTo.ts";
;

export class CanvasRenderer implements IRenderer {
    ctx: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    }

    // measureText(text: string, font: IFont): IRect {
    //     this.ctx.font = this.getFont(font);
    //     let metrics = this.ctx.measureText(text);

    //     return Rect.create(0, metrics.actualBoundingBoxAscent, metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    // }

    getTextAlign(horizontalAlignment: HorizontalAlignment): CanvasTextAlign {
        if (horizontalAlignment == HorizontalAlignment.Right)
            return "right";

        if (horizontalAlignment == HorizontalAlignment.Center)
            return "center";

        return "left";
    }

    getTextBaseline(verticalAlignment: VerticalAlignment): CanvasTextBaseline{
        if (verticalAlignment == VerticalAlignment.Top)
            return "top";

        if (verticalAlignment == VerticalAlignment.Middle)
            return "middle";

        return "bottom";
    }


    getFont(font: Font): string {
         return font.size + "px " + font.family;
    }

    drawText(text: string, location: Point, font: Font, fill: Brush, alignment: TextAlignment): void {

        this.ctx.textAlign = this.getTextAlign(alignment.horizontalAlignment);
        this.ctx.textBaseline = this.getTextBaseline(alignment.verticalAlignment);

        this.ctx.font = this.getFont(font);
        this.ctx.fillStyle = fill.style;

        this.ctx.fillText(text, location.x, location.y);
    }

    drawRotatedText(text: string, location: Point, font: Font, fill: Brush, alignment: TextAlignment, angle: number): void {

        //this.ctx.textAlign = this.getTextAlign(alignment.horizontalAlignment);
        //this.ctx.textBaseline = this.getTextBaseline(alignment.verticalAlignment);

        //this.ctx.font = this.getFont(font);
        //this.ctx.fillStyle = fill.style;

        this.ctx.save();

        this.ctx.translate(location.x, location.y);
        this.ctx.rotate(angle);

        this.drawText(text, new Point(0, 0), font, fill, alignment);

        this.ctx.restore();
    }

    drawPolygon(points: Point[], fill: Brush, stroke: Pen): void {

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }

        this.ctx.closePath();

        this.ctx.fillStyle = fill.style;
        this.ctx.fill();

        if (stroke != Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.stroke();
        }
    }

    drawLine(start: Point, end: Point, stroke: Pen): void {
        this.ctx.strokeStyle = stroke.style;
        this.ctx.lineWidth = stroke.width;

        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }

    drawRect(rect: Rect, fill: Brush, stroke: Pen): void {

        if (fill !== Brush.none) {
            this.ctx.fillStyle = fill.style;
            this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        if (stroke !== Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    drawRoundRect(rect: IRect, radius: number, fill: Brush, stroke: Pen): void {

        this.ctx.beginPath();
        this.ctx.moveTo(rect.x + radius, rect.y);
        this.ctx.lineTo(rect.x + rect.width - radius, rect.y);
        this.ctx.quadraticCurveTo(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + radius);
        this.ctx.lineTo(rect.x + rect.width, rect.y + rect.height - radius);
        this.ctx.quadraticCurveTo(rect.x + rect.width, rect.y + rect.height, rect.x + rect.width - radius, rect.y + rect.height);
        this.ctx.lineTo(rect.x + radius, rect.y + rect.height);
        this.ctx.quadraticCurveTo(rect.x, rect.y + rect.height, rect.x, rect.y + rect.height - radius);
        this.ctx.lineTo(rect.x, rect.y + radius);
        this.ctx.quadraticCurveTo(rect.x, rect.y, rect.x + radius, rect.y);
        this.ctx.closePath();

        if (fill !== Brush.none) {
            this.ctx.fillStyle = fill.style;
            this.ctx.fill();
        }

        if (stroke !== Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.stroke();
        }
    }


    drawEllipse(rect: IRect, fill: Brush, stroke: Pen): void {
        const center = rect.getCenter();

        this.ctx.beginPath();
        this.ctx.ellipse(center.x, center.y, rect.width / 2, rect.height / 2, 0, 0, 2 * Math.PI);

        if (fill !== Brush.none) {
            this.ctx.fillStyle = fill.style;
            this.ctx.fill();
        }

        if (stroke !== Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.lineWidth = stroke.width;
            this.ctx.stroke();
        }

    }

    drawPath(commands: IDrawCommand[], fill: Brush, stroke: Pen): void {

        this.ctx.beginPath();

        commands.forEach(c => {
            if (c.type === 'moveTo') {
                const moveTo: MoveTo = c as MoveTo;
                this.ctx.moveTo(moveTo.x, moveTo.y);
            }
            else if (c.type === 'lineTo') {
                const lineTo: LineTo = c as LineTo;
                this.ctx.moveTo(lineTo.x, lineTo.y);
            }
            else if (c.type === 'arc') {
                const arc: Arc = c as Arc;
                this.ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle, arc.counterClockwise);
            }
        });


        this.ctx.closePath();

        if (fill !== Brush.none) {
            this.ctx.fillStyle = fill.style;
            this.ctx.fill();
        }

        if (stroke !== Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.lineWidth = stroke.width;
            this.ctx.stroke();
        }

    }

    clear(fillStyle: string) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    debugPoint(point: Point): void {
        const size: number = 10;

        this.ctx.beginPath();
        this.ctx.moveTo(point.x - size, point.y - size);
        this.ctx.lineTo(point.x + size, point.y + size);
        this.ctx.moveTo(point.x - size, point.y + size);
        this.ctx.lineTo(point.x + size, point.y - size);

        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

}