import { combineReducers } from 'redux';

import * as issue from './issue';
import * as user from './user';
import * as userVotes from './uservotes';

const reducers = Object.assign({}, issue, user, userVotes);
export default combineReducers(reducers);
