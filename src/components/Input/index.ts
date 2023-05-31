import Block, { Props } from "../../utils/Block";
import template from "./input.hbs";
import "./input.scss";

interface InputProps extends Props {
    type: string;
    name: string;
    value?: string;
    placeholder: string;
    visible: boolean;
}

class Input extends Block<InputProps>{
    static REGEXP = {
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
        password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        login: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/,
        first_name: /^[a-zA-Zа-яА-Я]{0,16}$/,
        second_name: /^[a-zA-Zа-яА-Я]{0,16}$/
    };


    constructor(props: InputProps) {
        super(props);
    }

    protected init(): void {
        this.props.events = {
            change: this.changeHandler.bind(this),
            click: (e) => this.setVisible(e!),
            focusout: this.checkValid.bind(this)
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private setVisible(event: Event): void {
        if (event.target === this.element.querySelector('.visible')) {
            this.setProps({
                type: this.props.type === "password" ? "text" : "password"
            });
        }
    }

    private changeHandler(e: Event) {
        this.setProps({
            value: (e.target as HTMLInputElement).value
        });
        this.checkValid();
    }

    public getName(): string {
        return this.props.name;
    }

    public getValue(): string | undefined {
        return this.props.value;
    }

    public checkValid(): void {
        if (!this.getValue()) {
            this.setProps({error: "Заполните это поле"});
        } else if (!Input.REGEXP[this.getName()].test(this.getValue())) {
            switch (this.getName()) {
                case "email":
                    this.setProps({error: "Введите корректную почту"});
                    break;
                case "phone":
                    this.setProps({error: "Введите корректный номер телефона"});
                    break;
                case "password":
                    this.setProps({error: "Длина пароля должна быть более 6 символов. Пароль должен содержать цифры и специальные символы"});
                    break;
                case "first_name":
                    this.setProps({error: "Имя может содержать только русские и английские буквы"});
                    break;
                case "second_name":
                    this.setProps({error: "Фамилия может содержать только русские и английские буквы"});
                    break;
                case "login":
                    this.setProps({error: "Логин должен быть от 4 до 16 символов"});
                    break;
            }
        } else {
            this.setProps({error: ''});
        }
    }
}

export default Input;
