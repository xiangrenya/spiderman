import { createAction, handleActions } from 'redux-actions';
import { fetcherWithLoading } from '../../utils/fetch';
import { SHOW_LIST_SPIN } from '../reduck';
import apis from '../apis';

// actions
export const movieAction = createAction('home/Movies');

export const getMovies = arg => (dispatch) => {
  fetcherWithLoading(dispatch, SHOW_LIST_SPIN)('get', apis.movies.list, arg).then(
    (data) => {
      const { page = 1, perPage = 20, ...filter } = arg;
      dispatch(
        movieAction({
          list: data.movies,
          filter,
          page,
          perPage,
          total: data.total,
        }),
      );
    },
  );
};

// reducer
const defaultState = {
  list: [],
  filter: '',
  page: 1,
  perPage: 20,
  total: 0,
};

const reducer = handleActions(
  {
    [movieAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  defaultState,
);

export default reducer;
