import Block, { Props } from "../../utils/Block";
import Chat from "../../components/Chat";
import Message from "../../components/Message";
import template from "./chat.hbs";
import "./chat.scss";

interface ChatPageProps extends Props{
    chats: Chat[];
    messages: Message[];
}

class ChatPage extends Block<ChatPageProps>{
    constructor(props: ChatPageProps){
        super("div", {...props, className: ["chat__wrapper"]});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChatPage;
