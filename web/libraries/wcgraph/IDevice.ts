import { Font } from "./Font.ts";
import type { IRect } from "./IRect.ts";
import { ViewportSize } from "./ViewportSize.ts";

export interface IDevice {
    viewport: IRect;
    invalidate(): void;
    measureText(text: string, font: Font): IRect;
}