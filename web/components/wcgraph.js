import { WcRect } from "../libraries/wcgraph/WcRect";
import { WcWorld } from "../libraries/wcgraph/WcWorld";
import { WcPointF } from "../libraries/wcgraph/WcPointF";
import { CanvasRenderer } from "../libraries/wcgraph/CanvasRenderer";
import { WcRectangle } from "../libraries/wcgraph/WcRectangle";
import { Rect } from "../libraries/wcgraph/Rect";
import { Point } from "../libraries/wcgraph/Point";
import { WcView } from "../libraries/wcgraph/WcView";
import { WcNormalCoordinateSystem } from "../libraries/wcgraph/WcNormalCoordinateSystem";
import { Font } from "../libraries/wcgraph/Font";
import { Brush } from "../libraries/wcgraph/Brush";
import { Pen } from "../libraries/wcgraph/Pen";
import { InnerHtml } from "./innerhtml.js";
export class WcGraph extends HTMLCanvasElement {
    constructor() {
        super();
        this.handleClick = () => {
            window.requestAnimationFrame(this.draw);
        };
        this.handleMouseMove = (_args) => {
        };
        this.draw = () => {
            const canvas = this.canvas; // document.getElementById("wcgraph") as HTMLCanvasElement;
            if (canvas) {
                const renderer = new CanvasRenderer(canvas);
                this.world.draw(renderer, this.view);
            }
        };
        this.viewport = new Rect(new Point(0, 0), new Point(500, 500));
        const worldBoundary = new WcRect(new WcPointF(0, 0), new WcPointF(300, 300));
        this.world = new WcWorld(worldBoundary);
        this.view = new WcView(this.world, worldBoundary, new WcNormalCoordinateSystem(worldBoundary, this.viewport), this);
        this.canvas = this.querySelector('[data-input="wcgraph"]');
        this.world.addFigure(new WcRectangle(new WcRect(new WcPointF(50, 50), new WcPointF(250, 200)), new Brush('#333333'), new Pen('#555555', 1)));
    }
    async connectedCallback() {
        this.innerHTML = await InnerHtml.Import("/components/wcgraph.html");
    }
    measureText(_text, _font) {
        throw new Error("Method not implemented.");
    }
    invalidate() {
        window.requestAnimationFrame(this.draw);
    }
}
customElements.define('wcgraph', WcGraph);
