import { ServiceModel } from '../../models/service.model';
import { KeyModel } from '../../models/key.model';

export interface FormState {
  readonly authenticationKeys: KeyModel[];
  readonly publicKeys: KeyModel[];
  readonly services: ServiceModel[];
}
