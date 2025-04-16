import { WcRect } from "../libraries/wcgraph/WcRect.js";
import { WcWorld } from "../libraries/wcgraph/WcWorld.js";
import { WcPointF } from "../libraries/wcgraph/WcPointF.js";
import { CanvasRenderer } from "../libraries/wcgraph/CanvasRenderer.js";
import { WcRectangle } from "../libraries/wcgraph/WcRectangle.js";
import { Rect } from "../libraries/wcgraph/Rect.js";
import { Point } from "../libraries/wcgraph/Point.js";
import { WcView } from "../libraries/wcgraph/WcView.js";
import { Font } from "../libraries/wcgraph/Font.js";
import { WcComponent } from "../libraries/wcgraph/WcComponent.js";
import { CanvasDevice } from "../libraries/wcgraph/CanvasDevice.js";
import { WcWheelGrid } from "../libraries/graphs/wheel/WcWheelGrid.js";
import { WheelSettings } from "../libraries/graphs/wheel/WheelSettings.js";
import { WcWheelSector } from "../libraries/graphs/wheel/WcWheelSector.js";
import { WcWindowsCoordinateSystem } from "../libraries/wcgraph/WcWindowsCoordinateSystem.js";
import { TangoPalette } from "../libraries/palette/TangoPalette.js";
import { WcText } from "../libraries/wcgraph/WcText.js";
import { TextAlignment } from "../libraries/wcgraph/TextAlignment.js";
import { InnerHtml } from "./innerhtml.js";
import { ComponentBase } from "./base.js";
class WheelGraphProps {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
export class WheelGraph extends ComponentBase {
    constructor() {
        super();
        this.settings = new WheelSettings();
        this.wheel = { title: '', categories: [] };
        this.handleClick = () => {
            window.requestAnimationFrame(this.draw);
        };
        this.handleMouseMove = (_args) => {
        };
        this.loadJson = (json) => {
            console.log(json);
            this.loadObject(JSON.parse(json).wheel);
        };
        this.loadObject = (wheel) => {
            this.wheel = wheel;
            if (this.canvas) {
                this.initializeChart();
                this.draw();
            }
        };
        this.download = () => {
            if (this.canvas) {
                var link = document.createElement('a');
                link.download = 'wheel.png';
                link.href = this.canvas.toDataURL();
                link.click();
            }
        };
        this.draw = () => {
            const canvas = this.canvas; // document.getElementById("wcgraph") as HTMLCanvasElement;
            if (canvas) {
                const renderer = new CanvasRenderer(canvas);
                //          let backgroundColor = window.getComputedStyle(this).backgroundColor;
                //            renderer.clear(backgroundColor)
                renderer.clear(this.settings.chartBackground.style);
                this.titleComponent?.draw(renderer);
                this.wheelComponent?.draw(renderer);
            }
        };
        super.InitComponent(this);
        this.props = new WheelGraphProps(800, 800);
        this.viewport = new Rect(new Point(0, 0), new Point(this.props.width, this.props.height));
    }
    measureText(_text, _font) {
        throw new Error("Method not implemented.");
    }
    async connectedCallback() {
        let self = this;
        this.innerHTML = await InnerHtml.Import("/components/wheelgraph.html");
        this.canvas = this.dataQuery("wheelCanvas");
        this.canvas.onresize = function (evt) {
            self.invalidate();
        };
        new ResizeObserver(entries => {
            if (entries.length > 0) {
                let { width } = entries[0].contentRect;
                this.canvas.width = width;
                this.canvas.height = width;
                self.initializeChart();
                self.invalidate();
            }
        }).observe(this.canvas);
        this.initializeChart();
        this.draw();
        let downloadCanvas = this.dataQuery("downloadCanvas");
        downloadCanvas.addEventListener("click", () => { self.download(); });
    }
    set width(value) {
        this.props.width = value;
    }
    set height(value) {
        this.props.height = value;
    }
    invalidate() {
        window.requestAnimationFrame(this.draw);
    }
    createComponent(name, worldBoundary, viewpoint) {
        const canvas = this.canvas;
        const device = new CanvasDevice(canvas, viewpoint);
        device.onInvalidated = this.invalidate;
        const world = new WcWorld(worldBoundary);
        const view = new WcView(world, worldBoundary, new WcWindowsCoordinateSystem(worldBoundary, device.viewport), device);
        return new WcComponent(name, device, world, view);
    }
    initializeChart() {
        let labelHeight = 0;
        const hasLabel = this.wheel.title != undefined && this.wheel.title != "";
        if (hasLabel) {
            labelHeight = this.settings.labelHeight;
            this.canvas.height = this.canvas.width + this.settings.labelHeight;
        }
        const chartArea = new Rect(new Point(this.settings.chartMargin.left, this.settings.chartMargin.bottom), new Point(this.canvas.clientWidth - this.settings.chartMargin.right, this.canvas.clientHeight - this.settings.chartMargin.top));
        if (hasLabel) {
            const labelArea = new Rect(new Point(chartArea.x, chartArea.y), new Point(chartArea.x + chartArea.width, chartArea.y + labelHeight));
            const labelWorldBoundary = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 200));
            this.titleComponent = this.createComponent("Title", labelWorldBoundary, labelArea);
            this.titleComponent.world.addFigure(new WcText(this.wheel.title, new WcPointF(500, 100), this.settings.titleFont, this.settings.titleBrush, TextAlignment.CenterMiddle));
        }
        const graphArea = new Rect(new Point(chartArea.x, chartArea.y + labelHeight), new Point(chartArea.x + chartArea.width, chartArea.y + chartArea.height));
        const wheelCenter = graphArea.getCenter();
        const wheelSize = Math.min(graphArea.width, graphArea.height);
        const wheelArea = new Rect(new Point(wheelCenter.x - wheelSize / 2, wheelCenter.y - wheelSize / 2), new Point(wheelCenter.x + wheelSize / 2, wheelCenter.y + wheelSize / 2));
        const wheelWorldBoundary = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 1000));
        this.wheelComponent = this.createComponent("Wheel", wheelWorldBoundary, wheelArea);
        this.wheelComponent.world.addFigure(new WcRectangle(wheelWorldBoundary, this.settings.chartBackground, this.settings.chartBorder));
        //this.wheelComponent.world.addFigure(new WcText(this.wheel.title, new WcPointF(100, 900), this.settings.titleFont, this.settings.titleBrush, TextAlignment.LeftBottom));
        this.wheelComponent.world.addFigure(new WcWheelGrid(new WcPointF(500, 500), this.wheel.categories, this.settings));
        const palette = new TangoPalette();
        const sectorAngle = 2 * Math.PI / this.wheel.categories.length;
        let sectorCount = 0;
        this.wheel.categories.forEach(category => {
            if (this.wheelComponent) {
                this.wheelComponent.world.addFigure(new WcWheelSector(new WcPointF(500, 500), this.settings.calcAngle(sectorCount, sectorAngle), this.settings.calcAngle(sectorCount + 1, sectorAngle), category, palette.getColor(sectorCount), this.settings));
                sectorCount++;
            }
        });
    }
}
customElements.define('wheel-graph', WheelGraph);
