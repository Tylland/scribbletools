export enum ViewportSize {
    $3xs = 256,
    $2xs = 288, 
    $xs = 320,
    $sm = 384,
    $md = 448,
    $lg = 512,
    $xl = 576,
    $2xl = 672,
    $3xl = 768,
    $4xl = 896,
    $5xl = 1024,
    $6xl = 1152,
    $7xl = 1280,
    Max = 1280
  }


export class ViewportSizes {
   public static getViewportSize(width: number): ViewportSize {

    let size: keyof typeof ViewportSize;
    for (size in ViewportSize) {
        const value = ViewportSize[size];

        if(width <= parseFloat(value)){
            //return value as ViewportSize;
            return  ViewportSize[size as unknown as keyof typeof ViewportSize] as ViewportSize
        }
    }

    throw new Error("Method not implemented.");
  }
}
