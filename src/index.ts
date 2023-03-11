import AuthPage from "./pages/Auth";
import RegPage from "./pages/Reg";
import ErrorPage from "./pages/Error";
import SettingsPage from "./pages/Settings";
import ChatPage from "./pages/Chat";
import Chat from "./components/Chat";
import Message from "./components/Message";
import "./index.scss";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('body')!;

    // const auth = new ChatPage({
    //     chats: [
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //         new Chat({author: "Жендос", content: "Абоба бебра"}),
    //     ],
    //     messages: [
    //         new Message({type: "tail-in", content: "shdeawicei scjs usachusa sdchsd heshsachs"}),
    //         new Message({type: "tail-out", content: "shdeawicei scjs usachusa sdchsd heshsachs"}),
    //     ]
    // });
    const settings = new SettingsPage()

    root.appendChild(settings.getContent()!);
});
