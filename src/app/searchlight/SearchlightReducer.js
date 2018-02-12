const initialState = {
  formData: [],
  metrics: [],
  metricFormat: {},
  untouchedMetrics: [],
  recents: [],
  ecsFailures: false,
  apiFailure: false,
};


import {
  SEARCHLIGHT_METRICS_DATA_LOADED,
  SEARCHLIGHT_METRICS_FILTERED_LOADED,
  SEARCHLIGHT_METRICS_DEFAULT_LOADED,
  SEARCHLIGHT_FORM_DATA_LOADED,
  SEARCHLIGHT_METRIC_FILTER,
  SEARCHLIGHT_METRIC_FILTER_CLEAR,
  SEARCHLIGHT_METRIC_FORMAT,
  SEARCHLIGHT_LANDING_PAGE_LOADED,
  SEARCHLIGHT_METRICS_DEFAULT_DATA_LOADED,
  SEARCHLIGHT_METRIC_RETRIEVAL_FAILED,
  SEARCHLIGHT_API_FAILURE
} from './SearchlightActions';

import MetricUtils from '/src/app/shared/MetricUtils';
import FilterMetricBuilder from '/src/app/shared/FilterMetricBuilder';

export default function searchlight (state = initialState, action = {}) {

  switch (action.type) {
    case SEARCHLIGHT_METRICS_DATA_LOADED:
      return {
        ...state,
        untouchedMetrics: action.payload,
        apiFailure: false,
        ecsFailures: false
      };

    case SEARCHLIGHT_METRICS_FILTERED_LOADED:
      return {
        ...state,
        metrics: action.payload,
        apiFailure: false,
        ecsFailures: false
      };

    case SEARCHLIGHT_METRICS_DEFAULT_LOADED:
      return {
        ...state,
        metrics: action.payload,
        apiFailure: false,
        ecsFailures: false
      };

    case SEARCHLIGHT_METRICS_DEFAULT_DATA_LOADED:
      return {
        ...state,
        untouchedMetrics: action.payload,
        apiFailure: false,
        ecsFailures: false
      };

    case SEARCHLIGHT_FORM_DATA_LOADED:
      return {...state, formData: action.payload};

    case SEARCHLIGHT_METRIC_FORMAT:
      return {...state, metricFormat: action.payload};

    case SEARCHLIGHT_METRIC_FILTER:
      //const payload = FilterMetricBuilder.sanitizeFilters(action.payload);
      //const compareMetrics = FilterMetricBuilder.getMetricCompareHelper(payload);
      //const filterMetrics = state.untouchedMetrics.filter((metric) => compareMetrics(metric, payload));
      return {...state, untouchedMetrics: action.payload, apiFailure: false, ecsFailures: false};

    case SEARCHLIGHT_METRIC_FILTER_CLEAR:
      return {...state, metrics: state.untouchedMetrics.concat()};

    case SEARCHLIGHT_LANDING_PAGE_LOADED:
      return {...state, recents: action.payload};

    case SEARCHLIGHT_METRIC_RETRIEVAL_FAILED:
      return {...state, ecsFailures: true, apiFailure: false};

    case SEARCHLIGHT_API_FAILURE:
      return {...state, apiFailure: true, ecsFailures: false};

    default:
      return state;
  }
}
