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
    }


    constructor(props: InputProps) {
        super("div", {
            ...props, 
            className: ["inputBox"]
        })
    }

    protected init(): void {
        this.props.events = {
            click: (e) => this.setVisible(e!)
        }
    }

    componentDidMount(): void {
        this.element!.children[0].addEventListener("blur", this.checkValid.bind(this))
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private setVisible(event: Event): void {
        if (event.target === this.element!.querySelector('.visible')) {
            const password: HTMLInputElement = this.element!.children[0];
            if(password.type === 'password') password.setAttribute('type', 'text');
            else password.setAttribute('type', 'password');
        }
    }

    public getName(): "email" | "phone" | "password" {
        return this.element!.childNodes[0].name;
    }

    public getValue(): string {
        return this.element!.childNodes[0].value;
    }

    public checkValid(): void {
        const err: HTMLDivElement = this.element!.querySelector('.error')!;

        if (!this.getValue()) {
            err.innerText = "Заполните это поле";
        } else if (!Input.REGEXP[this.getName()].test(this.getValue())) {
            if (this.getName() == "email")
                err.innerText = "Введите корректную почту";
            if (this.getName() == "phone")
                err.innerText = "Введите корректный номер телефона";
            if (this.getName() == "password")
                err.innerText = "Длина пароля должна быть более 6 символов. Пароль должен содержать цифры и специальные символы";
        } else {
            err.innerText = '';
        }
    }
}

export default Input;
