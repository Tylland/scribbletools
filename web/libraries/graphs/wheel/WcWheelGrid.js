import { Brush } from "../../wcgraph/Brush.js";
import { WcFigure } from "../../wcgraph/WcFigure.js";
import { WcPointF } from "../../wcgraph/WcPointF.js";
import { WcRect } from "../../wcgraph/WcRect.js";
import { WheelSettings } from "./WheelSettings.js";
import { TextAlignment } from "../../wcgraph/TextAlignment.js";
import { Pen } from "../../wcgraph/Pen.js";
export class WcWheelGrid extends WcFigure {
    constructor(center, categories, settings) {
        super();
        this.center = center;
        this.categories = categories;
        this.settings = settings;
    }
    draw(renderer, view) {
        const steps = 10;
        const radiusRange = this.settings.maxRadius - this.settings.minRadius;
        const backgroundRect = view.worldRectToDevice(WcRect.fromCenter(this.center, this.settings.maxRadius * 2, this.settings.maxRadius * 2));
        //        renderer.drawEllipse(backgroundRect, this.settings.wheelBackground, Pen.none);
        for (let step = 0; step <= steps; step++) {
            const radius = this.settings.minRadius + radiusRange * (step / steps);
            const circleRect = view.worldRectToDevice(WcRect.fromCenter(this.center, radius * 2, radius * 2));
            renderer.drawEllipse(circleRect, Brush.none, this.settings.gridLine);
        }
        const sectorAngle = 2 * Math.PI / this.categories.length;
        for (let i = 0; i < this.categories.length; i++) {
            const angle = this.settings.calcAngle(sectorAngle, i);
            const innerPoint = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.minRadius, angle));
            const outerPoint = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.maxRadius, angle));
            renderer.drawLine(innerPoint, outerPoint, this.settings.gridLine);
        }
        let totalScore = 0;
        let maxScore = 0;
        this.categories.forEach(c => {
            totalScore += Math.min(c.score, this.settings.maxScore);
            maxScore += this.settings.maxScore;
        });
        const scoreRect = view.worldRectToDevice(WcRect.fromCenter(this.center, this.settings.minRadius * 2, this.settings.minRadius * 2));
        renderer.drawText(totalScore.toString(), scoreRect.getCenter(), this.settings.totalScoreFont.toFont(view.device.viewport.width), this.settings.totalScoreBrush, TextAlignment.CenterMiddle);
    }
}
