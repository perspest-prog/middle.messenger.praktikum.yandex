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
        this.children.button2.element.toggleAttribute("disabled");
        this.children.button1.props.events = {
            ...this.children.button1.props.events,
            click: () => this.onClick()
        };
        this.children.button2.props.events = {
            ...this.children.button1.props.events,
            click: (e: Event) => this.onSubmit(e)
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onClick(): void {
        this.children.button1.setProps({
            label: this.children.button1.props.label === "Изменить" ? "Отменить" : "Изменить"
        });
        this.children.button2.element.toggleAttribute("disabled");
        this.children.inputs.forEach((input: Input) => input.element!.children[1].toggleAttribute("disabled"));
        this.children.inputs.forEach((input: Input) => input.element!.children[2].innerText = "");
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
