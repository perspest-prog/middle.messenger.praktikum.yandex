import Block, { Props } from "../../utils/Block";
import Button from "../Button";
import Input from "../Input";
import Link from "../Link";
import template from "./form.hbs";
import "./form.scss";

interface FormProps extends Props{
    action: (...args: unknown[]) => void;
    title: string;
    inputs: Input[];
    button: Button;
    link?: Link;
}

class Form extends Block<FormProps>{
    protected children: {
        inputs: Input[]
        button: Button
    };

    constructor(props: FormProps) {
        super(props);
    }

    protected init(): void {
        this.children.button.setProps({
            events: {
                click: this.onSubmit.bind(this)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onSubmit(event: Event): void {
        event.preventDefault();
        this.children.inputs.forEach(input => input.checkValid());

        const data = this.children.inputs.reduce((acc, input) => {
            return {...acc, [input.getName()]: input.getValue()};
        }, {});

        this.props.action(data);
    }
}

export default Form;
