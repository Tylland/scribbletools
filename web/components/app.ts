import {InnerHtml} from './innerhtml.ts';
import { WheelInput } from './wheelinput.ts';
import { WheelComponent } from './wheelcomponent.ts';

export class App extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = await InnerHtml.Import("/components/app.html");
    }
    
}

customElements.define('scribble-app', App);
