export class Margin {
    public horizontal: number;
    public vertical: number;

    constructor(public left: number, public top: number, public right: number, public bottom: number) {
        this.horizontal = right + left;
        this.vertical = bottom + top;
    }
}