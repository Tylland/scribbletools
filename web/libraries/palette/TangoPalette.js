import { ColorInfo } from "./ColorInfo.js";
export class TangoPalette {
    constructor() {
        this.colors = [
            new ColorInfo("Aluminium", "#eeeeec", "#d3d7cf66", "#babdb6"),
            new ColorInfo("Butter", "#fce94f", "#edd40066", "#c4a000"),
            new ColorInfo("Chameleon", "#8ae234", "#73d21666", "#4e9a06"),
            new ColorInfo("Orange", "#fcaf3e", "#f5790066", "#ce5c00"),
            new ColorInfo("Chocolate", "#e9b96e", "#c17d1166", "#8f5902"),
            new ColorInfo("Sky Blue", "#729fcf", "#3465a466", "#204a87"),
            new ColorInfo("Plum", "#ad7fa8", "#75507b66", "#5c3566"),
            new ColorInfo("Slate", "#888a85", "#55575366", "#2e3436"),
            new ColorInfo("Scarlet Red", "#ef292966", "#cc000066", "#a40000")
        ];
        this.scheme = [7, 2, 4, 6, 8, 1, 3, 5, 0];
    }
    getColor(index) {
        index = index % this.scheme.length;
        return this.colors[this.scheme[index]];
    }
}
