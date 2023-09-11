import Block, { Props } from "../../core/Block";
import Link from "../../components/Link";
import template from "./navigate.hbs";
import "./navigate.scss";

interface NavigateProps extends Props {
    links: Link[];
}

class NavigatePage extends Block<NavigateProps>{
    constructor() {
        super({
            links: [
                new Link({href: "/signin", label: "Вход"}),
                new Link({href: "/signup", label: "Регистрация"}),
                new Link({href: "/profile", label: "Профиль и настройки"}),
                new Link({href: "/chat", label: "Чат"}),
                new Link({href: "/error", label: "Ошибка"}),
            ]
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default NavigatePage;
