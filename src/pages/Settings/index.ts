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
                    new Input({label: "Имя:", type: "text"}),
                    new Input({label: "Имя:", type: "text"}),
                    new Input({label: "Имя:", type: "text"})
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
