import Block, { Props } from "../../core/Block";
import template from "./chat.hbs";
import "./chat.scss";
import Popup from "../Popup";

interface ChatProps extends Props{
    title: string;
    message: string;
    chatId: number;
    popup: Popup;
}

class Chat extends Block<ChatProps>{
    constructor(props: ChatProps){
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: this.onContext.bind(this)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onContext(e: MouseEvent) {
        this.children.popup.setProps({label: "123"});
    }
}

export default Chat;
