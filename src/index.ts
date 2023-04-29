import AuthPage from "./pages/Auth";
import RegPage from "./pages/Reg";
import ErrorPage from "./pages/Error";
import SettingsPage from "./pages/Settings";
import ChatPage from "./pages/Chat";
import NavigatePage from "./pages/Navigate";
import "./index.scss";


type Page = typeof AuthPage | typeof RegPage | typeof SettingsPage | typeof ChatPage | typeof ErrorPage | typeof NavigatePage;


const routes: Record<string, Page> = {
    '/signin': AuthPage,
    '/signup': RegPage,
    '/profile': SettingsPage,
    '/chat': ChatPage,
    '/error': ErrorPage,
    '/': NavigatePage
};

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("The root element is missing");
    }
    const path = window.location.pathname;
    if (!routes[path]) {
        window.location.pathname = "/error";
    }
    let page = new routes[path];
    root.appendChild(page.getContent()!);
    page.dispatchComponentDidMount();

    window.addEventListener("click", (e) => {
        if((e.target as HTMLElement).tagName === 'A') {
            e.preventDefault(); // Отменяем переход по ссылке
            window.history.pushState(null, '', (e.target as HTMLAnchorElement).href);
            root.removeChild(page.getContent()!);
            page = new routes[window.location.pathname];
            root.appendChild(page.getContent()!);
          }
    });

    window.addEventListener("popstate", () => {
        root.removeChild(page.getContent()!);
        page = new routes[window.location.pathname];
        root.appendChild(page.getContent()!);
    });
});
