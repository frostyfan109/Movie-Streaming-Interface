import { SET_GENRES } from '../actionTypes.js';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GENRES: {
      const { genres } = action;
      return genres;
    }
    default: {
      return state;
    }
  }
}
