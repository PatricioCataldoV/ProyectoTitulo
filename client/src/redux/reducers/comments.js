import {
    GET_COMMENT_LIST_POST_FAIL,
    GET_COMMENT_LIST_POST_SUCCESS,
} from "../actions/comments/types";

const initialState = {
    comment_list_post: null,
    count: null,
    next: null,
    previous: null
};

export default function comments(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_COMMENT_LIST_POST_SUCCESS:
            return {
                ...state,
                comment_list_post: payload.results.comments,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_COMMENT_LIST_POST_FAIL:
            return {
                ...state,
                comment_list_post: null,
                count: null,
                next: null,
                previous: null,
            }
        default:
            return state
    }
}