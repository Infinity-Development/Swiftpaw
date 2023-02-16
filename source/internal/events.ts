/**
 * WEBSOCKET EVENT/LISTENER MANAGER
 * =============================
 * © 2023 Infinity Development
 * =============================
 */

import { EventEmitter } from "events";
import { DiscordWebsocket } from "../discord/connections";
import { clientEvents } from "../events";

type EventLayout = { data: any; event: keyof clientEvents };

export default class EventsManager extends EventEmitter {
    discord!: DiscordWebsocket;

    constructor(discord: DiscordWebsocket) {
        super();

        Object.defineProperty(this, 'discord', { value: discord });
    }

    #events: { EventName: string; fn: Function } [] = [];

    register<K extends keyof clientEvents>(event: K, fn: (...args0: clientEvents[K]) => EventLayout | {}) {
        if (this.#events.find(e => e.EventName === event)) return;

        const funct = (...args0: any[]) => {
            const data = fn(...(args0 as any));

            this.emit(args0[0] as string, data);
        };

        this.#events.push({
            EventName: event,
            fn: funct
        });

        this.discord.on(event, funct);
    }

    incrementMaxListeners() {
        const MaximumListeners = this.getMaxListeners();

        if (MaximumListeners !== 0) {
            this.setMaxListeners(MaximumListeners + 1);
        }
    }

    decrementMaxListeners() {
        const MaximumListeners = this.getMaxListeners();

        if (MaximumListeners !== 0) {
            this.setMaxListeners(MaximumListeners - 1);
        }
    }

    remListener() {
        for (const event of this.#events) {
            this.removeListener(event.EventName, event.fn as (...args: any[]) => void);
        }
    }

    clearListeners() {
        for (const event of this.#events) {
            this.removeAllListeners();
        }
    }
}

