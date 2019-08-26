import { FETCHED_INDEX_SERVERS, SET_INDEX_SERVERS_LOADED } from '../actionTypes.js';

const initialState = {
  indexServers : [],
  indexServersLoaded : false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHED_INDEX_SERVERS: {
      const { indexServers } = action;
      return {
        ...state,
        indexServers
      };
    }
    case SET_INDEX_SERVERS_LOADED: {
      const { indexServersLoaded } = action;
      return {
        ...state,
        indexServersLoaded
      };
    }
    default: {
      return state;
    }
  }
}
