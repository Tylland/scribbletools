import { Point } from "./Point.ts";
import { TextAlignment } from "./TextAlignment.ts";

export class PopupInfo {
    constructor(public text: string, public basePoint: Point, public alignment: TextAlignment) { }
}