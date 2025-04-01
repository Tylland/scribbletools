import type { DrawCommandType, IDrawCommand } from "./IDrawCommand.js";

export class LineTo implements IDrawCommand {
    public type: DrawCommandType = 'lineTo';

    constructor(public x: number, public y: number) {
    }
}