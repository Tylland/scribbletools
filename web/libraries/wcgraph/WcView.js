import { WcWorld } from "./WcWorld.js";
import { Point } from "./Point.js";
export class WcView {
    constructor(world, window, coordinateSystem, device) {
        this.world = world;
        this.window = window;
        this.coordinateSystem = coordinateSystem;
        this.device = device;
    }
    invalidate() {
        this.device.invalidate();
    }
    worldPointToDevice(worldPoint) { return this.coordinateSystem.worldPointToDevice(worldPoint); }
    devicePointToWorld(devicePoint) { return this.coordinateSystem.devicePointToWorld(devicePoint); }
    worldRectToDevice(worldRect) { return this.coordinateSystem.worldRectToDevice(worldRect); }
    deviceRectToWorld(deviceRect) { return this.coordinateSystem.deviceRectToWorld(deviceRect); }
}
