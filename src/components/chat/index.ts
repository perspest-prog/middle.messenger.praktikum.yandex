import Block, { Props } from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.scss";

interface ChatProps extends Props{
    author: string;
    content: string;
}

class Chat extends Block<ChatProps>{
    constructor(props: ChatProps){
        super("div", {...props, className: ["chat__item"]})
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Chat;
