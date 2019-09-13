import { combineReducers } from 'redux'
import {
    CHANGE_NAME, CHANGE_TAG, INITIALIZE_FORM
} from './actions'

const initialState = {
    form: {
        osName: '',
        osTag: 'latest',
    },
    imgInfo: {
        isFetching: false,
        selectedOS: '',
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

const imgInfoReducer = (state = initialState.imgInfo, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    form: formReducer,
    imgInfo: imgInfoReducer,
})

export default rootReducer