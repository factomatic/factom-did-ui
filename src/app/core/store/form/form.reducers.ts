import { ADD_AUTHENTICATION_KEYS, ADD_PUBLIC_KEY, ADD_SERVICES, REMOVE_PUBLIC_KEY } from './form.actions';
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

function addPublicKey(state: FormState, publicKey: KeyModel) {
  return {
    ...state,
    publicKeys: [...state.publicKeys, publicKey]
  };
}

function addServices(state: FormState, services: ServiceModel[]) {
  return {
    ...state,
    services: services
  };
}

function removePublicKey(state: FormState, key: KeyModel) {
  return {
    ...state,
    authenticationKeys: state.authenticationKeys.filter(k => k !== key),
    publicKeys: state.publicKeys.filter(k => k !== key)
  };
}

export function formReducers(state: FormState = initialState, action) {
  switch (action.type) {
    case ADD_AUTHENTICATION_KEYS:
      return addAuthenticationKeys(state, action.payload);
    case ADD_PUBLIC_KEY:
      return addPublicKey(state, action.payload);
    case ADD_SERVICES:
      return addServices(state, action.payload);
    case REMOVE_PUBLIC_KEY:
      return removePublicKey(state, action.payload);
    default:
      return state;
  }
}
