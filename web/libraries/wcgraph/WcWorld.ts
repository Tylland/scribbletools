import type { IRenderer } from "./IRenderer.ts";
import type { IWcRect } from "./IWcRect.ts";
import type { IWcView } from "./IWcView.ts";
import { WcFigure } from "./WcFigure.ts";

export class WcWorld {

    private figures: WcFigure[];

    constructor(public boundary: IWcRect) {
        this.figures = [];
    }

    public clearFigures(): void {
        this.figures = [];
    }

    public addFigure(figure: WcFigure): void {
        this.figures.push(figure);
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        this.figures.forEach(f => f.draw(renderer, view));
    }
}