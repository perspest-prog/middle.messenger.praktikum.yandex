import Block, { Props } from "../../core/Block";
import template from "./template.hbs";

interface ClickItemProps extends Props {
    label: string;
    action: (...args: any[]) => void;
}

class ClickItem extends Block<ClickItemProps> {
    constructor(props: ClickItemProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ClickItem;
