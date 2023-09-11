import Block, { Props } from "../../core/Block";
import template from "./modal.hbs";
import "./modal.scss";

interface ModalProps extends Props {
    isVisible: boolean;
    content: Block;
}

class Modal extends Block<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: ({target}: MouseEvent) => ((target as HTMLElement).tagName === "svg" || (target as HTMLElement).tagName === "rect") && this.setProps({isVisible: false})
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Modal;
