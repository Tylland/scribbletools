import type { IRenderer } from "./IRenderer.ts";
import type { IWcView } from "./IWcView.ts";

export abstract class WcFigure {
    public abstract draw(renderer: IRenderer, view: IWcView): void;
}
