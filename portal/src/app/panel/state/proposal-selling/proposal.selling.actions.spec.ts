import { SetSellingAction, SET_SELLING } from './proposal.selling.actions';

describe('ProposalStatusActions', () => {
  it('LoadProposalStatusAction should work', () => {
    const action = new SetSellingAction({
      sellingPoint: {
        test: 'abc'
      }
    });
    expect(action.type).toEqual(SET_SELLING);
  });
});
