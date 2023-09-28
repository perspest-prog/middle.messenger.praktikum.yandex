import Block, { Props } from "../../core/Block";
import connect from "../../utils/connect";
import template from "./notice.hbs";
import "./notice.scss";

interface NoticeProps extends Props {
    title: string;
    message: string;
    isActive: boolean;
}

const Notice = connect(class extends Block<NoticeProps> {
    constructor() {
        super({
            title: "Ошибка!",
            message: "Ты дурак!",
            isActive: false
        });
    }

    protected init(): void {
        this.setProps({
            events: {
                click: () => this.setProps({isActive: false})
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}, ({error}) => (
    {
        title: "Ошибка!",
        message: error?.reason || "",
        isActive: true
    }
));

export default Notice;
