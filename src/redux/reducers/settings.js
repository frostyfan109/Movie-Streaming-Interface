import { SET_INDEX_SERVER, SET_THEME, SET_USE_CACHE } from '../actionTypes.js';
import { Theme } from '../../constants.js';

const initialState = {
  indexServer : null,
  theme: Theme.LIGHT,
  useCache: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX_SERVER: {
      const { indexServer } = action;
      return {
        ...state,
        indexServer
      };
    }
    case SET_THEME: {
      const { theme } = action;
      return {
        ...state,
        theme
      };
    }
    case SET_USE_CACHE: {
      const { useCache } = action;
      return {
        ...state,
        useCache
      };
    }
    default: {
      return state;
    }
  }
}
