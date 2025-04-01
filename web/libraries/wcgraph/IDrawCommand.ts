export type DrawCommandType = 'moveTo' | 'lineTo' | 'arc';

export interface IDrawCommand {
	type: DrawCommandType;
}