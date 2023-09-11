import Block, { Props } from "../../core/Block";
import template from "./message.hbs";
import "./message.scss";

interface MessageProps extends Props{
    type: "tail-in" | "tail-out";
    content: string;
}

class Message extends Block<MessageProps>{
    constructor(props: MessageProps){
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Message;
