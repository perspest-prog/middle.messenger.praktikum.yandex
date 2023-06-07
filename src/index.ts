import AuthController from "./controllers/AuthController";
import Router from "./utils/Router";
import AuthPage from "./pages/Auth";
import RegPage from "./pages/Reg";
import ErrorPage from "./pages/Error";
import SettingsPage from "./pages/Settings";
import ChatPage from "./pages/Chat";
import NavigatePage from "./pages/Navigate";
import "./index.scss";


window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use("/", NavigatePage)
        .use("/signin", AuthPage)
        .use('/signup', RegPage)
        .use("/profile", SettingsPage)
        .use("/chat", ChatPage)
        .use("/error", ErrorPage);

    let flag = true;

    if (["/signin", "/signup", "/"].includes(window.location.pathname)) {
        flag = false;
    }
    
    try {
        await AuthController.getUser();

        if (!flag) {
            Router.navigate("/chat");
        }
    } catch {
        if (flag) {
            Router.navigate("/signin");
        }
    } finally {
        Router.start();
    }
});
