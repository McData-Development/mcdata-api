const errors: {[k: string]: ErrorItem} = {
    PLAYER_UNKNOWN: {
        status: 404,
        message: 'Could not find user with given criterea.'
    },
    PLAYER_FETCH_FAILED: {
        status: 500,
        message: 'Request failed while fetching player.'
    },
    SERVER_UNKNOWN: {
        status: 404,
        message: 'Could not find server with given address.'
    },
    SERVER_FETCH_FAILED: {
        status: 500,
        message: 'Request failed while fetching server.'
    },
    UNKNOWN_ERROR: {
        status: 500,
        message: 'An unknown error has been occurred.'
    }
}

export interface ErrorItem {
    status: number;
    message: string;
}

export default errors;
