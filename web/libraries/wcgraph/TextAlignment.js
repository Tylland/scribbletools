import { HorizontalAlignment } from "./HorizontalAlignment.js";
import { VerticalAlignment } from "./VerticalAlignment.js";
export class TextAlignment {
    constructor(horizontalAlignment, verticalAlignment) {
        this.horizontalAlignment = horizontalAlignment;
        this.verticalAlignment = verticalAlignment;
    }
}
TextAlignment.LeftTop = new TextAlignment(HorizontalAlignment.Left, VerticalAlignment.Top);
TextAlignment.CenterTop = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Top);
TextAlignment.CenterMiddle = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Middle);
TextAlignment.LeftBottom = new TextAlignment(HorizontalAlignment.Left, VerticalAlignment.Bottom);
TextAlignment.CenterBottom = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Bottom);
TextAlignment.RightMiddle = new TextAlignment(HorizontalAlignment.Right, VerticalAlignment.Middle);
