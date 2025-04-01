import { createToken, Lexer, CstParser } from "../../../assets/chevrotain/chevrotain";
//import { createToken, Lexer, CstParser } from "chevrotain"
//import { createToken, Lexer, CstParser } from "@/assets/chevrotain/chevrotain"
// ----------------- Lexer -----------------
const Hashtag = createToken({ name: "Hashtag", pattern: /#/ });
const Label = createToken({ name: "Label", pattern: /[a-zA-Z\u00C0-\u00ff]\w*/ });
const Colon = createToken({ name: "Colon", pattern: /:/ });
const Score = createToken({
    name: "Score", pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
});
const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});
const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED
});
const wheelTokens = [WhiteSpace, Hashtag, StringLiteral, Label, Colon, Score];
export const WheelLexer = new Lexer(wheelTokens, {
    // Less position info tracked, reduces verbosity of the playground output.
    positionTracking: "onlyStart"
});
// ----------------- parser -----------------
export class WheelParser extends CstParser {
    constructor() {
        super(wheelTokens, {
            recoveryEnabled: true
        });
        this.wheel = this.RULE("wheel", () => {
            this.OPTION(() => { this.SUBRULE(this.title); });
            this.MANY(() => { this.SUBRULE(this.categories); });
        });
        this.categories = this.RULE("categories", () => {
            this.CONSUME(StringLiteral);
            this.CONSUME(Colon);
            this.CONSUME(Score);
        });
        this.title = this.RULE("title", () => {
            this.OPTION(() => {
                this.CONSUME(Hashtag);
                this.CONSUME(StringLiteral);
            });
        });
        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis();
    }
}
