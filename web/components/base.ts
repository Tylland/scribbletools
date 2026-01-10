export interface EventData {
    [key: string]: unknown;
}

export class ComponentBase extends HTMLElement {
    private parent : ParentNode | undefined;
    private target : EventTarget| undefined;

    constructor() {
        super();
    }

    public InitComponent(component: HTMLElement) {
        this.parent = component as ParentNode
        this.target = component as EventTarget
    }

    protected dataComponent<E extends Element = Element>(name: string):E {
        if(this.parent == null){
            throw new Error("parent property is not initiated")
        } 

        let element = this.parent.querySelector<E>('[data-component="' + name + '"]')

        if(element == null){
            throw new Error("data-component wtih value '" + name + "' is not found but required")
        } 

        return element 
    }

    protected on(name: string, eventName: string, listener: EventListenerOrEventListenerObject):void {
        this.dataComponent(name).addEventListener(eventName, listener);
    }

    protected emitEvent(name: string, detail: EventData) {
        const event = new CustomEvent(name, {
            detail: detail,
            bubbles: true
        });

        this.target?.dispatchEvent(event)
    }


}