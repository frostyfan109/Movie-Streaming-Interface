import { SET_POPULAR_MOVIES, SET_NEW_MOVIES } from '../actionTypes.js';

// export const defaultResults = () => ({
//   results : null,
//   pageNumber : 1,
//   totalPages : 1
// });
export const defaultResults = () => [];

const initialState = {
  popularMovies : defaultResults(),
  newMovies : defaultResults()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POPULAR_MOVIES: {
      const { movies: popularMovies } = action;
      return {
        ...state,
        popularMovies : state.popularMovies.slice().concat([ popularMovies ])
      };
    }
    case SET_NEW_MOVIES: {
      const { movies: newMovies } = action;
      return {
        ...state,
        newMovies : state.newMovies.slice().concat([ newMovies ])
      };
    }
    default: {
      return state;
    }
  }
}
