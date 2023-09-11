import Block, { Props } from "../../core/Block";
import checkValid from "../../utils/checkValid";
import Button from "../Button";
import Input from "../Input";
import Link from "../Link";
import template from "./form.hbs";
import "./form.scss";

interface FormProps extends Props{
    action: (...args: any[]) => void;
    title: string;
    inputs: Input[];
    button: Button;
    link?: Link;
}

class Form extends Block<FormProps>{
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
        
        if (this.children.inputs.every(checkValid)) {

            const data = this.children.inputs.reduce((acc, input) => (
                {...acc, [input.getName()]: input.getValue()}
            ), {});

            this.props.action(data);

        }
    }
}

export default Form;
