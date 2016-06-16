import { combineReducers } from 'redux';

import * as issue from './issue';
import * as login from './login';
import * as vote from './vote';

const reducers = Object.assign({}, issue, login, vote);
export default combineReducers(reducers);
