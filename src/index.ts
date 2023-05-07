import { common, Injector, Logger, settings } from "replugged";

const { messages } = common;
const inject = new Injector();
export const logger = Logger.plugin("MMM");
export const macroPrefix = "^";

export type Macros = Array<{ macro: string; expansion: string; id: string }>;

interface Settings {
    macros?: Macros;
    prefix?: string;
}

const defaultSettings = {
    macros: [],
    prefix: macroPrefix,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
    "dev.delta.MMM",
    defaultSettings,
);

export async function start(): Promise<void> {
    inject.before(messages, "sendMessage", (props) => {
        let { content } = props[1];
        let prefix = cfg.get("prefix") || macroPrefix;
        cfg.get("macros").forEach(({ macro, expansion }) => {
            let regex = RegExp(`(?<!\\\\)\\${prefix}${macro}`, "g");
            content = content.replaceAll(regex, expansion);
        });
        props[1].content = content;
        return props;
    });
}

export function stop(): void {
    inject.uninjectAll();
}

export { Settings } from "./Settings";
