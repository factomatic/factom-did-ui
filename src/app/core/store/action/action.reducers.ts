import { ActionState } from './action.state';
import { COMPLETE_STEP, SELECT_ACTION } from './action.actions';

const initialState = {
  selectedAction: undefined,
  lastCompletedStepIndex: 0
};

export function actionReducers(state: ActionState = initialState, action) {
  switch (action.type) {
    case SELECT_ACTION:
      return Object.assign({}, state, {
        selectedAction: action.payload
      });
    case COMPLETE_STEP:
      return Object.assign({}, state, {
        lastCompletedStepIndex: action.payload
      });
    default:
      return state;
  }
}
