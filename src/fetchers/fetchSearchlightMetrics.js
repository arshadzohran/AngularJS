import Request from '/src/app/shared/Request';

export const fetchSearchlightMetrics = (filters, success) => {
  new Request(`optimize-data`).post(filters).then((data) => {
    return data;
  }).then(success);
};

export default fetchSearchlightMetrics;
