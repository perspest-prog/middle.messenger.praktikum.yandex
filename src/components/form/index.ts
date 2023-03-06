import Block from "../../utils/Block";
import Button from "../Button";
import Input from "../Input";
import template from "./form.hbs";
import "./form.scss";

interface FormProps{
    title: string;
    input: Input;
    button: Button;
}

class Form extends Block{
    constructor(props: FormProps) {
        super('div', props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Form;
