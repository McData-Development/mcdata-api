const errors = {
    UNKNOWN_SERVER: {
        status: 404,
        message: 'The given server IP is either offline or does not exist!'
    },
    FAILED_FETCH_SERVER: {
        status: 500,
        message: 'The server has failed while fetching data from the given IP!'
    }
}

export { errors };