import {
    GET_TAGS_SUCCESS,
    GET_TAGS_FAIL,
} from './types';
import api from '../../api';


export const get_tags = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await api.get('/api/tag_list', config)

        if(res.status === 200){
            dispatch({
                type: GET_TAGS_SUCCESS,
                payload: res.data
            });
        }else {
            dispatch({
                type: GET_TAGS_FAIL
            });
        }

    } catch(err){
        dispatch({
            type: GET_TAGS_FAIL
        })
    }
}