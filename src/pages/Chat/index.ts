import Block, { Props } from "../../utils/Block";
import Chat from "../../components/Chat";
import Message from "../../components/Message";
import template from "./chat.hbs";
import "./chat.scss";

interface ChatPageProps extends Props{
    chats?: Chat[];
    messages?: Message[];
}

class ChatPage extends Block<ChatPageProps>{
    constructor(){
        super("div", {
            className: ["chat__wrapper"],
            chats: [
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
                new Chat({author: "Жендос", content: "Абоба бебра"}),
            ],
            messages: [
                new Message({type: "tail-in", content: "shdeawicei scjs usachusa sdchsd heshsachs"}),
                new Message({type: "tail-out", content: "shdeawicei scjs usachusa sdchsd heshsachs"}),
            ]
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChatPage;
