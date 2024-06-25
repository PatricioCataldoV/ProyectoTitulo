import { combineReducers } from "redux";
import tags from "./tags";
import comments from "./comments";
import posts from "./posts";
import profile from "./profile";


export default combineReducers({
    tags,
    comments,
    posts,
    profile,
})