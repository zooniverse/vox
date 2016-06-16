import { combineReducers } from 'redux';

import * as issue from './issue';
import * as user from './user';
import * as vote from './vote';

const reducers = Object.assign({}, issue, user, vote);
export default combineReducers(reducers);
