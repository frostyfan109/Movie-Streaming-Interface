import {
  SET_INDEX_SERVER, SET_THEME, SET_USE_CACHE, HANDLE_ERROR,
  FETCHED_INDEX_SERVERS, SET_INDEX_SERVERS_LOADED,
  SET_POPULAR_MOVIES, SET_NEW_MOVIES, SET_GENRES
} from './actionTypes.js';
import * as API from '../api';

export const setIndexServer = (indexServer) => {
  return (dispatch, getState) => {
    dispatch({
      type : SET_INDEX_SERVER,
      indexServer
    });
    dispatch(updateMovieResults());
    dispatch(setGenres());
  }
};

window.setIndexServer = setIndexServer;

export const setTheme = (theme) => ({
  type : SET_THEME,
  theme
});

export const setUseCache = (useCache) => ({
  type : SET_USE_CACHE,
  useCache
});

export const handleError = (error) => ({
  type : HANDLE_ERROR,
  error
});

export const fetchedIndexServers = (indexServers) => ({
  type : FETCHED_INDEX_SERVERS,
  indexServers
});

export const setIndexServersLoaded = (indexServersLoaded) => ({
  type : SET_INDEX_SERVERS_LOADED,
  indexServersLoaded
})

export const retryFetchIndexServers = () => {
  return (dispatch) => {
    dispatch(setIndexServersLoaded(false));
    dispatch(fetchIndexServers());
  }
}

export const fetchIndexServers = () => {
  return async (dispatch) => {
    try {
      const indexServers = await API.getIndexServers();
      dispatch(fetchedIndexServers(indexServers));
      dispatch(setIndexServer(indexServers[0]));
    }
    catch (e) {
      dispatch(fetchedIndexServers([]));
      dispatch(handleError(e));
    }
    dispatch(setIndexServersLoaded(true));
  }
}

const setMovieResults = (type, movies) => ({
  type,
  movies
});

export const setPopularMovies = (page) => {
  return async (dispatch, getState) => {
    // Null indicates movies aren't loaded
    // dispatch(setMovieResults(SET_POPULAR_MOVIES, defaultMovieResults()));
    if (getState().movieResults.popularMovies.filter((pageResults) => pageResults.page === page).length === 0) {
      const movies = await new API.IndexServer(getState().settings.indexServer).getMovies("popular", page);
      dispatch(setMovieResults(SET_POPULAR_MOVIES, movies));
    }
  }
}

export const setNewMovies = (page) => {
  return async (dispatch, getState) => {
    // Null indicates movies aren't loaded
    // dispatch(setMovieResults(SET_NEW_MOVIES, defaultMovieResults()));
    if (getState().movieResults.newMovies.filter((pageResults) => pageResults.page === page).length === 0) {
      const movies = await new API.IndexServer(getState().settings.indexServer).getMovies("new", page);
      dispatch(setMovieResults(SET_NEW_MOVIES, movies));
    }
  }
}

const updateMovieResults = () => {
  return (dispatch) => {
    dispatch(setPopularMovies(1));
    dispatch(setNewMovies(1));
  }
}

export const setGenres = () => {
  return async (dispatch, getState) => {
    const genres = await new API.IndexServer(getState().settings.indexServer).getGenres();
    dispatch({
      type : SET_GENRES,
      genres
    })
  }
}
