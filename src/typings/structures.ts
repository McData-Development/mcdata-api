export namespace Player {

    export interface History {
        username: string;
        changedAt?: number;
    }

    export interface Profile extends Details {
        history: Array<History>;
        skin: Skin;
    }

    export interface Details {
        id: string;
        username: string;
    }

    export interface Skin {
        skin_type: string;
        properties: Array<{
            type: string;
            value: string;
        }>;
    }

}