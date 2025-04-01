export class ValueRange {
    public min: number = Number.MAX_VALUE;
    public max: number = -Number.MAX_VALUE;


    containValue(value: number): void {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
    }

    containValues(values: number[]): void {
        for (var i: number = 0; i < values.length; i++) {
            this.containValue(values[i]);
        }
    }

    constructor(values: number[]) {
        this.containValues(values);
    }
}