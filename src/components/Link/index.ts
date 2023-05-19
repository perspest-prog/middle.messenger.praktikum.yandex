import Block, { Props } from "../../utils/Block";
import Router from "../../utils/Router";
import template from "./link.hbs";

interface LinkProps extends Props {
    href: string;
    label: string;
}

class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super("span", props);
    }

    protected init(): void {
        this.props.events = {
            ...this.props.events,
            click: this.clickNandler.bind(this)
        };
    }

    private clickNandler(e: MouseEvent) {
        e.preventDefault();
        Router.navigate(this.props.href);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Link;
