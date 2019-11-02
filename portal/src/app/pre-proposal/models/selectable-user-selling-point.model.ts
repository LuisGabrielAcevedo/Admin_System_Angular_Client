import { UserSellingPoint } from '@app/common/login/models/state/selling-point';

export interface SelectableUserSellingPoint extends UserSellingPoint {
  disabled: boolean;
}
