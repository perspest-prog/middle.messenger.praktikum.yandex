import Block, { Props } from "../../utils/Block";
import template from "./message.hbs";
import "./message.scss";

interface MessageProps extends Props{
    type: "tail-in" | "tail-out";
    content: string;
}

class Message extends Block<MessageProps>{
    constructor(props: MessageProps){
        super("div", {...props, className: ["message__item"]});
    }

    protected init(): void {
        this.element?.setAttribute('data-author', this.props.type);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Message;
