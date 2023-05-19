import Router from "./utils/Router";
import AuthPage from "./pages/Auth";
import RegPage from "./pages/Reg";
import ErrorPage from "./pages/Error";
import SettingsPage from "./pages/Settings";
import ChatPage from "./pages/Chat";
import NavigatePage from "./pages/Navigate";
import "./index.scss";


window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root")!;

    const router = new Router(root);

    router
        .use("/", NavigatePage)
        .use("/signin", AuthPage)
        .use('/signup', RegPage)
        .use("/profile", SettingsPage)
        .use("/chat", ChatPage)
        .use("/error", ErrorPage)
        .start();
});
