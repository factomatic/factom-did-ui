import { SELECT_ACTION } from './action.actions';
import { ActionState } from './action.state';

const initialState = {
  selectedAction: undefined
};

export function actionReducers(state: ActionState = initialState, action) {
  switch (action.type) {
    case SELECT_ACTION:
      return Object.assign({}, state, {
        selectedAction: action.payload
      });
    default:
      return state;
  }
}
