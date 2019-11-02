import {
  LoadProposalStatusAction,
  LoadProposalStatusSuccessAction,
  LOAD_PROPOSAL_STATUS,
  LOAD_PROPOSAL_STATUS_SUCCESS
} from './proposal.status.actions';

describe('ProposalStatusActions', () => {
  it('LoadProposalStatusAction should work', () => {
    const action = new LoadProposalStatusAction();
    expect(action.type).toEqual(LOAD_PROPOSAL_STATUS);
  });
  it('LoadProposalStatusSuccessAction should work', () => {
    const payload = { proposalStatus: [{ description: 'abc', id: '123' }] };

    const action = new LoadProposalStatusSuccessAction(payload);
    expect(action.type).toEqual(LOAD_PROPOSAL_STATUS_SUCCESS);
    expect(action.payload).toEqual(payload);
  });
});
