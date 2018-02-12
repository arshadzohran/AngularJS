import FilterMetricConstants, {BUDGET, FILTERS, DATE_RANGE, RETURN_FUNCTION, CPR} from '/src/app/shared/FilterMetricConstants';
import MetricUtils from '/src/app/shared/MetricUtils';

import _ from 'lodash';

export const compareBudget = (metric, filters) => {
  return MetricUtils.compareBudget(filters[BUDGET], metric.RnB);
}

export const compareDivision = (metric, filters) => {
  return metric.Division === filters[FILTERS];
}

export const compareDates = (metric, filters) => {
  return MetricUtils.compareDates(metric.Date, filters[DATE_RANGE][0], filters[DATE_RANGE][1]);
}

export const compareReturnFunction = (metric, filters) => {
  return;
}

export const compareCPR = (metric, filters) => {
  return;
}

const compareLookup = {
  [`${BUDGET}`]: compareBudget,
  [`${CPR}`]: compareCPR,
  [`${RETURN_FUNCTION}`]: compareReturnFunction,
  [`${FILTERS}`]: compareDivision,
  [`${DATE_RANGE}`]: compareDates,
  //[`${END_DATE}`]: compareDates,
};

export const sanitizeFilters = (filters) => {
  const filtersCopy = Object.assign({}, filters);
  Object.keys(filtersCopy).map((key) => !MetricUtils.validMetric(filtersCopy[key]) && delete filtersCopy[key]);
  return filtersCopy;
}

export function getMetricCompareHelper(payload) {
  const compiledFunctions = _.uniqBy(Object.keys(payload).map((filter)=>{
    return compareLookup[filter];
  }));

  const compare = (metric, filters) => {
    const result = compiledFunctions.map((func) => {
      return func.call(this, metric, filters);
    });
    return result.every(x => x);
  }

  return compare;
};

export default {
  getMetricCompareHelper,
  sanitizeFilters,
}
