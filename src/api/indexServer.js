import axios from 'axios';
import qs from 'qs';
import { APIException, AbortException } from '../exception.js';
import { BASE_API_URL } from '../constants.js';

export default class IndexServer {
  constructor(indexServer) {
    if (typeof indexServer !== "string") indexServer = indexServer.value;
    this.indexServer = indexServer;
  }
  static handleError(error) {
    if (!axios.isCancel(error)) {
      throw APIException.fromResponse(error.response);
    }
    else {
      throw new AbortException(error);
    }
  }
  static async loadMovies(movies) {
    const default_image_url = process.env.PUBLIC_URL + "/default_poster.jpg";

    const promises = [];

    promises.push(new Promise((resolve) => {
      const image = new Image();
      image.src = default_image_url;
      image.onload = resolve;
    }));

    for (let i = 0; i < movies.results.length; i++) {
      const movie = movies.results[i];
      // Force browser to precache images
      if (movie.thumbnail === null) {
        movie.thumbnail = default_image_url;
      }
      else {
        promises.push(new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => resolve(default_image_url);
          image.src = movie.thumbnail;
        }));
      }
    }
    await Promise.all(promises);
    return movies;
  }
  makeParams(params) {
    return {
      index_server : this.indexServer,
      ...params
    };
  }
  async getMovies(category, page, data) {
    try {
      const params = this.makeParams({
        category : category,
        page : page,
        confirm_exists : true
      });
      const response = await axios.get(BASE_API_URL + `/movies?` + qs.stringify(params), data);
      const movies = response.data;
      return await IndexServer.loadMovies(movies);
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
  async searchMovies(query, page, data) {
    if (!query) return await IndexServer.loadMovies([]);
    try {
      const params = this.makeParams({
        page : page,
        confirm_exists : true
      });
      const response = await axios.get(BASE_API_URL + `/search/${query}?` + qs.stringify(params), data);
      const movies = response.data;
      return await IndexServer.loadMovies(movies);
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
  async getGenres(data) {
    try {
      const params = this.makeParams();
      const response = await axios.get(BASE_API_URL + `/genres?` + qs.stringify(params), data);
      return response.data;
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
  async getMovieById(id, data) {
    try {
      const params = this.makeParams();
      const response = await axios.get(BASE_API_URL + `/movie/${id}?` + qs.stringify(params), data);
      return response.data;
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
  async getMovieRecommendations(id, page, data) {
    try {
      const params = this.makeParams({
        page : page,
        confirm_exists : true
      });
      const response = await axios.get(BASE_API_URL + `/movie/${id}/recommended?` + qs.stringify(params), data);
      const movies = response.data;
      return await IndexServer.loadMovies(movies);
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
  async getSimilarMovies(id, page, data) {
    try {
      const params = this.makeParams({
        page : page,
        confirm_exists : true
      });
      const response = await axios.get(BASE_API_URL + `/movie/${id}/similar?` + qs.stringify(params), data);
      const movies = response.data;
      return await IndexServer.loadMovies(movies);
    }
    catch (error) {
      IndexServer.handleError(error);
    }
  }
}

export async function getIndexServers(data) {
  try {
    const response = await axios.get(BASE_API_URL + "/indexServers", data);
    return response.data;
  }
  catch (error) {
    IndexServer.handleError(error);
  }
}
