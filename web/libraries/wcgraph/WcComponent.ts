import type { IDevice } from "./IDevice.ts";
import type { IRenderer } from "./IRenderer.ts";
import type { IWcView } from "./IWcView.ts";
import { WcWorld } from "./WcWorld.ts";

export class WcComponent {
    constructor(public name: string, public device: IDevice, public world: WcWorld, public view: IWcView) { }

    public draw(renderer: IRenderer) {
        this.world.draw(renderer, this.view);
    }
}