import Block, { Props } from "../../utils/Block";
import template from "./anotherInput.hbs";
import "./anotherInput.scss";

interface InputProps extends Props{
    label: string;
    type: string;
    placeholder?: string;
}

class Input extends Block<InputProps>{
    constructor(props: InputProps){
        super("div", {...props, className: ["inputBox_big"]});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
