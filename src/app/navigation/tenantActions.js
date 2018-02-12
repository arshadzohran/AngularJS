export const TENANT_SELECTED = 'TENANT_SELECTED';
export const GET_TENANT_NAME = 'GET_TENANT_NAME';

export function setTenant(tenant) {
  return {
    type: TENANT_SELECTED,
    payload: tenant
  };
}

export function getTenant() {
  return (dispatch) => {
    fetchSearchlightMetrics((resp) => {
      dispatch({type: GET_TENANT_NAME, payload: resp});
    });
  };
}
