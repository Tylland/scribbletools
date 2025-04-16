import { ViewportSize, ViewportSizes } from "./ViewportSize.js";
export class Font {
    constructor(family, size) {
        this.family = family;
        this.size = size;
    }
    getFamily() {
        return this.family;
    }
    getSize(_) {
        return this.size;
    }
    toFont(_) {
        return this;
    }
}
export class ResponsiveFont {
    constructor(family, size, breakpoints = []) {
        this.family = family;
        this.size = size;
        this.breakpoints = breakpoints;
    }
    getFamily() {
        return this.family;
    }
    getSize(deviceWidth) {
        let size = this.size;
        for (let i = 0; i < this.breakpoints.length; i++) {
            if (deviceWidth >= this.breakpoints[i].viewportSize) {
                size = Math.max(size, this.breakpoints[i].value);
            }
        }
        return size;
    }
    toFont(deviceWidth) {
        return new Font(this.family, this.getSize(deviceWidth));
    }
}
export class Breakpoint {
    constructor(viewportSize, value) {
        this.viewportSize = viewportSize;
        this.value = value;
    }
}
export var FontSize;
(function (FontSize) {
    FontSize[FontSize["XS3"] = 8] = "XS3";
    FontSize[FontSize["XS2"] = 10] = "XS2";
    FontSize[FontSize["XS"] = 12] = "XS";
    FontSize[FontSize["SM"] = 14] = "SM";
    FontSize[FontSize["MD"] = 16] = "MD";
    FontSize[FontSize["LG"] = 18] = "LG";
    FontSize[FontSize["XL"] = 20] = "XL";
    FontSize[FontSize["XL2"] = 24] = "XL2";
    FontSize[FontSize["XL3"] = 30] = "XL3";
    FontSize[FontSize["XL4"] = 36] = "XL4";
    FontSize[FontSize["XL5"] = 46] = "XL5";
    FontSize[FontSize["XL6"] = 60] = "XL6";
    FontSize[FontSize["XL7"] = 72] = "XL7";
    FontSize[FontSize["XL8"] = 96] = "XL8";
    FontSize[FontSize["XL9"] = 128] = "XL9";
})(FontSize || (FontSize = {}));
