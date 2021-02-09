
const JSON_CONTENT_TYPE = 'application/json;charset=utf-8'

const HEADER_NAMES = {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization'
}

const api = {
    get: (url, options) => {
        return fetch(url)
    },
    post: (url, options) => {
        const contentType = options.contentType || JSON_CONTENT_TYPE
        return fetch(url, {
            method: 'POST',
            body: options.body,
            headers: {
                [HEADER_NAMES.CONTENT_TYPE]: contentType,
                [HEADER_NAMES.AUTHORIZATION]: localStorage.getItem('token')
            }
        })
    },
    put: (url, options) => {
        const contentType = options.contentType || JSON_CONTENT_TYPE
        return fetch(url, {
            method: 'PUT',
            body: options.body,
            headers: {
                [HEADER_NAMES.CONTENT_TYPE]: contentType,
                [HEADER_NAMES.AUTHORIZATION]: localStorage.getItem('token')
            }
        })
    },
    delete: (url, options) => {
        const contentType = options.contentType || JSON_CONTENT_TYPE
        return fetch(url, {
            method: 'DELETE',
            body: options.body,
            headers: {
                [HEADER_NAMES.CONTENT_TYPE]: contentType,
                [HEADER_NAMES.AUTHORIZATION]: localStorage.getItem('token')
            }
        })
    }
}


export {api}