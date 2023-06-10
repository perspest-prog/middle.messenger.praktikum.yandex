import Block, { Props } from "../../utils/Block";
import { connect } from "../../utils/Store";
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
                click: (e) => console.log(e.target)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}, () => {})

export default Notice;
