import { ActionState } from './action.state';
import { CLEAR_FORM, MOVE_TO_STEP, SELECT_ACTION } from './action.actions';

const initialState = {
  selectedAction: undefined,
  lastCompletedStepIndex: 0
};

export function actionReducers(state: ActionState = initialState, action) {
  switch (action.type) {
    case CLEAR_FORM:
      return initialState;
    case MOVE_TO_STEP:
      return Object.assign({}, state, {
        lastCompletedStepIndex: action.payload - 1
      });
    case SELECT_ACTION:
      return Object.assign({}, state, {
        selectedAction: action.payload
      });
    default:
      return state;
  }
}