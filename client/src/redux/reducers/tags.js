import {
    GET_TAGS_SUCCESS,
    GET_TAGS_FAIL,
} from '../actions/tags/types'

const initialState = {
    tags: null
}

export default function tags(state=initialState,action){
    const { type, payload } = action;

    switch(type){
        case GET_TAGS_SUCCESS:
            return {
                ...state,
                tags: payload.tags
            }
        case GET_TAGS_FAIL:
            return {
                ...state,
                tags: null
            }
        default:
            return state
    }
}