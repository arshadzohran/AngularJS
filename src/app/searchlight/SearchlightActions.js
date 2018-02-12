export const SEARCHLIGHT_METRICS_DATA_LOADED = 'SEARCHLIGHT_METRICS_DATA_LOADED';
export const SEARCHLIGHT_METRICS_FILTERED_LOADED = 'SEARCHLIGHT_METRICS_FILTERED_LOADED';
export const SEARCHLIGHT_FORM_DATA_LOADED = 'SEARCHLIGHT_FORM_DATA_LOADED';
export const SEARCHLIGHT_METRIC_FILTER = 'SEARCHLIGHT_METRIC_FILTER';
export const SEARCHLIGHT_METRIC_FILTER_CLEAR = 'SEARCHLIGHT_METRIC_FILTER_CLEAR';
export const SEARCHLIGHT_METRIC_FORMAT = 'SEARCHLIGHT_METRIC_FORMAT';
export const SEARCHLIGHT_METRICS_DEFAULT_LOADED = 'SEARCHLIGHT_METRICS_DEFAULT_LOADED';
export const SEARCHLIGHT_LANDING_PAGE_LOADED = 'SEARCHLIGHT_LANDING_PAGE_LOADED';
export const SEARCHLIGHT_METRICS_DEFAULT_DATA_LOADED = 'SEARCHLIGHT_METRICS_DEFAULT_DATA_LOADED';
export const SEARCHLIGHT_METRIC_RETRIEVAL_FAILED = 'SEARCHLIGHT_METRIC_RETRIEVAL_FAILED';
export const SEARCHLIGHT_API_FAILURE = 'SEARCHLIGHT_API_FAILURE';

import fetchSearchlightMetrics from '/src/fetchers/fetchSearchlightMetrics';
import fetchSearchlightFormData from '/src/fetchers/fetchSearchlightFormData';
import fetchSearchlightMetricFormat from '/src/fetchers/fetchSearchlightMetricFormat';
import Request from '/src/app/shared/Request';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function getSearchlightMetrics() {
  return (dispatch) => {
  dispatch(showLoading());
    fetchSearchlightMetrics((resp) => {
        dispatch({type: SEARCHLIGHT_METRICS_DATA_LOADED, payload: resp});
    });
    dispatch(hideLoading());
  };
}

export function getSearchlightDefault() {
  return (dispatch) => {
    dispatch(showLoading());
    let promises = [];
    const promise = new Request('optimize?allocation=timeAllocation')
    .get()
    .then((response) => dispatch({type: SEARCHLIGHT_METRICS_DEFAULT_LOADED, payload: response}));
    promises.push(promise);
    const promisetwo = new Request('optimize?allocation=crossSectionAllocation')
    .get()
    .then((response) => dispatch({type: SEARCHLIGHT_METRICS_DEFAULT_DATA_LOADED, payload: response}))
    .then(() => dispatch(hideLoading()));
    promises.push(promisetwo);
    return Promise.all(promises);
  };
}

export function getSearchlightFormData() {
  return (dispatch) => {
    fetchSearchlightFormData((resp) => {
      dispatch({type: SEARCHLIGHT_FORM_DATA_LOADED, payload: resp});
    });
  };
}

export function getSearchlightMetricFormat() {
  return (dispatch) => {
    fetchSearchlightMetricFormat((resp) => {
      dispatch({type: SEARCHLIGHT_METRIC_FORMAT, payload: resp});
    });
  };
}

export function applyMetricFilter(filter) {
  return (dispatch) => {
    dispatch(showLoading());
    let promises = [];
    let dataResponse = 0;
    let optResponse = 0;
    const promise = new Request(`optimize-data`)
    .post(filter)
    .then((response) => {
      if (response === undefined || optResponse === 1) {
        dispatch({type: SEARCHLIGHT_API_FAILURE, payload: "No Response"});
        dataResponse = 1;
      } else if (response.failures) {
        dispatch({type: SEARCHLIGHT_METRIC_RETRIEVAL_FAILED, payload: "Failure!"});
        dataResponse = 2;
      } else {
        dispatch({type: SEARCHLIGHT_METRIC_FILTER, payload: response})
      }
      console.log(`${dataResponse}, ${optResponse}`);
    }).then(dispatch(hideLoading()));
    promises.push(promise);
    const promisetwo = new Request('optimize')
    .post(filter)
    .then((response) => {
      if (response === undefined || dataResponse === 1) {
        dispatch({type: SEARCHLIGHT_API_FAILURE, payload: "No Response"});
        optResponse = 1;
      } else if (dataResponse === 2) {
        dispatch({type: SEARCHLIGHT_METRIC_RETRIEVAL_FAILED, payload: "Failure!"});
      } else {
        dispatch({type: SEARCHLIGHT_METRICS_FILTERED_LOADED, payload: response});
      }
      console.log(`${dataResponse}, ${optResponse}`);
    });
    promises.push(promisetwo);
    return Promise.all(promises);
  }
}

export function clearMetricFilter() {
  return (dispatch) => {
    dispatch({type: SEARCHLIGHT_METRIC_FILTER_CLEAR, payload: {}});
  };
}

export function getRecentOptimizations() {
  return (dispatch) => {
    let promises = [];
    const promise = new Request(`recentOptimizations`)
    .get()
    .then((response) => dispatch({type: SEARCHLIGHT_LANDING_PAGE_LOADED, payload: response}));
    promises.push(promise);
    return Promise.all(promises)
  }
}
