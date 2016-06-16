import { combineReducers } from 'redux';

import * as issue from './issue';
import * as user from './user';
import * as vote from './vote';
import * as userVotes from './uservotes';

const reducers = Object.assign({}, issue, user, vote, userVotes);
export default combineReducers(reducers);
