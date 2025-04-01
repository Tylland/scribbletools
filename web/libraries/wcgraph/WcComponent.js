import { WcWorld } from "./WcWorld.js";
export class WcComponent {
    constructor(name, device, world, view) {
        this.name = name;
        this.device = device;
        this.world = world;
        this.view = view;
    }
    draw(renderer) {
        this.world.draw(renderer, this.view);
    }
}
