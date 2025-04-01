import type { DrawCommandType, IDrawCommand } from "./IDrawCommand.ts";

export class MoveTo implements IDrawCommand{
    public type: DrawCommandType = 'moveTo';

    constructor(public x: number, public y: number) {
    }
}