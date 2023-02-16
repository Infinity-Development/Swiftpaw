/**
 * WEBSOCKET CREDENTIALS MANAGER
 * =============================
 * © 2023 Infinity Development
 * =============================
 */

/**
 * @default NONE Waiting for an entry
 * @default LOW Low level user (minimal data provided)
 * @default FULL Fully connected user (login and token passed)
 */
enum EntryLevels {
    NONE = 0,
    LOW = 1,
    FULL = 2
}

/**
 * @default #type The users entry level
 * @default #auth If the Authorization was Successful or Failed
 * @default #user_id The users id (if authorized)
 * @default #guild_id The guild the connection is receiving events from
 * @default #guild_auth Hash token for the currently connected guild
 */
export default class CredentialsManager {
    #type = EntryLevels.NONE;
    #auth = false;
    #user_id: null | string = null;
    #bot_id: null | string = null;
    #guild_id:  null | string = null;
    #guild_auth: null | string = null;
    fn: Function | null = null;

    get userID() {
        return this.#user_id;
    }

    set userID(id) {
        this.#user_id = id;
    }

    get botID() {
        return this.#bot_id;
    }

    set botID(id) {
        this.#bot_id = id;
    }

    get guildID() {
        return this.#guild_id;
    }

    get guildAuth() {
        return this.#guild_auth;
    }

    getGuildInfo() {
        return {
            id: this.#guild_id,
            auth: this.#guild_auth
        };
    }

    setGuildInfo(id: string | null, auth: string | null) {
        this.#guild_id = id;
        this.#guild_auth = auth;

        return {
            id: this.#guild_id,
            auth: this.#guild_auth
        };
    }

    get auth() {
        return this.#auth
    }

    set auth(stat: boolean) {
        if (typeof stat !== 'boolean') return;

        this.#auth = stat;
    }

    get type() {
        return this.#type
    }

    set type(type: EntryLevels) {
        this.#type = type;
    }
}