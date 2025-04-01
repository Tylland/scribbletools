export class ValueRange {
    containValue(value) {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
    }
    containValues(values) {
        for (var i = 0; i < values.length; i++) {
            this.containValue(values[i]);
        }
    }
    constructor(values) {
        this.min = Number.MAX_VALUE;
        this.max = -Number.MAX_VALUE;
        this.containValues(values);
    }
}
