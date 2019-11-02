import { ProposalFilterState } from './proposal.filter.model';
import { momentToOurDate } from '../functions';
import * as moment from 'moment';

export const initProposalFilterState: ProposalFilterState = {
  startDate: momentToOurDate(moment().subtract(1, 'month')),
  fromDateLimit: momentToOurDate(moment().subtract(3, 'month')),
  today: momentToOurDate(moment()),
  endDate: momentToOurDate(moment()),
  proposalStatus: '',
  document: '',
  sellingPointCode: '540'
};
