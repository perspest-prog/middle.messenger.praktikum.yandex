import AuthPage from "./pages/auth";
import "./index.scss";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('body')!;

    const auth = new AuthPage()

    root.appendChild(auth.getContent()!);
});
