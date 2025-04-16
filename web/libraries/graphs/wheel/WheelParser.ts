
import { createToken, Lexer, CstParser } from "../../../assets/chevrotain/chevrotain"
//import { createToken, Lexer, CstParser } from "chevrotain"

//import { createToken, Lexer, CstParser } from "@/assets/chevrotain/chevrotain"


// ----------------- Lexer -----------------

// Define the tokens
const HashSymbol = createToken({ name: "HashSymbol", pattern: /#/ });
//const TitleText = createToken({ name: "TitleText", pattern: /[^\n]+/ }); // Matches everything after '#'
const Colon = createToken({ name: "Colon", pattern: /:/ });


const WordText = createToken({ name: "WordText", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });
const QuotedText = createToken({ name: "QuotedText", pattern: /"[^"]+"/ });

const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /[0-9]+/ });
const NewLine = createToken({ name: "NewLine", pattern: /\n/ });
const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });

// Token list
const wheelTokens = [WhiteSpace, HashSymbol, WordText, QuotedText, Colon, NumberLiteral, NewLine];


export const WheelLexer = new Lexer(wheelTokens, {
    // Less position info tracked, reduces verbosity of the playground output.
    positionTracking: "onlyStart"
});



// ----------------- parser -----------------

export class WheelParser extends CstParser {
    public wheel: any;
    private title: any;
    private categories: any;
    private category: any;

    constructor() {
        super(wheelTokens, {
            recoveryEnabled: true
        })

        const $ = this;

        this.wheel = this.RULE("wheel", () => {
            $.OPTION(() => {
                $.SUBRULE($.title);
            });
            $.SUBRULE($.categories);
        });

        this.title = this.RULE("title", () => {
            $.CONSUME(HashSymbol);
            $.OR([
                { ALT: () => $.CONSUME(WordText) },    // Accept unquoted title text like "Wheel"
                { ALT: () => $.CONSUME(QuotedText) }, // Accept quoted title text
            ]);
        });

        this.categories = this.RULE("categories", () => {
            $.AT_LEAST_ONE(() => {
                $.SUBRULE($.category);
            });
        });

        this.category = this.RULE("category", () => {
            $.OR([
                { ALT: () => $.CONSUME(WordText) },    // Accept unquoted title text like "Wheel"
                { ALT: () => $.CONSUME(QuotedText) }, // Accept quoted title text
            ]);

            $.CONSUME(Colon);
            $.CONSUME(NumberLiteral);
            $.OPTION(() => {
                $.CONSUME(NewLine);
            });
        });

        this.performSelfAnalysis();

        // this.wheel = this.RULE("wheel", () => {
        //     this.OPTION(() => { this.SUBRULE(this.title) });
        //     this.MANY(() => { this.SUBRULE(this.categories) });
        // });

        // this.categories = this.RULE("categories", () => {
        //     this.CONSUME(StringLiteral);
        //     this.CONSUME(Colon);
        //     this.CONSUME(Score);
        // });

        // this.title = this.RULE("title", () => {
        //     this.OPTION(() => {
        //         this.CONSUME(Hashtag);
        //         this.CONSUME(StringLiteral);
        //     });
        // });


        // very important to call this after all the rules have been setup.
        // otherwise the parser may not work correctly as it will lack information
        // derived from the self analysis.
        this.performSelfAnalysis();
    }
}


