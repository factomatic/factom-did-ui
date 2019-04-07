import { ADD_AUTHENTICATION_KEY, ADD_PUBLIC_KEY, ADD_SERVICE,
  REMOVE_AUTHENTICATION_KEY, REMOVE_PUBLIC_KEY, REMOVE_SERVICE } from './form.actions';
import { CLEAR_FORM } from '../action/action.actions';
import { FormState } from './form.state';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

const initialState: FormState = {
  authenticationKeys: [],
  publicKeys: [],
  services: []
};

function addAuthenticationKey(state: FormState, authenticationKey: KeyModel) {
  return {
    ...state,
    authenticationKeys: [...state.authenticationKeys, authenticationKey]
  };
}

function addPublicKey(state: FormState, publicKey: KeyModel) {
  return {
    ...state,
    publicKeys: [...state.publicKeys, publicKey]
  };
}

function addService(state: FormState, service: ServiceModel) {
  return {
    ...state,
    services: [...state.services, service]
  };
}

function removeAuthenticationKey(state: FormState, key: KeyModel) {
  return {
    ...state,
    authenticationKeys: state.authenticationKeys.filter(k => k !== key),
  };
}

function removePublicKey(state: FormState, key: KeyModel) {
  return {
    ...state,
    authenticationKeys: state.authenticationKeys.filter(k => k !== key),
    publicKeys: state.publicKeys.filter(k => k !== key)
  };
}

function removeService(state: FormState, service: ServiceModel) {
  return {
    ...state,
    services: state.services.filter(s => s !== service),
  };
}

export function formReducers(state: FormState = initialState, action) {
  switch (action.type) {
    case ADD_AUTHENTICATION_KEY:
      return addAuthenticationKey(state, action.payload);
    case ADD_PUBLIC_KEY:
      return addPublicKey(state, action.payload);
    case ADD_SERVICE:
      return addService(state, action.payload);
    case CLEAR_FORM:
      return initialState;
    case REMOVE_AUTHENTICATION_KEY:
      return removeAuthenticationKey(state, action.payload);
    case REMOVE_PUBLIC_KEY:
      return removePublicKey(state, action.payload);
    case REMOVE_SERVICE:
      return removeService(state, action.payload);
    default:
      return state;
  }
}
