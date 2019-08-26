import { combineReducers } from 'redux';
import indexServers from './indexServers.js';
import movieResults from './movieResults.js';
import settings from './settings.js';
import genres from './genres.js';

export default combineReducers({
  indexServers,
  movieResults,
  settings,
  genres
});
