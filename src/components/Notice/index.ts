import Block, { Props } from "../../core/Block";
import connect from "../../utils/connect";
import template from "./notice.hbs";
import "./notice.scss";

interface NoticeProps extends Props {
    title: string;
    message: string;
}

const Notice = connect(class extends Block<NoticeProps> {
    constructor() {
        super({
            title: "Ошибка!",
            message: "Ты дурак!",
        });
    }

    protected init(): void {
        this.setProps({
            events: {
                click: () => this.element.classList.remove("active")
            }
        });
    }

    protected render(): DocumentFragment {
        this.element.classList.add("active");
        return this.compile(template, this.props);
    }
}, ({error}) => (
    {
        title: "Ошибка!",
        message: error?.reason || ""
    }
));

export default Notice;
