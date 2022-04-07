export namespace Mojang {

    export interface UserProfile {
        id: string;
        name: string;
    }

    export interface Profile extends UserProfile {
        properties: Array<{
            name: string;
            value: string;
            signature: string;
        }>;
    }

    export interface History {
        name: string;
        changedToAt?: number;
    }

}