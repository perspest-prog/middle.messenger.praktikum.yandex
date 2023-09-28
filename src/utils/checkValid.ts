import Block from "../core/Block";

const REGEXP = {
    phone: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
    email: [/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu],
    password: [/^[^]{8,40}$/, /(?=.*?[0-9])(?=.*?[A-Z])/],
    login: [/^(?!\d+$).*$/, /^[^]{3,}$/, /^[^]{0,20}$/],
    first_name: [/^[A-ZА-Я]/, /^[A-ZА-Яa-zа-я-]{0,16}$/],
    second_name: [/^[A-ZА-Я]/, /^[A-ZА-Яa-zа-я-]{0,16}$/]
} as const;

const ERROR_MESSAGES = {
    phone: ["Введите корректный телефон"],
    email: ["Введите корректную почту"],
    password: ["Пароль должен быть длиной от 8 до 40 символов", "В пароле должна быть хотя бы 1 цифра и заглавгая буква"],
    login: ["Логин не должен состять из цифр", "Логин должен быть длиной от 3 символов", "Логин должен быть длиной до 20 символов"],
    first_name: ["Имя должно начинаться с заглавной буквы", "Имя может содержать только латиницу и кирилицу"],
    second_name: ["Фамилия должно начинаться с заглавной буквы", "Фамилия может содержать только латиницу и кирилицу"]
} as const;

interface InputLike extends Block {
    getName(): string;
    getValue(): string;
}

const checkValid = (input: InputLike) => {
    const name = input.getName();
    if (name in REGEXP) {
        return REGEXP[name as keyof typeof REGEXP].every((reg, i) => {
            if (reg.test(input.getValue())) {
                input.setProps({error: ""});
                return true;
            } else {
                input.setProps({error: ERROR_MESSAGES[name as keyof typeof REGEXP][i]});
                return false;
            }
        });
    }
    return true;
};

export default checkValid;
