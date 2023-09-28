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
import Popup from "../../components/Popup";
import Input from "../../components/Input";
import Button from "../../components/Button";


interface ChatPageProps extends Props {
    modal: Modal
    chats: List<Chat>;
    messages: List<Message>;
}

const test = connect(List<Chat>, ({chats}) => ({
    items: chats?.map(({title, id}) => new Chat({
        title: title, message: title, chatId: id,
        popup: new Popup({
            isVisible: true,
            x: 10,
            y: 20,
            items: [{label: "Добавить"}, {label: "Удалить чат"}]
        })
    }))
}));


const addUserForm = new SmallForm({
    title: "Добавить пользователя",
    inputs: [new Input({type: "number", placeholder: "ID пользователя", name: "user", visible: false})],
    button: new Button({label: "Добавить", type: "ahaha"})
});

class ChatPage extends Block<ChatPageProps> {
    constructor() {
        super({
            modal: new Modal({isVisible: true, content: addUserForm}),
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
