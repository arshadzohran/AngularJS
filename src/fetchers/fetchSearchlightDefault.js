import Request from '/src/app/shared/Request';

export const fetchSearchlightDefault = (success) => {
  new Request(`optimize?allocation=timeAllocation`).get().then(success);
};

export default fetchSearchlightDefault;
