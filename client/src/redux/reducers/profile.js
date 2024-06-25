import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
} from '../actions/profile/types'

const initialState = {
    profile: null
}

export default function profile(state=initialState,action){
    const { type, payload } = action;

    switch(type){
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    username: payload.username,
                    rut: payload.rut,
                    email: payload.email,
                    image: payload.image,
                    exp: payload.exp,
                    level: payload.level,
                    date_joined: payload.date_joined,
                  },
            }
        case GET_USER_PROFILE_FAIL:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}