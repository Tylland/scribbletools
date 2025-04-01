export class ComponentBase extends HTMLElement {
    private parent : ParentNode | undefined;
    private target : EventTarget| undefined;

    constructor() {
        super();
    }

    public InitComponent(component: any) {
        this.parent = component as ParentNode
        this.target = component as EventTarget
    }

    protected dataQuery<E extends Element = Element>(name: string):E {
        if(this.parent == null){
            throw new Error("parent property is not initiated")
        } 

        let element = this.parent.querySelector<E>('[data-component="' + name + '"]')

        if(element == null){
            throw new Error("data-component wtih value '" + name + "' is not found but required")
        } 

        return element 
    }

    protected emitEvent(name: string, detail: any) {
        const event = new CustomEvent(name, {
            detail: detail,
            bubbles: true
        });

        this.target?.dispatchEvent(event)
    }


}