export class ComponentBase extends HTMLElement {
    constructor() {
        super();
    }
    InitComponent(component) {
        this.parent = component;
        this.target = component;
    }
    dataComponent(name) {
        if (this.parent == null) {
            throw new Error("parent property is not initiated");
        }
        let element = this.parent.querySelector('[data-component="' + name + '"]');
        if (element == null) {
            throw new Error("data-component wtih value '" + name + "' is not found but required");
        }
        return element;
    }
    on(name, eventName, listener) {
        this.dataComponent(name).addEventListener(eventName, listener);
    }
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail: detail,
            bubbles: true
        });
        this.target?.dispatchEvent(event);
    }
}
