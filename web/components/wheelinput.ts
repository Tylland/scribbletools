import { WheelLexer, WheelParser } from "../libraries/graphs/wheel/WheelParser.ts";
import { JsonWheelVisitor } from "../libraries/graphs/wheel/JsonWheelVisitor.ts"
//import { Wheel } from "../libraries/graphs/wheel/model/Wheel.ts";
import { InnerHtml } from "./innerhtml.ts";
import { ComponentBase } from "./base.ts";


export class WheelInput extends ComponentBase {
    private parser: WheelParser;
    private textarea!: HTMLDivElement;

    constructor() {
        super();
        super.InitComponent(this);

        this.parser = new WheelParser();
    }

    dataComponent<E extends Element = Element>(name: string):E {
        let element = this.querySelector<E>('[data-component="' + name + '"]')

        if(element == null){
            throw new Error("data-component wtih value '" + name + "' is not found but required")
        } 

        return element 
    }

    async connectedCallback(){
        this.innerHTML = await InnerHtml.Import("/components/wheelinput.html");

        this.textarea = this.dataComponent<HTMLDivElement>("wheelInput")

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

        let dropdownButton = this.dataComponent("dropdown-button");
        let dropdown = this.dataComponent("dropdown");

        dropdownButton.addEventListener("click", (evt: Event) => {
            dropdown.classList.toggle("hidden");
            evt.stopPropagation();
        })
        
         // Close dropdown when clicking outside
         document.addEventListener('click', (event: MouseEvent) => {
            if (!dropdown.contains(event.target as Node) && !dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            }
        });

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

 

