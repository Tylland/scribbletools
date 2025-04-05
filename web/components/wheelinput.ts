import { WheelLexer, WheelParser } from "../libraries/graphs/wheel/WheelParser.js";
import { JsonWheelVisitor } from "../libraries/graphs/wheel/JsonWheelVisitor.js"
//import { Wheel } from "../libraries/graphs/wheel/model/Wheel.js";
import { InnerHtml } from "./innerhtml.js";
import { ComponentBase } from "./base.js";


export class WheelInput extends ComponentBase {
    private parser: WheelParser;
    private textarea!: HTMLDivElement;

    constructor() {
        super();
        super.InitComponent(this);

        this.parser = new WheelParser();
    }

    dataQuery<E extends Element = Element>(name: string):E {
        let element = this.querySelector<E>('[data-component="' + name + '"]')

        if(element == null){
            throw new Error("data-component wtih value '" + name + "' is not found but required")
        } 

        return element 
    }

    async connectedCallback(){
        this.innerHTML = await InnerHtml.Import("/components/wheelinput.html");

        this.textarea = this.dataQuery<HTMLDivElement>("wheelInput")

        this.textarea.addEventListener("input", (evt:Event) => {
            this.loadText(this.textarea?.innerText ?? "")
        });


        let scribble = '"Endurance" : 6';

        const params = new URLSearchParams(window.location.search);

        const data = params.get("scribble");

        if (data != null) {
            scribble = atob(decodeURI(data));

            if(this.textarea != null){
                this.textarea.innerText = scribble
            }
        }

        let dropdownButton = this.dataQuery("dropdown-button");

        dropdownButton.addEventListener("click", (evt: Event) => {
            let dropdown = this.dataQuery("dropdown");

            dropdown.classList.toggle("hidden");

        })
        

        this.loadText = this.loadText.bind(this);

        this.loadInput(scribble);
    }


    loadInput(text: string) {
        this.parser.input = WheelLexer.tokenize(text).tokens;

        const cst = this.parser.wheel();

        if (this.parser.errors.length > 0) {
            for (let index = 0; index < this.parser.errors.length; index++) {
                console.warn(this.parser.errors[index].message);
            }

        }
        else {
            const visitor = new JsonWheelVisitor();

            const ast = visitor.visit(cst);

            console.log(ast);
            
            this.emitEvent("changed", ast)
        }
    }

    loadText(text:string) {
        this.loadInput(text);
        this.updateNavigation(text);
    }

    updateNavigation(text: string) {
        const scribble = btoa(text.trimEnd());

        window.history.pushState(scribble, '', 'index.html?scribble=' + encodeURI(scribble));

    }
}

customElements.define('wheel-input', WheelInput);

 

