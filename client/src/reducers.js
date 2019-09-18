import { combineReducers } from 'redux'
import {
    CHANGE_NAME, CHANGE_TAG, INITIALIZE_FORM
} from './actions'

const initialState = {
    form: {
        osName: '',
        osTag: 'latest',
    },
}

const formReducer = (state = initialState.form, action) => {
    switch (action.type) {
        case INITIALIZE_FORM:
            return initialState.form
        case CHANGE_NAME:
            return {
                ...state,
                osName: action.osName,
            }
        case CHANGE_TAG:
            return {
                ...state,
                osTag: action.osTag,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    form: formReducer,
})

export default rootReducer