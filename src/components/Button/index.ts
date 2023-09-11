import Block, { Props } from "../../core/Block";
import template  from "./button.hbs";
import "./button.scss";

interface ButtonProps extends Props{
    label: string;
    type?: string;
}

class Button extends Block<ButtonProps>{
    constructor(props: ButtonProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            type: this.props.type || "submit"
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
