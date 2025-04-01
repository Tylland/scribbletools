export class Pen {
    constructor(public style: string, public width: number) {
    }

    public static none: Pen = new Pen("none", 0);
}