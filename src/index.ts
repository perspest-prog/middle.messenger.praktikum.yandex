import Button from "./components/Button";
import Form from "./components/Form";
import Input from "./components/Input";
import "./index.scss";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root')!;

    const input = new Input({
        _name: "login",
        _type: "text",
        placeholder: "Write me!",
        visible: false,
        className: ["inputBox"]
    })

    const button = new Button({
        label: "Click me!",
        className: ["button"]
    })

    const form = new Form({
        title: "Form me!",
        input: input,
        button: button,
        className: ["form"]
    })

    root.append(form.getContent()!);
})
