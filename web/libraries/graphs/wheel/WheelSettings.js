import { Brush } from "../../wcgraph/Brush.js";
import { Font } from "../../wcgraph/Font.js";
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
        this.chartBackground = new Brush("#FFFFFF");
        this.chartBorder = new Pen('#F8F8F8', 1);
        this.wheelBackground = new Brush("#F8F8F8");
        this.wheelBorder = new Pen('#BBBBBB', 1);
        this.gridLine = new Pen('#BBBBBB', 1);
        this.titleFont = new Font("Arial", 48);
        this.titleBrush = new Brush("#555555");
        this.labelHeight = 100;
        this.maxScore = 10;
        this.labelOffset = 40;
        this.labelFont = new Font("Arial", 24);
        this.labelBrush = new Brush("#333333");
        this.totalScoreFont = new Font("Arial", 48);
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
