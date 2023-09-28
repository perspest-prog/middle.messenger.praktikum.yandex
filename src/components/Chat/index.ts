import Block, { Props } from "../../core/Block";
import ChatsController from "../../controllers/ChatsController";
import Popup from "../Popup";
import template from "./chat.hbs";
import "./chat.scss";

interface ChatProps extends Props{
    title: string;
    message: string;
    chatId: number;
    popup: Popup;
}

class Chat extends Block<ChatProps> {
    constructor(props: ChatProps){
        super(props);
    }

    protected init(): void {
        this.setProps({
            events: {
                click: ChatsController.selectChat.call(ChatsController, this.props.chatId),
                contextmenu: this.onContextMenu.bind(this)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private onContextMenu(event: MouseEvent) {
        this.children.popup.setProps({
            x: event.x,
            y: event.y
        });
    }
}

export default Chat;
