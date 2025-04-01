import type { IHittable } from "./IHittable.ts";
import type { IWcView } from "./IWcView.ts";
import { PopupInfo } from "./PopupInfo.ts";

export interface IPopupHost extends IHittable {
    getPopupInfo(view: IWcView): PopupInfo;
}