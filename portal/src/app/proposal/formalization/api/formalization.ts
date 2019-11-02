export interface PostFormalization {
  email: string;
  foodDebtVerificationAuthorizedOwner: boolean;
  foodDebtVerificationAuthorizedCoOwner: boolean;
}

export interface PledgeCapacity {
  hasCapacity: boolean;
  quote?: number;
  success: boolean;
  value: number;
}
