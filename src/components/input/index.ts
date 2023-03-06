import Block from "../../utils/Block";
import template from "./input.hbs";
import "./input.scss";

interface InputProps {
    _type: string;
    _name: string;
    placeholder: string;
    visible: boolean;
}

class Input extends Block {
    constructor(props: InputProps) {
        super('div', props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
