import { Brush } from "./Brush.ts";
import { Font } from "./Font.ts";
import type { IDrawCommand } from "./IDrawCommand.ts";
import type { IRect } from "./IRect.ts";
import { Pen } from "./Pen.ts";
import { Point } from "./Point.ts";
import { TextAlignment } from "./TextAlignment.ts";

export interface IRenderer {
    clear(color: string): void;
    drawRect(rect: IRect, fill: Brush, stroke: Pen): void;
    drawRoundRect(rect: IRect, radius: number, fill: Brush, stroke: Pen): void;
    drawEllipse(rect: IRect, fill: Brush, stroke: Pen): void;
    drawPolygon(points: Point[], fill: Brush, stroke: Pen): void;
    drawLine(start: Point, end: Point, stroke: Pen): void;
    drawText(text: string, location: Point, font: Font, fill: Brush, alignment: TextAlignment): void;
    drawRotatedText(text: string, location: Point, font: Font, fill: Brush, alignment: TextAlignment, angle: number): void;
    drawPath(commands: IDrawCommand[], fill: Brush, stroke: Pen): void;
    measureText(text: string, font: Font): IRect;
    debugPoint(point: Point): void;
}