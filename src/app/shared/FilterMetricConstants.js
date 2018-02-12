export const BUDGET = 'budget';
export const RETURN_FUNCTION = 'returnfunction';
export const CPR = 'cpr';
export const FILTERS = 'filters';
export const DATE_RANGE = 'daterange';

export function getMetricNames() {
  return [
    BUDGET,
    RETURN_FUNCTION,
    CPR,
    FILTERS,
    DATE_RANGE,
  ];
}

export default {
  getMetricNames,
}
