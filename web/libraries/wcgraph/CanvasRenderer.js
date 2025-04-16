import { Rect } from "./Rect.js";
import { Point } from "./Point.js";
import { Brush } from "./Brush.js";
import { Font } from "./Font.js";
import { HorizontalAlignment } from "./HorizontalAlignment.js";
import { VerticalAlignment } from "./VerticalAlignment.js";
import { TextAlignment } from "./TextAlignment.js";
import { Pen } from "./Pen.js";
import { MoveTo } from "./MoveTo.js";
import { LineTo } from "./LineTo.js";
import { Arc } from "./ArcTo.js";
;
export class CanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    // measureText(text: string, font: IFont): IRect {
    //     this.ctx.font = this.getFont(font);
    //     let metrics = this.ctx.measureText(text);
    //     return Rect.create(0, metrics.actualBoundingBoxAscent, metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    // }
    getTextAlign(horizontalAlignment) {
        if (horizontalAlignment == HorizontalAlignment.Right)
            return "right";
        if (horizontalAlignment == HorizontalAlignment.Center)
            return "center";
        return "left";
    }
    getTextBaseline(verticalAlignment) {
        if (verticalAlignment == VerticalAlignment.Top)
            return "top";
        if (verticalAlignment == VerticalAlignment.Middle)
            return "middle";
        return "bottom";
    }
    getFont(font) {
        return font.size + "px " + font.family;
    }
    drawText(text, location, font, fill, alignment) {
        this.ctx.textAlign = this.getTextAlign(alignment.horizontalAlignment);
        this.ctx.textBaseline = this.getTextBaseline(alignment.verticalAlignment);
        this.ctx.font = this.getFont(font);
        this.ctx.fillStyle = fill.style;
        this.ctx.fillText(text, location.x, location.y);
    }
    drawRotatedText(text, location, font, fill, alignment, angle) {
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
    drawPolygon(points, fill, stroke) {
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
    drawLine(start, end, stroke) {
        this.ctx.strokeStyle = stroke.style;
        this.ctx.lineWidth = stroke.width;
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }
    drawRect(rect, fill, stroke) {
        if (fill !== Brush.none) {
            this.ctx.fillStyle = fill.style;
            this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        if (stroke !== Pen.none) {
            this.ctx.strokeStyle = stroke.style;
            this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }
    drawRoundRect(rect, radius, fill, stroke) {
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
    drawEllipse(rect, fill, stroke) {
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
    drawPath(commands, fill, stroke) {
        this.ctx.beginPath();
        commands.forEach(c => {
            if (c.type === 'moveTo') {
                const moveTo = c;
                this.ctx.moveTo(moveTo.x, moveTo.y);
            }
            else if (c.type === 'lineTo') {
                const lineTo = c;
                this.ctx.moveTo(lineTo.x, lineTo.y);
            }
            else if (c.type === 'arc') {
                const arc = c;
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
    clear(fillStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }
    debugPoint(point) {
        const size = 10;
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
