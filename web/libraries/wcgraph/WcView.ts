import type { IWcRect } from "./IWcRect.ts";
import { WcWorld } from "./WcWorld.ts";
import type { IWcView } from "./IWcView.ts";
import { Point } from "./Point.ts";
import type { IRect } from "./IRect.ts";
import type { IWcCoordinateSystem } from "./IWcCoordinateSystem.ts";
import type { IWcPoint } from "./IWcPoint.ts";
import type { IDevice } from "./IDevice.ts";

export class WcView implements IWcView{
   
    constructor(public readonly world: WcWorld, public readonly window: IWcRect, public readonly coordinateSystem: IWcCoordinateSystem, public readonly device: IDevice) {
    }

    invalidate(): void {
        this.device.invalidate();
    }

    worldPointToDevice(worldPoint: IWcPoint): Point { return this.coordinateSystem.worldPointToDevice(worldPoint); }
    devicePointToWorld(devicePoint: Point): IWcPoint { return this.coordinateSystem.devicePointToWorld(devicePoint); }
    worldRectToDevice(worldRect: IWcRect): IRect { return this.coordinateSystem.worldRectToDevice(worldRect); }
    deviceRectToWorld(deviceRect: IRect): IWcRect { return this.coordinateSystem.deviceRectToWorld(deviceRect); }
}

