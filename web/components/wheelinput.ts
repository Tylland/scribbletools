import { WheelLexer, WheelParser } from "../libraries/graphs/wheel/WheelParser.ts";
import { JsonWheelVisitor } from "../libraries/graphs/wheel/JsonWheelVisitor.ts"
//import { Wheel } from "../libraries/graphs/wheel/model/Wheel.ts";
import { InnerHtml } from "./innerhtml.ts";
import { ComponentBase } from "./base.ts";


export class WheelInput extends ComponentBase {
    private parser: WheelParser;
    private textarea!: HTMLDivElement;
    private documentClickHandler?: (event: MouseEvent) => void;
    private textareaInputHandler?: (evt: Event) => void;
    private dropdownClickHandler?: (evt: Event) => void;

    constructor() {
        super();
        super.InitComponent(this);

        this.parser = new WheelParser();
    }

    async connectedCallback(){
        try {
            this.innerHTML = await InnerHtml.Import("/components/wheelinput.html");
        } catch (error) {
            console.error('Failed to load wheelinput template:', error);
            this.innerHTML = '<div class="text-red-500">Failed to load component</div>';
            return;
        }

        this.textarea = this.dataComponent<HTMLDivElement>("wheelInput")

        this.textareaInputHandler = (evt: Event) => {
            this.loadText(this.textarea?.innerText ?? "")
        };
        this.textarea.addEventListener("input", this.textareaInputHandler);


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

        this.dropdownClickHandler = (evt: Event) => {
            dropdown.classList.toggle("hidden");
            evt.stopPropagation();
        };
        dropdownButton.addEventListener("click", this.dropdownClickHandler);
        
        // Close dropdown when clicking outside
        this.documentClickHandler = (event: MouseEvent) => {
            if (!dropdown.contains(event.target as Node) && !dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            }
        };
        document.addEventListener('click', this.documentClickHandler);

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

    disconnectedCallback() {
        // Clean up event listeners to prevent memory leaks
        if (this.textareaInputHandler) {
            this.textarea.removeEventListener("input", this.textareaInputHandler);
        }
        if (this.documentClickHandler) {
            document.removeEventListener('click', this.documentClickHandler);
        }
        if (this.dropdownClickHandler) {
            const dropdownButton = this.querySelector('[data-component="dropdown-button"]');
            dropdownButton?.removeEventListener("click", this.dropdownClickHandler);
        }
    }
}

customElements.define('wheel-input', WheelInput);

 

