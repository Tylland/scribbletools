import { WcRect } from "../libraries/wcgraph/WcRect.ts";
import { WcWorld } from "../libraries/wcgraph/WcWorld.ts";
import { WcPointF } from "../libraries/wcgraph/WcPointF.ts";
import { CanvasRenderer } from "../libraries/wcgraph/CanvasRenderer.ts";
import { WcRectangle } from "../libraries/wcgraph/WcRectangle.ts";
import type { IDevice } from "../libraries/wcgraph/IDevice.ts";
import type { IRect } from "../libraries/wcgraph/IRect.ts";
import { Rect } from "../libraries/wcgraph/Rect.ts";
import { Point } from "../libraries/wcgraph/Point.ts";
import { WcView } from "../libraries/wcgraph/WcView.ts";
import { Font } from "../libraries/wcgraph/Font.ts";
import type { IJsonLoadable } from "../libraries/utils/IJsonLoadable.ts";
import { WcComponent } from "../libraries/wcgraph/WcComponent.ts";
import { CanvasDevice } from "../libraries/wcgraph/CanvasDevice.ts";
import { WcWheelGrid } from "../libraries/graphs/wheel/WcWheelGrid.ts";
import { WheelSettings } from "../libraries/graphs/wheel/WheelSettings.ts";
import { WcWheelSector } from "../libraries/graphs/wheel/WcWheelSector.ts";
import { WcWindowsCoordinateSystem } from "../libraries/wcgraph/WcWindowsCoordinateSystem.ts";
import { TangoPalette } from "../libraries/palette/TangoPalette.ts";
import type { Wheel } from "../libraries/graphs/wheel/model/Wheel.ts";
import { WcText } from "../libraries/wcgraph/WcText.ts";
import { TextAlignment } from "../libraries/wcgraph/TextAlignment.ts";
import { InnerHtml } from "./innerhtml.ts";
import { ComponentBase } from "./base.ts";


class WheelGraphProps {
    constructor(public width: number, public height: number) { }
}

export class WheelGraph extends ComponentBase implements IDevice, IJsonLoadable {
    private settings: WheelSettings = new WheelSettings();
    private props: WheelGraphProps;
    private titleComponent?: WcComponent;
    private wheelComponent?: WcComponent;
    private wheel: Wheel = { title: '', categories: [] };

    private canvas!: HTMLCanvasElement;

    constructor() {
        super();
        super.InitComponent(this);

        this.props = new WheelGraphProps(800, 800);

        this.viewport = new Rect(new Point(0, 0), new Point(this.props.width, this.props.height))
    }

    measureText(_text: string, _font: Font): IRect {
        throw new Error("Method not implemented.");
    }

    viewport: IRect;

    async connectedCallback() {
        let self = this;
        this.innerHTML = await InnerHtml.Import("/components/wheelgraph.html")

        this.canvas = this.dataQuery<HTMLCanvasElement>("wheelCanvas");

        this.canvas.onresize = function (evt: UIEvent) {
            self.invalidate();
        };

        new ResizeObserver(entries => {

            if (entries.length > 0) {
                let { width } = entries[0].contentRect;

                this.canvas.width = width
                this.canvas.height = width

                self.initializeChart();
                self.invalidate();
            }

        }).observe(this.canvas);


        this.initializeChart();

        this.draw();

        let downloadCanvas = this.dataQuery("downloadCanvas")

        downloadCanvas.addEventListener("click", () => { self.download(); })
    }

    set width(value: number) {
        this.props.width = value
    }

    set height(value: number) {
        this.props.height = value
    }

    handleClick = (): void => {
        window.requestAnimationFrame(this.draw);
    }

    handleMouseMove = (_args: any): void => {
    }

    public loadJson = (json: string): void => {
        console.log(json);

        this.loadObject(JSON.parse(json).wheel);
    }

    public loadObject = (wheel: Wheel): void => {

        this.wheel = wheel;

        if (this.canvas) {
            this.initializeChart();

            this.draw();
        }
    }

    download = (): void => {
        if (this.canvas) {
            var link = document.createElement('a');
            link.download = 'wheel.png';
            link.href = this.canvas.toDataURL()
            link.click();
        }
    }

