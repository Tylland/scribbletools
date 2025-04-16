import { WheelParser } from "./WheelParser.js";


const parserInstance = new WheelParser();

const BaseWheelVisitor = parserInstance.getBaseCstVisitorConstructor();

interface IWheelNode {
    title: any;
    categories: any;
}

interface ICategoriesNode {
    category: Array<any>;
}

interface ICategoryNode {
    QuotedText: any;
    WordText: any;
    NumberLiteral: any;
}
interface ITitleNode {
    Title: any;
    QuotedText: any;
    WordText: any;
}

export class JsonWheelVisitor extends BaseWheelVisitor {
    constructor() {
        super()
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        this.validateVisitor()
    }

    /* Visit methods go here */

    wheel(node: IWheelNode) {

        let title: string = ""

        if (node.title != undefined) {
            title = this.visit(node.title);
        }

        let categories: Array<any> = [];

         if (node.categories != undefined) {
             categories = this.visit(node.categories);
         }

        console.log('wheel');

        return {
            title: title,
            categories: categories,
        };
    }

    title(node: ITitleNode) {
        let title: string = '';

        if (node.QuotedText != undefined) {
            title = node.QuotedText[0].image;
            title = title.substring(1, title.length - 1);
        }

        if (node.WordText != undefined) {
            title = node.WordText[0].image;
        }

        return title;
    }

    categories(node: ICategoriesNode) {
        return node.category.map(category => this.visit(category));
    }

    category(node: ICategoryNode) {
        let label: string = '';
        let score: number = 5;

        if (node.QuotedText != undefined) {
            label = node.QuotedText[0].image;
            label = label.substring(1, label.length - 1);
        }

        if (node.WordText != undefined) {
            label = node.WordText[0].image;
        }

        if (node.NumberLiteral != undefined)
            score = parseFloat(node.NumberLiteral[0].image);

        return {
            label: label,
            score: score,
        }
    }
}
