import Block, { Props } from "../../core/Block";
import template from "./popup.hbs";

interface PopupProps extends Props {
    label: string;
}

class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Popup;
