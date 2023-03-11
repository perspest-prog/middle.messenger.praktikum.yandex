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

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default Form;
