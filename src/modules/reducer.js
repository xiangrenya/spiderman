import { combineReducers } from 'redux';
import home from './home/reduck';
import login from './login/reduck';
import movie from './movie/reduck';
import common from './reduck';

const rootReducer = combineReducers({
  common,
  home,
  login,
  movie,
});

export default rootReducer;
