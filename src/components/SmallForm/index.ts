import Block, { Props } from "../../core/Block";
import Input from "../Input";
import Button from "../Button";
import template from "./template.hbs";
import "./styles.scss";

interface FormProps extends Props {
    title: string;
    inputs: Input[];
    button: Button;
}

/**
 * Это форма
 */
class SmallForm extends Block<FormProps> {
    constructor(props: FormProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                submit: (e: SubmitEvent) => {console.log((e.target)); e.preventDefault()}
            }
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default SmallForm;