    invalidate(): void {
        window.requestAnimationFrame(this.draw);
    }

    draw = (): void => {
        const canvas = this.canvas; // document.getElementById("wcgraph") as HTMLCanvasElement;

        if (canvas) {
            const renderer = new CanvasRenderer(canvas as HTMLCanvasElement);

            //          let backgroundColor = window.getComputedStyle(this).backgroundColor;

            //            renderer.clear(backgroundColor)
            renderer.clear(this.settings.chartBackground.style)

            this.titleComponent?.draw(renderer);
            this.wheelComponent?.draw(renderer);
        }
    }

    createComponent(name: string, worldBoundary: WcRect, viewpoint: IRect): WcComponent {
        const canvas = this.canvas;

        const device = new CanvasDevice(canvas as HTMLCanvasElement, viewpoint);
        device.onInvalidated = this.invalidate;

        const world = new WcWorld(worldBoundary);

        const view = new WcView(world, worldBoundary, new WcWindowsCoordinateSystem(worldBoundary, device.viewport), device);

        return new WcComponent(name, device, world, view);
    }

    initializeChart(): void {
        let labelHeight = 0;

        const hasLabel = this.wheel.title != undefined && this.wheel.title != "";

        if (hasLabel) {
            labelHeight = this.settings.labelHeight;

            this.canvas.height = this.canvas.width + this.settings.labelHeight;
        }

        const chartArea: IRect = new Rect(
            new Point(this.settings.chartMargin.left, this.settings.chartMargin.bottom),
            new Point(this.canvas.clientWidth - this.settings.chartMargin.right, this.canvas.clientHeight - this.settings.chartMargin.top));


        if (hasLabel) {
            const labelArea: IRect = new Rect(new Point(chartArea.x, chartArea.y),
                new Point(chartArea.x + chartArea.width, chartArea.y + labelHeight));

            const labelWorldBoundary: WcRect = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 200));

            this.titleComponent = this.createComponent("Title", labelWorldBoundary, labelArea)
            this.titleComponent.world.addFigure(new WcText(this.wheel.title, new WcPointF(500, 100), this.settings.titleFont, this.settings.titleBrush, TextAlignment.CenterMiddle))
        }

        const graphArea: IRect = new Rect(new Point(chartArea.x, chartArea.y + labelHeight),
            new Point(chartArea.x + chartArea.width, chartArea.y + chartArea.height));


        const wheelCenter: Point = graphArea.getCenter();
        const wheelSize: number = Math.min(graphArea.width, graphArea.height);

        const wheelArea: IRect = new Rect(new Point(wheelCenter.x - wheelSize / 2, wheelCenter.y - wheelSize / 2),
            new Point(wheelCenter.x + wheelSize / 2, wheelCenter.y + wheelSize / 2));

        const wheelWorldBoundary: WcRect = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 1000));

        this.wheelComponent = this.createComponent("Wheel", wheelWorldBoundary, wheelArea)


        this.wheelComponent.world.addFigure(new WcRectangle(wheelWorldBoundary, this.settings.chartBackground, this.settings.chartBorder));
        //this.wheelComponent.world.addFigure(new WcText(this.wheel.title, new WcPointF(100, 900), this.settings.titleFont, this.settings.titleBrush, TextAlignment.LeftBottom));
        this.wheelComponent.world.addFigure(new WcWheelGrid(new WcPointF(500, 500), this.wheel.categories, this.settings));


        const palette: TangoPalette = new TangoPalette();

        const sectorAngle: number = 2 * Math.PI / this.wheel.categories.length;
        let sectorCount: number = 0;


        this.wheel.categories.forEach(category => {
            if (this.wheelComponent) {
                this.wheelComponent.world.addFigure(new WcWheelSector(new WcPointF(500, 500), this.settings.calcAngle(sectorCount, sectorAngle), this.settings.calcAngle(sectorCount + 1, sectorAngle), category, palette.getColor(sectorCount), this.settings));
                sectorCount++;
            }
        });

    }
}

customElements.define('wheel-graph', WheelGraph);


