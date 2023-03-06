import Block from "../../utils/Block";
import template  from "./button.hbs";
import "./button.scss";

interface ButtonProps{
    label: string;
}

class Button extends Block{
    constructor(props: ButtonProps) {
        super('button', props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
