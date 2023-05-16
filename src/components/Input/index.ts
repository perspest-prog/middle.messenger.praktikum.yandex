import Block, { Props } from "../../utils/Block";
import template from "./input.hbs";
import "./input.scss";

interface InputProps extends Props {
    type: string;
    name: string;
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
        super("div", {
            ...props, 
            className: ["inputBox"]
        });
    }

    protected init(): void {
        this.props.events = {
            click: (e) => this.setVisible(e!),
            focusout: this.checkValid.bind(this)
        };
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private setVisible(event: Event): void {
        if (event.target === this.element!.querySelector('.visible')) {
            const password = this.element!.children[0] as HTMLInputElement;
            if(password.type === 'password') password.setAttribute('type', 'text');
            else password.setAttribute('type', 'password');
        }
    }

    public getName(): "email" | "phone" | "password" | "first_name" | "second_name" | "login" {
        return (this.element!.childNodes[0]).name;
    }

    public getValue(): string {
        return (this.element!.childNodes[0] as HTMLInputElement).value;
    }

    public checkValid(): void {
        const err: HTMLDivElement = this.element!.querySelector('.error')!;

        if (!this.getValue()) {
            err.innerText = "Заполните это поле";
        } else if (!Input.REGEXP[this.getName()].test(this.getValue())) {
            switch (this.getName()) {
                case "email":
                    err.innerText = "Введите корректную почту";
                    break;
                case "phone":
                    err.innerText = "Введите корректный номер телефона";
                    break;
                case "password":
                    err.innerText = "Длина пароля должна быть более 6 символов. Пароль должен содержать цифры и специальные символы";
                    break;
                case "first_name":
                    err.innerText = "Имя может содержать только русские и английские буквы";
                    break;
                case "second_name":
                    err.innerText = "Фамилия может содержать только русские и английские буквы";
                    break;
                case "login":
                    err.innerText = "Логин должен быть от 4 до 16 символов";
                    break;
            }
        } else {
            err.innerText = '';
        }
    }
}

export default Input;
