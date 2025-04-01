import { WcMouseEventArgs } from "./WcMouseEventArgs.ts";

export interface IMouseInteraction {
    onMouseMove(args: WcMouseEventArgs): boolean;
}