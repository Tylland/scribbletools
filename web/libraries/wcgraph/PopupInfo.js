import { Point } from "./Point.js";
import { TextAlignment } from "./TextAlignment.js";
export class PopupInfo {
    constructor(text, basePoint, alignment) {
        this.text = text;
        this.basePoint = basePoint;
        this.alignment = alignment;
    }
}
