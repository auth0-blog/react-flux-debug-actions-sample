import superagent from 'superagent';

import debug from './debug';
import dispatch from './dispatch';

const BASE_URL = 'http://localhost:3001';

class HttpClient {
  constructor() {
    this._defaultTransformResponseCallback = (res) => res.body;
  }

  get(action, options, transformResponseCallback) {
    var request = superagent.get(`${BASE_URL}${options.url}`);
    if (options.query) {
      request = request.query(options.query);
    }

    return this._execute(action, request, options, transformResponseCallback);
  }

  post(action, options, transformResponseCallback) {
    var request = superagent.post(`${BASE_URL}${options.url}`);
    if (options.data) {
      request = request.send(options.data);
    }

    return this._execute(action, request, options, transformResponseCallback);
  }

  _dispatch(action, actionSuffix, data) {
    if (action) {
      dispatch({
        ...data,
        actionType: `${action}${actionSuffix || ''}`
      });
    }
  }

  _execute(action, request, options, transformResponseCallback) {
    if (debug.isActive) {
      console.log('Debug mode active - not executing Http Request:', request);
      return;
    }

    this._dispatch(action, null, options);

    return new Promise((resolve, reject) => {
      request.end((err, res) => {
        if (err) {
          this._dispatch(action, '_FAILED', {
            error: err.message || err
          });

          return reject(err);
        } else if (res.status < 200 && res.status >= 400) {
          this._dispatch(action, '_FAILED', {
            error: res.body.message || 'Unexpected status code: ' + res.statusCode
          });

          err = new Error('Unexpected status code: ' + res.statusCode);
          err.res = res;
          return reject(err);
        }

        if (!transformResponseCallback) {
          transformResponseCallback = this._defaultTransformResponseCallback;
        }

        var transformedResponse = transformResponseCallback(res);
        this._dispatch(action, '_SUCCESS', transformedResponse);

        return resolve(transformedResponse);
      });
    });
  }
}

export default new HttpClient();
