import Block, { Props } from "../../core/Block";
import ChatsController from "../../controllers/ChatsController";
import connect from "../../utils/connect";
import List from "../../components/List";
import Modal from "../../components/Modal";
import Chat from "../../components/Chat";
import Message from "../../components/Message";
import template from "./chat.hbs";
import "./chat.scss";
import SmallForm from "../../components/SmallForm";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface ChatPageProps extends Props {
    modal: Modal
    chats: List<Chat>;
    messages: List<Message>;
}

const test = connect(List<Chat>, ({chats}) => ({
    items: chats?.map(({title}) => new Chat({title: title, message: title}))
}));

class ChatPage extends Block<ChatPageProps>{
    constructor() {
        super({
            modal: new Modal({isVisible: true, content: new SmallForm({title: "wad"})}),
            chats: new test,
            messages: new List({items: [new Message({content: "wdwdawdawd", type: "tail-in"})]})
        });
    }

    componentDidMount(): void {
        ChatsController.fetchChats();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChatPage;
