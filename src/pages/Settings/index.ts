import Block, { Props } from "../../utils/Block";
import HashRouter from "../../utils/HashRouter";
import SettingsBlock from "../../components/SettingsBlock";
import SettingsItem from "../../components/SettingsItem";
import template from "./settings.hbs";
import "./settings.scss";

interface SettingsPageProps extends Props{
    blocks: SettingsBlock[];
}

class SettingsPage extends Block<SettingsPageProps>{
    constructor(){
        super({
            blocks: [
                new SettingsBlock({
                    title: "Общие", 
                    items: [
                        new SettingsItem({label: "Профиль", href: "#"})
                    ], 
                    separator: true
                }),
                new SettingsBlock({
                    title: "Изменить",
                    items: [
                        new SettingsItem({ label: "Данные", href: "#data"}),
                        new SettingsItem({ label: "Аватар", href: "#avatar"}),
                        new SettingsItem({ label: "Пароль", href: "#password" })
                    ],
                    separator: false
                })
            ]
        });
    }

    componentDidMount(): void {
        new HashRouter("page_root")
            .start();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default SettingsPage;
