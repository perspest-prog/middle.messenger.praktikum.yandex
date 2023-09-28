import Block, { Props } from "../../core/Block";
import ClickItem from "../ClickItem";
import template from "./template.hbs";
import "./styles.scss";

interface PopupProps extends Props {
    isVisible: boolean;
    x: number;
    y: number;
    items: ClickItem[]
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
