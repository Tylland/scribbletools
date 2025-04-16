import { ViewportSize, ViewportSizes } from "./ViewportSize.ts";

export interface IFont {
    getFamily(): string
    getSize(deviceWidth: number): number
    toFont(deviceWidth: number): Font
}

export class Font implements IFont {
    constructor(public family: string, public size: number) {
    }

    getFamily(): string {
        return this.family;
    }

    getSize(_: number): number {
        return this.size;
    }

    toFont(_: number): Font {
        return this
    }
}

export class ResponsiveFont {
    constructor(private family: string, private size: number, private breakpoints: Breakpoint<FontSize>[] = []) {
    }

    getFamily(): string {
        return this.family;
    }

    getSize(deviceWidth: number): number {
        let size = this.size;

        for(let i=0; i<this.breakpoints.length; i++){
            if (deviceWidth >= this.breakpoints[i].viewportSize)
            {
                size = Math.max(size, this.breakpoints[i].value)
            }
          }

        return size;
    }

    toFont(deviceWidth: number): Font {
        return new Font(this.family, this.getSize(deviceWidth))
    }

}

export class Breakpoint<Type> {
    constructor(public viewportSize: ViewportSize, public value: Type) {
    }
}

export enum FontSize {
    XS3 = 8,
    XS2 = 10,
    XS = 12,
    SM = 14,
    MD = 16,
    LG = 18,
    XL = 20,
    XL2 = 24,
    XL3 = 30,
    XL4 = 36,
    XL5 = 46,
    XL6 = 60,
    XL7 = 72,
    XL8 = 96,
    XL9 = 128
} 