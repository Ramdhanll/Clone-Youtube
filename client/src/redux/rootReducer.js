import { combineReducers } from 'redux';
import user from './user/UserReducer';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;