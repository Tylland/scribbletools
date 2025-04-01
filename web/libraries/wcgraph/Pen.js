export class Pen {
    constructor(style, width) {
        this.style = style;
        this.width = width;
    }
}
Pen.none = new Pen("none", 0);
