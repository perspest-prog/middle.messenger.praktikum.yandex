import Block, { Props } from "../../utils/Block";
import template from "./navigate.hbs";
import "./navigate.scss";

interface NavigateProps extends Props {}

class NavigatePage extends Block<NavigateProps>{
    constructor() {
        super("nav");
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default NavigatePage;
