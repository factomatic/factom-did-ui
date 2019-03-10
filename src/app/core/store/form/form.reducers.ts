import { ADD_PUBLIC_KEYS, ADD_SERVICES } from './form.actions';
import { FormState } from './form.state';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

const initialState: FormState = {
  publicKeys: [],
  services: []
};

function addPublicKeys(state: FormState, publicKeys: KeyModel[]) {
  return Object.assign({}, state, {
    publicKeys: publicKeys
  });
}

function addServices(state: FormState, services: ServiceModel[]) {
  return Object.assign({}, state, {
    services: services
  });
}

export function formReducers(state: FormState = initialState, action) {
  switch (action.type) {
    case ADD_PUBLIC_KEYS:
      return addPublicKeys(state, action.payload);
    case ADD_SERVICES:
      return addServices(state, action.payload);
    default:
      return state;
  }
}
