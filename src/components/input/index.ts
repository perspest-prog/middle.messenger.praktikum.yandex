import Block, { Props } from "../../utils/Block";
import template from "./input.hbs";
import "./input.scss";

interface InputProps extends Props {
    type: string;
    name: string;
    placeholder: string;
    visible: boolean;
}

class Input extends Block<InputProps>{
    constructor(props: InputProps) {
        super("div", {
            ...props, 
            className: ["inputBox"],
            events: {
                click: (event: MouseEvent) => {
                    if (event.target === document.querySelector('.visible')) {
                        const password = event.target?.parentElement.querySelector('input');
                        if(password.type === 'password') password.setAttribute('type', 'text');
                        else password.setAttribute('type', 'password');
                    }
                }
            }
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
