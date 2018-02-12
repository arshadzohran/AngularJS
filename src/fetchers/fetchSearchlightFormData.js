import Request from '/src/app/shared/Request';

export const fetchSearchlightFormData = (success) => {
  new Request(`searchlightFormData`).get().then(success);
};

export default fetchSearchlightFormData;
