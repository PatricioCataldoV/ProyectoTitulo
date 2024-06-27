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
} from './types';
import api from '../../api';

export const get_author_post_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try{

        const res = await api.get(`/api/profile/author_list`, config)

        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_POST_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_AUTHOR_POST_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_POST_LIST_FAIL
        });
    }
}

export const get_author_post_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try{

        const res = await api.get(`/api/profile/author_list?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_POST_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_AUTHOR_POST_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_POST_LIST_FAIL
        });
    }
}

export const get_post_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`/api/posts`, config)

        if(res.status === 200){
            dispatch({
                type: GET_POST_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_POST_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_POST_LIST_FAIL
        });
    }
}

export const get_post_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`/api/posts?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_POST_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_POST_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_POST_LIST_FAIL
        });
    }
}

export const get_post_list_tag = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`/api/posts/by_tag/?id=${id}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_POST_LIST_TAG_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_POST_LIST_TAG_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_POST_LIST_TAG_FAIL
        });
    }
}

export const get_post_list_tag_page = (id, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`/api/posts/by_tag/?id=${id}&p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_POST_LIST_TAG_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_POST_LIST_TAG_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_POST_LIST_TAG_FAIL
        });
    }
}

export const get_post = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.get(`/api/post/${id}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_POST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_POST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_POST_FAIL
        });
    }
}

export const search_post = (search_term) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.get(`/api/post/search?s=${search_term}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_POST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_POST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_POST_FAIL
        });
    }
};

export const search_post_page = (search_term,page) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.get(`/api/post/search?p=${page}&s=${search_term}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_POST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_POST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_POST_FAIL
        });
    }
};