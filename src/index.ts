import { Injector, Logger, webpack, settings } from "replugged";

const inject = new Injector();
export const logger = Logger.plugin("MMM");
export const macroPrefix = "^";

interface Settings {
    macros?: { macro: string, expansion: string, id: string }[],
    prefix?: string
}

const defaultSettings = {
    macros: [],
    prefix: macroPrefix
} satisfies Partial<Settings>

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>("dev.delta.MMM", defaultSettings);

export async function start(): Promise<void> {
    const messageMod = await webpack.waitForProps("sendMessage", "getSendMessageOptionsForReply");

    if (messageMod) {
        inject.before(messageMod, "sendMessage", props => {
            let content: string = props[1].content;
            let prefix = cfg.get("prefix") || macroPrefix 
            cfg.get("macros").forEach(({ macro, expansion }) => {
                content = content.replaceAll(`${prefix}${macro}`, expansion)
            })
            props[1].content = content
            return props
        });
    }
}

export function stop(): void {
    inject.uninjectAll();
}

export { Settings } from "./Settings.tsx"
