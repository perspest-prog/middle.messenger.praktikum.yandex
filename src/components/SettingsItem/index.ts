import Block, { Props } from "../../utils/Block";
import HashLink from "../HashLink";
import template from "./settingsItem.hbs";

interface SettingsItemProps extends Props {
    href: string;
    label: string;
}

class SettingsItem extends Block<{link: HashLink} & Props> {
    constructor(props: SettingsItemProps) {
        super({link: new HashLink({href: props.href, label: props.label})});
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default SettingsItem;
