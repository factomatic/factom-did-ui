import { ServiceModel } from '../../models/service.model';
import { KeyModel } from '../../models/key.model';

export interface FormState {
  readonly publicKeys: KeyModel[];
  readonly services: ServiceModel[];
}
