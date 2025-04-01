import { Brush } from "../../wcgraph/Brush.ts";
import { Font } from "../../wcgraph/Font.ts";
import { Margin } from "../../wcgraph/Margin.ts";
import { Pen } from "../../wcgraph/Pen.ts";
import { WcPointF } from "../../wcgraph/WcPointF.ts";

export class WheelSettings {
    public width: number = 1000;
    public height: number = 1000;

    public minRadius: number = 70;
    public maxRadius: number = 400;

    public chartMargin: Margin = new Margin(0, 0, 0, 0);

    public chartBackground: Brush = new Brush("#FFFFFF");
    public chartBorder: Pen = new Pen('#F8F8F8', 1)

    public wheelBackground: Brush = new Brush("#F8F8F8");
    public wheelBorder: Pen = new Pen('#BBBBBB', 1)

    public gridLine: Pen = new Pen('#BBBBBB', 1)

    public titleFont: Font = new Font("Arial", 48);
    public titleBrush: Brush = new Brush("#555555");

    public labelHeight: number = 100;
    public maxScore: number = 10;

    public labelOffset: number = 40;
    public labelFont: Font = new Font("Arial", 24);
    public labelBrush: Brush = new Brush("#333333");

    public totalScoreFont: Font = new Font("Arial", 48);
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