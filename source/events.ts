export interface clientEvents {
    AUTH: []

    GUILD_UPDATE: [
        guild_id: string,
        data: {
            id: string;
            tags: [];
            invite: string;
            owner: string;
        }
    ];

    GUILD_MEMBER_COUNT_CHANGE: [
        guild_id: string,
        data: {
            member_count: number;
        }
    ];

    BOT_UPDATE: [
        bot_id: string,
        data: {
            id: string;
            library: string;
            servers: number;
            shards: number;
            tags: [];

        }
    ];

    BOT_USER_COUNT_CHANGE: [
        bot_id: string,
        data: {
            id: string;
            users: number
        }
    ];
}