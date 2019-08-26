import axios from 'axios';

const CancelToken = axios.CancelToken;

export function cancelToken() {
  return CancelToken.source();
}
