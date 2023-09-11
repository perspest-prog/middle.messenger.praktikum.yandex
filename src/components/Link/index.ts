import Block, { Props } from "../../core/Block";
import Router from "../../core/Router";
import template from "./link.hbs";

interface LinkProps extends Props {
    href: string;
    label: string;
}

class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: this.clickNandler.bind(this)
            }
        });
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
