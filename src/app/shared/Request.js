import 'whatwg-fetch';
import Api from '/src/fetchers/config';
import AppStore from '/src/app/shared/AppState';
import _ from 'lodash';

const error = instance => err => {

  if (err.response) {
    if (err.response.status === 404) {
      err.response.text().then(error);

    } else {
      err.response.json().then(error);
    }

    function error(data) {
      const requestName = instance.postfix ? instance.postfix : instance.type;
      AppStore.store.dispatch({
        type: `FETCH_${requestName}_ERROR`, payload: {
        ...data,
        ...instance,
      }});
    }
  }

};

const notifySuccess = instance => response => {

  const requestName = instance.postfix ? instance.postfix : instance.type;
  AppStore.store.dispatch({
    type   : `FETCH_${requestName}_SUCCESS`,
    payload: {
      ...instance,
      response,
    }
  });

  return response;
};


const RESPONSE_TYPES = ['json', 'text', 'blob', 'response'];


const DEFAULT_OPTIONS = {
  headers: {
    'Accept'      : 'application/json',
    'Content-Type': 'application/json',
  },

  credentials: 'same-origin',
};


const _fetch = (url, opts = {}, data) => {

  opts.responseAs = (opts.responseAs && RESPONSE_TYPES.indexOf(opts.responseAs) >= 0) ? opts.responseAs : 'json';

  opts = _.defaultsDeep(opts, DEFAULT_OPTIONS);

  if (data) {
    opts.body = JSON.stringify(data, null, 2);
  } else {
    delete opts.body;
  }

  return fetch(url, opts)
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        if (opts.responseAs === 'response') {
          return response;
        }

        if (response.status === 204) {
          return null;
        }
        return response[opts.responseAs]();
      }

      let err      = new Error(response.statusText);
      err.response = response;
      throw err;
    });
};

export const completeUrl = url => _.startsWith(url, './') ? url : `${Api.url}${url}`;

export default class Request {

  constructor(url, opts = {}) {
    this.url  = completeUrl(url);
    this.opts = opts;
  }

  get() {
    this.type = 'GET';

    return _fetch(this.url, _.defaultsDeep({}, this.opts, {responseAs: 'json', method: this.type}))
      .catch(error(this))
      .then(notifySuccess(this));
  }

  post(data, postfix = '') {
    this.data    = data;
    this.type    = 'POST';
    this.postfix = postfix;

    return _fetch(this.url, _.defaultsDeep({}, this.opts, {responseAs: 'json', method: this.type}), this.data)
      .then(notifySuccess(this))
      .catch(error(this));
  }
}
