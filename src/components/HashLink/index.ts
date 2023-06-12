import Block, { Props } from "../../utils/Block";
import template from "./hashLink.hbs";

interface HashLinkProps extends Props {
    href: string;
    label: string;
} 

class HashLink extends Block<HashLinkProps> {
    constructor(props: HashLinkProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: this.clickHandler.bind(this)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private clickHandler(e: MouseEvent) {
        e.preventDefault();
        window.location.hash = this.props.href;
    }
}

export default HashLink;
