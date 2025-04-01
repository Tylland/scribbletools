import {WheelGraph} from './wheelgraph.ts';
import { WheelInput } from './wheelinput.ts';
import type { Wheel } from '../libraries/graphs/wheel/model/Wheel.ts';
import { InnerHtml } from './innerhtml.ts';
import { ComponentBase } from './base.ts';


type WheelComponentProps = {
    scribble: string | undefined;
}

export class WheelComponent extends ComponentBase {
    private pendingWheel: Wheel | undefined;
    //private props: WheelComponentProps;

    private input: WheelInput | undefined | null;
    private graph: WheelGraph | undefined | null;

    constructor() {
        super();
        super.InitComponent(this);        
    }

    async connectedCallback() {
        this.innerHTML = await InnerHtml.Import("/components/wheelcomponent.html")


        this.graph = this.querySelector<WheelGraph>("wheel-graph")

        this.input = this.querySelector<WheelInput>("wheel-input")

        this.input?.addEventListener("changed", (evt:Event) => {
            this.graph?.loadObject((evt as CustomEvent).detail);
        });



        // if (this.pendingWheel) {
        //     this.graph?.loadObject(this.pendingWheel);
        // }
    }

    handleLoadedObject = (wheel: Wheel): void => {
        if (this.graph) {
            this.graph?.loadObject(wheel);
        }
        else {
            this.pendingWheel = wheel;
        }
    }

    handleLoadedJson = (json: string): void => {
        this.graph?.loadJson(json);

        loadedJson: json;
    }

};

customElements.define('wheel-component', WheelComponent);

//export default WheelComponent;