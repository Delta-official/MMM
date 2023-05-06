import { Injector, Logger, webpack, settings } from "replugged";

const inject = new Injector();
export const logger = Logger.plugin("MMM");

interface Settings {
    macros?: { macro: string, expansion: string }[]
}

const defaultSettings: Partial<Settings> = {
    macros: []
}

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>("dev.delta.MMM", defaultSettings);

export async function start(): Promise<void> {
    const messageMod = await webpack.waitForProps("sendMessage", "getSendMessageOptionsForReply");

    if (messageMod) {
        inject.before(messageMod, "sendMessage", (props: [string, { content: string }]) => {
            logger.log(props[1].content);
        });
    }

    logger.log(cfg.all())
    logger.log(cfg.get("macros"))

    // let macros = cfg.get("macros")
    // logger.log(macros)

    // cfg.set("macros", [])

    // let macros = cfg.get("macros");
    // logger.log(macros);
    // cfg.delete("macros")
}

export function stop(): void {
    inject.uninjectAll();
}

export { Settings } from "./Settings.tsx"
