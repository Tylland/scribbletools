import { WcFigure } from "./WcFigure.js";
export class WcWorld {
    constructor(boundary) {
        this.boundary = boundary;
        this.figures = [];
    }
    clearFigures() {
        this.figures = [];
    }
    addFigure(figure) {
        this.figures.push(figure);
    }
    draw(renderer, view) {
        this.figures.forEach(f => f.draw(renderer, view));
    }
}
