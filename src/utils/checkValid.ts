import Input from "../components/Input";

const REGEXP = {
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    login: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/,
    first_name: /^[a-zA-Zа-яА-Я]{0,16}$/,
    second_name: /^[a-zA-Zа-яА-Я]{0,16}$/
};

const ERROR_MESSAGES = {
    phone: "Введите корректный номер телефона",
    email: "Введите корректную почту",
    password: "Длина пароля должна быть более 6 символов. Пароль должен содержать цифры и специальные символы",
    login: "Логин должен быть от 4 до 16 символов",
    first_name: "Имя может содержать только русские и английские буквы",
    second_name: "Фамилия может содержать только русские и английские буквы"
};

const checkValid = (input: Input) => {
    const name = input.getName();
    if (name in REGEXP) {
        if (REGEXP[name as keyof typeof REGEXP].test(input.getValue() || "")) {
            input.setProps({error: ""});
        } else {
            input.setProps({error: ERROR_MESSAGES[name as keyof typeof REGEXP]});
            return false;
        }
    }
    return true;
};

export default checkValid;
