export interface AccountPartialProposal {
  coOwnerAccountList: accountList[];
  ownerAccountList: accountList[];
}

export interface accountList {
  accountNumber: number;
  sellingPoint: SellingPoint;
}

export interface SellingPoint {
  idSellingPoint: number;
  name: string;
  integrationCode: number;
}

export const AccountPartialProposalFactory = (
  param: any = {}
): AccountPartialProposal => {
  const newAccountPartialProposal = {
    coOwnerAccountList: [CoOwnerAccountList()],
    ownerAccountList: [CoOwnerAccountList()]
  };

  const result = {
    ...newAccountPartialProposal,
    ...param
  } as AccountPartialProposal;

  return result;
};

export const CoOwnerAccountList = (param: any = {}): accountList => {
  const newCoOwnerAccountList = {
    branchOffice: 0,
    accountNumber: 0,
    sellingPoint: {}
  };
  const result = {
    ...newCoOwnerAccountList,
    ...param
  } as accountList;

  return result;
};
