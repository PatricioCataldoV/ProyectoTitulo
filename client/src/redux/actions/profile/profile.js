import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
} from "./types"
import api from '../../api';

export const get_profile = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.get('/api/profile', config);

        if (res.status === 200) {
            dispatch({
                type: GET_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_USER_PROFILE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_USER_PROFILE_FAIL
        });
    }
}