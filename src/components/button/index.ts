import Block from "../../utils/Block";
import compileTemplate from "./button.pug";

interface ButtonProps{
    label: string;
}

class Button extends Block{
    constructor(props: ButtonProps) {
        super('button', props);
    }

    render() {
        return  compileTemplate({label: this.props.label})
    }
}

export default Button;
