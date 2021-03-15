import {COMPANY_DATA} from "../../data/dummy-data"


const initialState = {
    storage: COMPANY_DATA.storage
}

const handlers = {
    DEFAULT: state => state
}

export const storageReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}