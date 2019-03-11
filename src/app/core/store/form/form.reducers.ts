import { ADD_AUTHENTICATION_KEYS, ADD_PUBLIC_KEYS, ADD_SERVICES } from './form.actions';
import { FormState } from './form.state';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

const initialState: FormState = {
  authenticationKeys: [],
  publicKeys: [],
  services: []
};

function addAuthenticationKeys(state: FormState, authenticationKeys: KeyModel[]) {
  return {
    ...state,
    authenticationKeys: authenticationKeys
  };
}

function addPublicKeys(state: FormState, publicKeys: KeyModel[]) {
  return {
    ...state,
    publicKeys: publicKeys
  };
}

function addServices(state: FormState, services: ServiceModel[]) {
  return {
    ...state,
    services: services
  };
}

export function formReducers(state: FormState = initialState, action) {
  switch (action.type) {
    case ADD_AUTHENTICATION_KEYS:
      return addAuthenticationKeys(state, action.payload);
    case ADD_PUBLIC_KEYS:
      return addPublicKeys(state, action.payload);
    case ADD_SERVICES:
      return addServices(state, action.payload);
    default:
      return state;
  }
}
