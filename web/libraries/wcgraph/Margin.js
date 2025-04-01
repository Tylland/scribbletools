export class Margin {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.horizontal = right + left;
        this.vertical = bottom + top;
    }
}
