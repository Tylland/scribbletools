import { ViewportSize } from "../../wcgraph/ViewportSize.js";
import { TailwindPalette } from "../../palette/TailwindPalette.js";
import { Brush } from "../../wcgraph/Brush.js";
import { ResponsiveFont, FontSize, Breakpoint } from "../../wcgraph/Font.js";
import { Margin } from "../../wcgraph/Margin.js";
import { Pen } from "../../wcgraph/Pen.js";
import { WcPointF } from "../../wcgraph/WcPointF.js";
export class WheelSettings {
    constructor() {
        this.width = 1000;
        this.height = 1000;
        this.minRadius = 70;
        this.maxRadius = 400;
        this.chartMargin = new Margin(0, 0, 0, 0);
        this.chartBackground = new Brush(TailwindPalette.Gray50);
        this.chartBorder = new Pen('#F8F8F8', 1);
        this.wheelBackground = new Brush("#F8F8F8");
        this.wheelBorder = new Pen('#BBBBBB', 1);
        this.gridLine = new Pen('#BBBBBB', 1);
        this.titleFont = new ResponsiveFont("Arial", FontSize.XL4, [new Breakpoint(ViewportSize.$md, FontSize.XL5), new Breakpoint(ViewportSize.$2xl, FontSize.XL8)]);
        this.titleBrush = new Brush("#555555");
        this.labelHeight = 60;
        this.maxScore = 10;
        this.labelOffset = 40;
        this.labelFont = new ResponsiveFont("Arial", FontSize.MD, [new Breakpoint(ViewportSize.$md, FontSize.LG), new Breakpoint(ViewportSize.$2xl, FontSize.XL2)]);
        this.labelBrush = new Brush("#333333");
        //public totalScoreFont: IFont = new ResponsiveFont("Arial", FontSize.XL2, [new Breakpoint(ViewportSize.$md, FontSize.XL2), new Breakpoint(ViewportSize.$2xl, FontSize.XL2)]);
        this.totalScoreFont = new ResponsiveFont("Arial", FontSize.XL2);
        this.totalScoreBrush = new Brush("#222222");
    }
    calcPoint(center, radius, angle) {
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        return new WcPointF(x, y);
    }
    calcAngle(sectorAngle, sectorCounter) {
        const startAngle = 1.5 * Math.PI;
        return startAngle + (sectorCounter * sectorAngle);
    }
    calcTextAngle(angle) {
        angle = angle % (2.0 * Math.PI);
        const factor = angle / Math.PI;
        if (factor > 1 || factor <= 0) {
            return 0.5 * Math.PI + angle;
        }
        return 1.5 * Math.PI + angle;
    }
}
