import { WheelGraph } from "./wheelgraph.js";
import { WheelInput } from "./wheelinput.js";
import { InnerHtml } from "./innerhtml.js";
import { ComponentBase } from "./base.js";
export class WheelComponent extends ComponentBase {
    constructor() {
        super();
        this.handleLoadedObject = (wheel) => {
            if (this.graph) {
                this.graph?.loadObject(wheel);
            }
            else {
                this.pendingWheel = wheel;
            }
        };
        this.handleLoadedJson = (json) => {
            this.graph?.loadJson(json);
            loadedJson: json;
        };
        super.InitComponent(this);
    }
    async connectedCallback() {
        this.innerHTML = await InnerHtml.Import("/components/wheelcomponent.html");
        this.graph = this.querySelector("wheel-graph");
        this.input = this.querySelector("wheel-input");
        this.input?.addEventListener("changed", (evt) => {
            this.graph?.loadObject(evt.detail);
        });
        // if (this.pendingWheel) {
        //     this.graph?.loadObject(this.pendingWheel);
        // }
    }
}
;
customElements.define('wheel-component', WheelComponent);
//export default WheelComponent;
