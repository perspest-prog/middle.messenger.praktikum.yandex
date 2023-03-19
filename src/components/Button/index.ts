import Block, { Props } from "../../utils/Block";
import template  from "./button.hbs";
import "./button.scss";

interface ButtonProps extends Props{
    label: string;
    type?: string;
}

class Button extends Block<ButtonProps>{
    constructor(props: ButtonProps) {
        super('button', {...props, className: ["button"]});
    }

    protected init(): void {
        if(this.props.type)
            this.element!.type = this.props.type;
        else
            this.element!.type = "submit";
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Button;
