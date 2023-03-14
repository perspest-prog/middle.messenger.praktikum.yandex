import Block, { Props } from "../../utils/Block";
import Input from "../AnotherInput";
import Button from "../Button";
import template from "./anotherForm.hbs";
import "./anotherForm.scss";

interface FormProps extends Props{
    inputs: Input[];
    button1: Button;
    button2: Button;
}

class Form extends Block<FormProps>{
    constructor(props: FormProps) {
        super("form", {...props, className: ["sform"]});
    }

    protected init(): void {
        this.children.button1.props.events = {
            ...this.children.button1.props.events,
            click: () => this.onClick()
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

    private onClick(event?: Event): void {
        this.children.button1.setProps({
            label: this.children.button1.props.label === "Изменить" ? "Отменить" : "Изменить"
        });
        this.children.inputs.forEach((input: Input) => input.element!.children[1].toggleAttribute("disabled"));
        this.children.inputs.forEach((input: Input) => input.element!.children[2].innerText = "");
    }

    private onSubmit(event?: Event): void {
        
    }
}

export default Form;
