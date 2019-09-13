export const INITIALIZE_FORM = 'INITIALIZE_FORM'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_TAG = 'CHANGE_TAG'

export const initializeForm = () => ({
    type: INITIALIZE_FORM,
})

export const changeName = osName => ({
    type: CHANGE_NAME,
    osName,
})

export const changeTag = osTag => ({
    type: CHANGE_TAG,
    osTag,
})