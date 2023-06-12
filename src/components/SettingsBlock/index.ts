import Block, { Props } from "../../utils/Block";
import SettingsItem from "../SettingsItem";
import template from "./settingsBlock.hbs";

interface SettingsBlockProps extends Props {
    title: string;
    items: SettingsItem[];
    separator: boolean;
}

class SettingsBlock extends Block<SettingsBlockProps> {
    constructor(props: SettingsBlockProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default SettingsBlock;
