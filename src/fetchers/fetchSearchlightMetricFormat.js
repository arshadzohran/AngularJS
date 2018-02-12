import Request from '/src/app/shared/Request';

export const fetchSearchlightMetricFormat = (success) => {
  new Request(`searchlightMetricFormat`).get().then(success);
};

export default fetchSearchlightMetricFormat;
