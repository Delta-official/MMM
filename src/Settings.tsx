import { components, util } from "replugged";
import { cfg, logger } from "./index.ts";
import "./Settings.css";

const { FormItem, TextArea, TextInput, Category, Text, Button, Divider } = components;

function Macro({ macro, content }) {
    return (
        <div className="macro">
            <div className="macro-inner">
                <Text variant="heading-lg/semibold" className="macro-name">
                    { macro }
                </Text>
                <Button color={Button.Colors.RED} onClick={() => console.log("erased!")}>
                    Delete
                </Button>
            </div>
            <Divider className="divider-inner" />
            <Text.Normal className="macro-expansion" selectable={true}>
                { content }
            </Text.Normal>
        </div>
    )
}

export function Settings() {
    let macro: string, expansion: string;

    return (
        <div className="settings">
            <FormItem note="Macro">
                <TextInput onChange={(content: string) => macro = content} />
            </FormItem>
            <FormItem note="Expansion">
                <TextArea onChange={(content: string) => expansion = content} />
            </FormItem>
            <Button onClick={() => {
                let macros = cfg.get("macros");
                // console.log(macros);
                macros.push({ macro, expansion })
                logger.log(cfg.get("macros"));
            }}>
                Create
            </Button>
            <Divider className="divider-default" />

            <Category title="Macros">
                <Macro macro="bruh" content="https://example.com" />
                <Divider className="divider-inner" />
                <Macro macro="bruh" content="https://example.com" />
                <Divider className="divider-inner" />
                <Macro macro="bruh" content="https://example.com" />
                <Divider className="divider-inner" />
                <Macro macro="bruh" content="https://example.com" />
                <Divider className="divider-inner" />
                <Macro macro="smug" content={"⣿⣿⣿⣿⣿⡿⠿⠻⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠻⠻⠟⠻⢿⣿⣿⣿⣿\n⣿⣿⡟⠁⢀⣠⣤⣤⣤⣤⣄⣀⣀⣀⣹⣿⣿⣷⣄⣀⣀⣀⣀⣤⣤⣤⣤⣀⠐⢽⣿⣿⣿\n⣿⣿⣿⣶⣿⡿⣛⡒⠒⠒⢒⠒⣲⠙⣿⣿⣿⣿⠟⣵⡒⢒⠒⠒⡀⣘⡻⣿⣿⣾⣿⣿⣿\n⣿⣿⣿⣿⣏⣞⡛⠃⠀⠀⠸⠷⢿⣧⣿⣿⣿⣿⣧⣿⣷⣛⣀⣀⣁⣛⣛⣮⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢏⣾⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢻⣿⠏⣼⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠟⢛⣉⣴⣿⡏⣸⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣧⣠⣤⣤⣤⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⣿⣿⠃⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿"} />
            </Category>
        </div>
    );
}
