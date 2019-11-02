import { proposalStatusReducer } from './proposal.status.reducer';
import { initialStatusState } from './proposal.status.init';
import { LoadProposalStatusSuccessAction } from './proposal.status.actions';

describe('proposalStatusReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = proposalStatusReducer(initialStatusState, {} as any);

      expect(result).toEqual(initialStatusState);
    });
  });
  describe('LOAD_PROPOSAL_STATUS_SUCCESS action', () => {
    it('should return the default state', () => {
      const action = new LoadProposalStatusSuccessAction({
        proposalStatus: [{ id: 'aaaaa', description: 'AAAAAA' }]
      });
      const result = proposalStatusReducer(initialStatusState, action);
      const expected = {
        ...initialStatusState,
        ids: ['aaaaa'],
        entities: { aaaaa: { id: 'aaaaa', description: 'AAAAAA' } }
      };
      expect(result).toEqual(expected);
    });
  });
});
