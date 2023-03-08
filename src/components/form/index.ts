import Block, { Props } from "../../utils/Block";
import Button from "../Button";
import Input from "../Input";
import template from "./form.hbs";
import "./form.scss";

interface FormProps extends Props{
    title: string;
    inputs: Input[];
    button: Button;
    link?: {
        href: string,
        text: string;
    }
}

class Form extends Block<FormProps>{
    constructor(props: FormProps) {
        super('div', {...props, className: ["form"]});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Form;
