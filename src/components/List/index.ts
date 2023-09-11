import Block, { Props } from "../../core/Block";
import template from "./list.hbs";

interface ListProps<T extends Block> extends Props {
    items: T[]
}

class List<T extends Block> extends Block<ListProps<T>> {
    constructor(props: ListProps<T>) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default List;
