import axios from 'axios';
import qs from 'qs';
import { APIException, AbortException } from '../exception.js';
import { BASE_API_URL } from '../constants.js';

export default class Server {
  constructor(server) {
    this.server = server;
  }
  static handleError(error) {
    if (!axios.isCancel(error)) {
      throw APIException.fromResponse(error.response);
    }
    else {
      throw new AbortException(error);
    }
  }
  makeParams(params) {
    return {
      server : this.server,
      ...params
    };
  }
  async getStreamData(url, data) {
    const params = this.makeParams();
    try {
      const params = this.makeParams({
        url
      });
      const response = await axios.get(BASE_API_URL + `/streamData?` + qs.stringify(params), data);
      const streamData = response.data;
      return streamData;
    }
    catch (error) {
      Server.handleError(error);
    }
  }
}
