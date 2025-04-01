export class Brush {
    constructor(public style: string) {
    }

    public static none: Brush = new Brush("none");
}