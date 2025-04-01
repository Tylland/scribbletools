import { HorizontalAlignment } from "./HorizontalAlignment.ts";
import { VerticalAlignment } from "./VerticalAlignment.ts";

export class TextAlignment {
    constructor(public horizontalAlignment: HorizontalAlignment, public verticalAlignment: VerticalAlignment) { }

    public static LeftTop: TextAlignment = new TextAlignment(HorizontalAlignment.Left, VerticalAlignment.Top);
    public static CenterTop: TextAlignment = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Top);
    public static CenterMiddle: TextAlignment = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Middle);
    public static LeftBottom: TextAlignment = new TextAlignment(HorizontalAlignment.Left, VerticalAlignment.Bottom);
    public static CenterBottom: TextAlignment = new TextAlignment(HorizontalAlignment.Center, VerticalAlignment.Bottom);
    public static RightMiddle: TextAlignment = new TextAlignment(HorizontalAlignment.Right, VerticalAlignment.Middle);
}