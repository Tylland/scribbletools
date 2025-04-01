import type { IHittable } from "./IHittable.js";

export interface IExpandable extends IHittable {
	expanded: boolean;
}