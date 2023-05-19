import Block, { Props } from "../../utils/Block";
import Link from "../../components/Link";
import template from "./error.hbs";
import "./error.scss";

interface ErrorProps extends Props{
    code: number;
    description: string;
    link: Link
}

class ErrorPage extends Block<ErrorProps>{
    constructor() {
        super('main', {
            code: 112,
            description: "wdawd",
            link: new Link({href: "/", label: "Вернуться на главную страницу"})
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ErrorPage;
