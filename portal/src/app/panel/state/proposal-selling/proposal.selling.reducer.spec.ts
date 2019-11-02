import { initProposalSellingState } from './proposal.selling.init';
import { proposalSellingReducer } from './proposal.selling.reducer';
import { SetSellingAction } from './proposal.selling.actions';

describe('proposalStatusReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = proposalSellingReducer(
        initProposalSellingState,
        {} as any
      );

      expect(result).toEqual(initProposalSellingState);
    });
  });
  describe('SET_SEELING action', () => {
    it('should return the default state', () => {
      const action = new SetSellingAction({
        sellingPoint: {
          test: 'abc'
        }
      });
      const result = proposalSellingReducer(initProposalSellingState, action);
      const expected = {
        ...initProposalSellingState,

        test: 'abc'
      };
      expect(result).toEqual(expected);
    });
  });
});
