import AuthPage from "./pages/Auth";
import RegPage from "./pages/Reg";
import ErrorPage from "./pages/Error";
import "./index.scss";
import ChatPage from "./pages/Chat";
import Chat from "./components/Chat";
import Message from "./components/Message";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('body')!;

    const auth = new ChatPage({
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

    root.appendChild(auth.getContent()!);
    console.log(auth)
});
