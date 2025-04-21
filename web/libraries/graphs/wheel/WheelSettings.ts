import { ViewportSize } from "../../wcgraph/ViewportSize.ts";
import { TailwindPalette } from "../../palette/TailwindPalette.ts";
import { Brush } from "../../wcgraph/Brush.ts";
import type { IFont } from "../../wcgraph/Font.ts";
import  { ResponsiveFont, FontSize, Breakpoint } from "../../wcgraph/Font.ts";
import { Margin } from "../../wcgraph/Margin.ts";
import { Pen } from "../../wcgraph/Pen.ts";
import { WcPointF } from "../../wcgraph/WcPointF.ts";

export class WheelSettings {
    public width: number = 1000;
    public height: number = 1000;

    public minRadius: number = 70;
    public maxRadius: number = 400;

    public chartMargin: Margin = new Margin(0, 0, 0, 0);

    public chartBackground: Brush = new Brush(TailwindPalette.Gray50);
    public chartBorder: Pen = new Pen('#F8F8F8', 1)

    public wheelBackground: Brush = new Brush("#F8F8F8");
    public wheelBorder: Pen = new Pen('#BBBBBB', 1)

    public gridLine: Pen = new Pen('#BBBBBB', 1)

    public titleFont: IFont = new ResponsiveFont("Arial", FontSize.XL4, [new Breakpoint(ViewportSize.$md, FontSize.XL5), new Breakpoint(ViewportSize.$2xl, FontSize.XL8)]);
    public titleBrush: Brush = new Brush("#555555");

    public labelHeight: number = 60;
    public maxScore: number = 10;

    public labelOffset: number = 40;
    public labelFont: IFont = new ResponsiveFont("Arial", FontSize.MD, [new Breakpoint(ViewportSize.$md, FontSize.LG), new Breakpoint(ViewportSize.$2xl, FontSize.XL2)]);
    public labelBrush: Brush = new Brush("#333333");

    //public totalScoreFont: IFont = new ResponsiveFont("Arial", FontSize.XL2, [new Breakpoint(ViewportSize.$md, FontSize.XL2), new Breakpoint(ViewportSize.$2xl, FontSize.XL2)]);
    public totalScoreFont: IFont = new ResponsiveFont("Arial", FontSize.XL2);
    public totalScoreBrush: Brush = new Brush("#222222");

    public calcPoint(center: WcPointF, radius: number, angle: number): WcPointF {
        const x = center.x + radius * Math.cos(angle)
        const y = center.y + radius * Math.sin(angle)

        return new WcPointF(x, y);
    }

    public calcAngle(sectorAngle: number, sectorCounter: number): number {
        const startAngle: number = 1.5 * Math.PI;

        return startAngle + (sectorCounter * sectorAngle);
    }

    public calcTextAngle(angle: number): number {
        angle = angle % (2.0 * Math.PI);

            const factor = angle / Math.PI;

        if (factor > 1 || factor <= 0) {
            return 0.5 * Math.PI + angle;
        }

        return 1.5 * Math.PI + angle;
    }

}