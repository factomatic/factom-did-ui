import { ADD_SERVICES } from './form.actions';
import { ServiceModel } from '../../models/service.model';
import { FormState } from './form.state';

const initialState: FormState = {
  services: []
};

function addServices(state: FormState, services: ServiceModel[]) {
  return Object.assign({}, state, {
    services: services
  });
}

export function formReducers(state: FormState = initialState, action) {
  switch (action.type) {
    case ADD_SERVICES:
      return addServices(state, action.payload);
    default:
      return state;
  }
}
