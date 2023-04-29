import Block, { Props } from "../../utils/Block";
import template from "./auth.hbs";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./auth.scss";

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
                    new Input({type: "text", name: "login", placeholder: "Логин", visible: false}),
                    new Input({type: "password", name: "password", placeholder: "Пароль", visible: true})
                ],
                link: {
                    href: "/signup",
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
