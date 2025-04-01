import { InnerHtml } from "./innerhtml.js";
import { WheelInput } from "./wheelinput.js";
import { WheelComponent } from "./wheelcomponent.js";
export class App extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        this.innerHTML = await InnerHtml.Import("/components/app.html");
    }
}
customElements.define('scribble-app', App);
