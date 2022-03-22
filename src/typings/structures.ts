export namespace Player {

    export interface History {
        username: string;
        changedAt?: Date;
    }

    export interface Profile extends Details {
        history: Array<History>;
    }

    export interface Details {
        id: string;
        username: string;
    }

}