import type { IWcCoordinateSystem } from "./IWcCoordinateSystem.ts";
import type { IDevice } from "./IDevice.ts";
import type { IWcRect } from "./IWcRect.ts";
import type { IWcTransformation } from "./IWcTransformation.ts";
import { WcWorld } from "./WcWorld";

export interface IWcView extends IWcTransformation {
    readonly world: WcWorld;
    readonly window: IWcRect;
    readonly coordinateSystem: IWcCoordinateSystem;
    readonly device: IDevice;
    invalidate(): void;
}