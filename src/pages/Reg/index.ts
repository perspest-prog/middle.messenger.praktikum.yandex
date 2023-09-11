import controller from "../../controllers/AuthController";
import Block, { Props } from "../../core/Block";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import template from "./reg.hbs";
import "./reg.scss";

interface RegProps extends Props {
    form: Form
}

class RegPage extends Block<RegProps>{
    constructor(){
        super({
            form: new Form({
                action: controller.signup.bind(controller),
                title: "Регистрация",
                button: new Button({label: "Зарегестрироваться"}),
                inputs: [
                    new Input({type: "tel", name: "phone", placeholder: "Номер телефона", visible: false}),
                    new Input({type: "text", name: "email", placeholder: "Почта", visible: false}),
                    new Input({type: "text", name: "login", placeholder: "Логин", visible: false}),
                    new Input({type: "text", name: "first_name", placeholder: "Имя", visible: false}),
                    new Input({type: "text", name: "second_name", placeholder: "Фамилия", visible: false}),
                    new Input({type: "password", name: "password", placeholder: "Пароль", visible: true})
                ]
            })
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
    
}

export default RegPage;
