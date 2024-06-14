import {
    GET_POST_FAIL,
    GET_POST_SUCCESS,
    GET_AUTHOR_POST_LIST_FAIL,
    GET_AUTHOR_POST_LIST_SUCCESS,
    GET_POST_LIST_FAIL,
    GET_POST_LIST_SUCCESS,
    GET_SEARCH_POST_FAIL,
    GET_SEARCH_POST_SUCCESS,
    GET_POST_LIST_TAG_FAIL,
    GET_POST_LIST_TAG_SUCCESS,
} from '../actions/posts/types'

const initialState = {
    post_list: null,
    post_list_tag: null,
    author_post_list: null,
    filtered_posts: null,
    post: null,
    count: null,
    next: null,
    previous: null
};

export default function posts(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_POST_LIST_TAG_SUCCESS:
            return {
                ...state,
                post_list_tag: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_POST_LIST_TAG_FAIL:
            return {
                ...state,
                post_list_tag: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_AUTHOR_POST_LIST_SUCCESS:
            return {
                ...state,
                author_post_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_AUTHOR_POST_LIST_FAIL:
            return {
                ...state,
                author_post_list: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_POST_LIST_SUCCESS:
            return {
                ...state,
                post_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_POST_LIST_FAIL:
            return {
                ...state,
                post_list: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                post: payload.post
            }
        case GET_POST_FAIL:
            return {
                ...state,
                post: null
            }
        case GET_SEARCH_POST_SUCCESS:
            return {
                ...state,
                filtered_posts: payload.results.filtered_posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_SEARCH_POST_FAIL:
            return {
                ...state,
                filtered_posts: null,
                count: null,
                next: null,
                previous: null,
            }
        default:
            return state
    }
}