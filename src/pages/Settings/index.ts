import Block, { Props } from "../../utils/Block";
import Form from "../../components/AnotherForm";
import template from "./settings.hbs";
import "./settings.scss";
import Button from "../../components/Button";
import Input from "../../components/AnotherInput";

interface SettingsPageProps extends Props{
    form: Form
}

class SettingsPage extends Block<SettingsPageProps>{
    constructor(){
        super("div", {
            className: ["settings__wrapper"],
            form: new Form({
                inputs: [
                    new Input({type: "tel", name: "phone", label: "Номер телефона"}),
                    new Input({type: "text", name: "email", label: "Почта"}),
                    new Input({type: "text", name: "login", label: "Логин"}),
                    new Input({type: "text", name: "first_name", label: "Имя"}),
                    new Input({type: "text", name: "second_name", label: "Фамилия"}),
                    new Input({type: "password", name: "password", label: "Пароль"})
                ],
                button1: new Button({label: "Изменить", type: "button"}),
                button2: new Button({label: "Готово"})
            })
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default SettingsPage;
