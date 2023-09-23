import Block, { Props } from "../../core/Block";
import checkValid from "../../utils/checkValid";
import template from "./input.hbs";
import "./input.scss";

interface InputProps extends Props {
    type: string;
    name: string;
    value?: string;
    placeholder: string;
    visible: boolean;
}

class Input extends Block<InputProps>{
    constructor(props: InputProps) {
        super(props);
    }

    protected init(): void {
        this.props.events = {
            change: this.changeHandler.bind(this),
            click: (e) => this.setVisible(e)
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private setVisible(event: Event): void {
        if (event.target === this.element.querySelector('.visible')) {
            this.setProps({
                type: this.props.type === "password" ? "text" : "password"
            });
        }
    }

    private changeHandler(e: Event) {
        this.setProps({
            value: (e.target as HTMLInputElement).value
        });
        checkValid(this);
    }

    public getName() {
        return this.props.name;
    }

    public getValue() {
        return this.props.value || "";
    }
}

export default Input;
