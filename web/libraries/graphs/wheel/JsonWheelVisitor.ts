import { WheelParser } from "./WheelParser.js";


const parserInstance = new WheelParser();

const BaseWheelVisitor = parserInstance.getBaseCstVisitorConstructor();

interface IWheelNode {
    title: any;
    categories: Array<any>;
}

interface ICategoryNode {
    StringLiteral: any;
    Score: any;
}
interface ITitleNode {
    Title: any;
    StringLiteral: any;
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

        const title = this.visit(node.title);

        let categories: Array<any> = [];

        if (node.categories != undefined)
            categories = node.categories.map(category => this.visit(category));

        console.log('wheel');

        return {
            title: title,
            categories: categories,
        };
    }

    title(node: ITitleNode) {
        let title: string = '';

        if (node.StringLiteral != undefined) {
            title = node.StringLiteral[0].image;
            title = title.substring(1, title.length - 1);
        }

        return title;
    }

    categories(node: ICategoryNode) {
        let label: string = '';
        let score: number = 5;

        if (node.StringLiteral != undefined) {
            label = node.StringLiteral[0].image;
            label = label.substring(1, label.length - 1);
        }

        if (node.Score != undefined)
            score = parseFloat(node.Score[0].image);

        return {
            label: label,
            score: score,
        }
    }
}
