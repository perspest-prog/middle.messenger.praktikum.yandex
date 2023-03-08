import Block, { Props } from "../../utils/Block";
import Form from "../../components/Form";
import template from "./auth.hbs";
import "./auth.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface AuthProps extends Props{
    form: Form;
}

class AuthPage extends Block<AuthProps>{
    constructor() {
        super('main', {
            form: new Form({
                title: "Вход",
                button: new Button({
                    label: "Войти"
                }),
                inputs: [
                    new Input({_type: "text", _name: "login", placeholder: "Логин", visible: false}),
                    new Input({_type: "password", _name: "password", placeholder: "Пароль", visible: true})
                ],
                link: {
                    href: "#",
                    text: "Нет аккаунта?"
                }
            })
        });
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default AuthPage;
