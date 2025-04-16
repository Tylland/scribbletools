export var ViewportSize;
(function (ViewportSize) {
    ViewportSize[ViewportSize["$3xs"] = 256] = "$3xs";
    ViewportSize[ViewportSize["$2xs"] = 288] = "$2xs";
    ViewportSize[ViewportSize["$xs"] = 320] = "$xs";
    ViewportSize[ViewportSize["$sm"] = 384] = "$sm";
    ViewportSize[ViewportSize["$md"] = 448] = "$md";
    ViewportSize[ViewportSize["$lg"] = 512] = "$lg";
    ViewportSize[ViewportSize["$xl"] = 576] = "$xl";
    ViewportSize[ViewportSize["$2xl"] = 672] = "$2xl";
    ViewportSize[ViewportSize["$3xl"] = 768] = "$3xl";
    ViewportSize[ViewportSize["$4xl"] = 896] = "$4xl";
    ViewportSize[ViewportSize["$5xl"] = 1024] = "$5xl";
    ViewportSize[ViewportSize["$6xl"] = 1152] = "$6xl";
    ViewportSize[ViewportSize["$7xl"] = 1280] = "$7xl";
    ViewportSize[ViewportSize["Max"] = 1280] = "Max";
})(ViewportSize || (ViewportSize = {}));
export class ViewportSizes {
    static getViewportSize(width) {
        let size;
        for (size in ViewportSize) {
            const value = ViewportSize[size];
            if (width <= parseFloat(value)) {
                //return value as ViewportSize;
                return ViewportSize[size];
            }
        }
        throw new Error("Method not implemented.");
    }
}
