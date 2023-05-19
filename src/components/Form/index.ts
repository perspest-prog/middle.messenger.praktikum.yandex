import Block, { Props } from "../../utils/Block";
import Button from "../Button";
import Input from "../Input";
import Link from "../Link";
import template from "./form.hbs";
import "./form.scss";

interface FormProps extends Props{
    title: string;
    inputs: Input[];
    button: Button;
    link?: Link;
}

class Form extends Block<FormProps>{
    constructor(props: FormProps) {
        super('div', {...props, className: ["form"]});
    }

    protected init(): void {
        this.children.button.props.events = {
            ...this.children.button.props.events,
            click: (e: Event) => this.onSubmit(e)
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onSubmit(event?: Event): void {
        event?.preventDefault();
        this.children.inputs.forEach((input: Input) => input.checkValid());

        const data = this.children.inputs.reduce((acc: object, input: Input) => {
            return {...acc, [input.getName()]: input.getValue()};
        }, {});

        console.log(data);
    }
}

export default Form;
