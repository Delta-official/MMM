import { components, util, common } from "replugged";
import { cfg, macroPrefix, Macros } from "./index";
import "./Settings.css";

const { FormItem, TextArea, TextInput, Category, Text, Button, Divider, FormNotice } = components;
const { React, lodash } = common;

// from https://stackoverflow.com/a/55387306
const interleave = (arr: any[], x: any) => arr.flatMap((e) => [e, x]).slice(0, -1);

function swap(arr: any[], a: any, b: any) {
    let tmp = arr.slice();
    tmp[a] = tmp.splice(b, 1, tmp[a])[0];
    return tmp;
}

function Macro({
    macro,
    expansion,
    id,
    macros,
    setMacros,
}: {
    macro: string;
    expansion: string;
    id: string;
    macros: Macros;
    setMacros: (macros: Macros) => void;
}) {
    let idx = lodash.findIndex(macros, ["id", id]);

    function handleClick() {
        setMacros(lodash.reject(macros, ["id", id]));
    }

    function handleDownSwap() {
        setMacros(swap(macros, idx, idx + 1));
    }

    function handleUpSwap() {
        setMacros(swap(macros, idx, idx - 1));
    }

    return (
        <div className="macro">
            <div className="macro-inner">
                <Text variant="heading-lg/semibold" className="macro-name" selectable={true}>
                    {macro}
                </Text>
                {idx !== macros.length - 1 && (
                    <Button className="down-button" onClick={handleDownSwap}>
                        Down
                    </Button>
                )}
                {idx !== 0 && (
                    <Button className="up-button" onClick={handleUpSwap}>
                        Up
                    </Button>
                )}
                <Button color={Button.Colors.RED} onClick={handleClick}>
                    Delete
                </Button>
            </div>
            <Divider className="divider-inner" />
            <Text.Normal className="macro-expansion" selectable={true}>
                {expansion}
            </Text.Normal>
        </div>
    );
}

function CreateMacro({
    macros,
    setMacros,
}: {
    macros: Macros;
    setMacros: (macros: Macros) => void;
}) {
    const [macro, setMacro] = React.useState("");
    const [expansion, setExpansion] = React.useState("");

    function handleClick() {
        if (macro.length < 1 || expansion.length < 1) {
            return;
        }
        setMacros([...macros, { macro, expansion, id: lodash.uniqueId() }]);
        setMacro("");
        setExpansion("");
    }

    return (
        <>
            <FormItem style={{ marginBottom: 10 }} title="Macro">
                <TextInput value={macro} onChange={(content: string) => setMacro(content)} />
            </FormItem>
            <FormItem title="Expansion">
                <TextArea value={expansion} onChange={(content: string) => setExpansion(content)} />
            </FormItem>
            <div>
                {macro.length < 1 ? (
                    <FormNotice
                        body="Macro must be at least one character long"
                        className="form-notice"
                    />
                ) : null}
                {expansion.length < 1 ? (
                    <FormNotice
                        body="Expansion must be at least one character long"
                        className="form-notice"
                    />
                ) : null}
            </div>
            <Button onClick={handleClick}>Create</Button>
        </>
    );
}

export function Settings() {
    let { value: macros, onChange: setMacros } = util.useSetting(cfg, "macros");

    return (
        <div className="settings">
            <FormItem title="Macro prefix">
                <TextInput {...util.useSetting(cfg, "prefix")} placeholder={macroPrefix} />
            </FormItem>
            <Divider className="divider-default" />
            <CreateMacro macros={macros} setMacros={setMacros} />
            <Divider className="divider-default" />

            <Category title="Macros">
                {interleave(
                    macros.map((e) => <Macro {...e} macros={macros} setMacros={setMacros} />),
                    <Divider className="divider-inner" />,
                )}
            </Category>
        </div>
    );
}
