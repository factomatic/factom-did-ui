import { ActionState } from './action/action.state';
import { FormState } from './form/form.state';

export interface AppState {
  action: ActionState;
  form: FormState;
}
