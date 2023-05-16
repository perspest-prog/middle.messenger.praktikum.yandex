import Block, { Props } from "../../utils/Block";
import template from "./error.hbs";
import "./error.scss";

interface ErrorProps extends Props{
    code: number;
    description: string;
}

class ErrorPage extends Block<ErrorProps>{
    constructor() {
        super('main', {code: 112, description: "wdawd"});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ErrorPage;
