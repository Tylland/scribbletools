import { WcRect } from "../libraries/wcgraph/WcRect";
import { WcWorld } from "../libraries/wcgraph/WcWorld";
import { WcPointF } from "../libraries/wcgraph/WcPointF";
import { CanvasRenderer } from "../libraries/wcgraph/CanvasRenderer";
import { WcRectangle } from "../libraries/wcgraph/WcRectangle";
import type { IRect } from "../libraries/wcgraph/IRect";
import { Rect } from "../libraries/wcgraph/Rect";
import { Point } from "../libraries/wcgraph/Point";
import { WcView } from "../libraries/wcgraph/WcView";
import { WcNormalCoordinateSystem } from "../libraries/wcgraph/WcNormalCoordinateSystem";
import type { IDevice } from "../libraries/wcgraph/IDevice";
import { Font } from "../libraries/wcgraph/Font";
import { Brush } from "../libraries/wcgraph/Brush";
import { Pen } from "../libraries/wcgraph/Pen";
import { InnerHtml } from "./innerhtml.js";

type WcGraphProps = {
    width: number;
    height: number;
}

export class WcGraph extends HTMLCanvasElement implements IDevice {
    public world: WcWorld;
    public view: WcView;
    private canvas: HTMLCanvasElement | null;

    constructor() {
        super();


        this.viewport = new Rect(new Point(0, 0), new Point(500, 500))

        const worldBoundary = new WcRect(new WcPointF(0, 0), new WcPointF(300, 300));

        this.world = new WcWorld(worldBoundary);

        this.view = new WcView(this.world, worldBoundary, new WcNormalCoordinateSystem(worldBoundary, this.viewport), this);


        this.canvas = this.querySelector<HTMLCanvasElement>('[data-input="wcgraph"]')

        this.world.addFigure(new WcRectangle(new WcRect(new WcPointF(50, 50), new WcPointF(250, 200)), new Brush('#333333'), new Pen('#555555', 1)));
    }

   async connectedCallback(){
        this.innerHTML = await InnerHtml.Import("/components/wcgraph.html");
    }


    measureText(_text: string, _font: Font): IRect {
        throw new Error("Method not implemented.");
    }

    viewport: IRect;

   

    handleClick = (): void => {
        window.requestAnimationFrame(this.draw);
    }

    handleMouseMove= (_args: any): void => {
    }

    invalidate(): void {
        window.requestAnimationFrame(this.draw);
    }

    draw = (): void => {
        const canvas = this.canvas; // document.getElementById("wcgraph") as HTMLCanvasElement;

        if (canvas) {
            const renderer = new CanvasRenderer(canvas as HTMLCanvasElement);

            this.world.draw(renderer, this.view);
        }
    }
}

customElements.define('wcgraph', WcGraph);
