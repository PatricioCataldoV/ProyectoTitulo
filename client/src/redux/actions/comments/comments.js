import {
    GET_COMMENT_LIST_POST_FAIL,
    GET_COMMENT_LIST_POST_SUCCESS,
} from "./types";
import api from "../../api";

export const get_comment_list_post = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`api/post/${id}/comments`, config)

        if(res.status === 200){
            dispatch({
                type: GET_COMMENT_LIST_POST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_COMMENT_LIST_POST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_COMMENT_LIST_POST_FAIL
        });
    }
}
export const get_comment_list_post_page = (id, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get(`post/?id=${id}/comments/&p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_COMMENT_LIST_POST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_COMMENT_LIST_POST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_COMMENT_LIST_POST_FAIL
        });
    }
}
