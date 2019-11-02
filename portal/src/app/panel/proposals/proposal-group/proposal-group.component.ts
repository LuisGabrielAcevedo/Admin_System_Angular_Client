import { ProposalSummary } from './../../state/proposal-list/proposal.list.model';
import { ProposalService } from './../../../proposal/proposal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DomainsService } from '../../../pre-proposal/services/domains.service';
import {
  GetProposalTotalResponse,
  Total
} from '../../../proposal/api/get.proposal.total.res';
import { Branch } from '../../../proposal/data-register/api/branch';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { ProposalStatus } from '../../api/get.proposalStatus.res';
import { momentToOurDate } from '../../state/functions';
import { ChangeFilterByAction } from '../../state/proposal-filter/proposal.filter.actions';
import { SetSellingAction } from '../../state/proposal-selling/proposal.selling.actions';
import { proposalSellingSelector } from '../../state/proposal-selling/proposal.selling.selectors';
import { selectProposalStatusEntities } from '../../state/proposal-status/proposal.status.selectors';
import { userSellingPointsSelector } from '../../../common/login/store/login.selectors';

@Component({
  selector: 'app-proposal-group',
  templateUrl: './proposal-group.component.html',
  styleUrls: ['./proposal-group.component.scss']
})
export class ProposalGroupComponent implements OnInit, OnDestroy {
  activeProposals = 'monthlyTotals';
  proposalsTotal: number;
  @Output() allProposals: EventEmitter<any[]> = new EventEmitter();

  /** End Example arrays for CHART */

  proposals = [];
  sellingPoints = [];

  /** Chart */

  view: any[] = [300];

  // options
  showLegend = false;

  colorScheme = {
    domain: []
  };

  totals: any;
  selectedTotal: FullTotal[];
  selectedSellingPoint;

  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = true;
  // selectedSellingPoint
  /** End Chart */
  count = 0;
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private proposalService: ProposalService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store
      .select(userSellingPointsSelector)
      .pipe(filter(selingPoints => selingPoints.length > 0))
      .subscribe(res => {
        const sp = res.map(r => ({
          sellingPointCode: r.code,
          ...r
        }));
        this.sellingChange(sp[0]);
        this.sellingPoints = sp;
      });

    this.store
      .select(proposalSellingSelector)
      .subscribe(selling => (this.selectedSellingPoint = selling));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTotals(sellingPointCode = this.selectedSellingPoint.sellingPointCode) {
    combineLatest(
      this.proposalService.getProposalTotals(sellingPointCode),
      this.store
        .select(selectProposalStatusEntities)
        .pipe(filter(status => Object.keys(status).length !== 0))
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([totals, status]) => {
        this.totals = this.mapStatus(totals, status);
        this.selectedTotal = this.totals.monthlyTotals as any;
        this.proposals = this.calculateProposals(this.selectedTotal);
        this.proposalsTotal = this.calculateTotal(this.selectedTotal);
        this.colorScheme.domain = this.proposals.map(
          proposal => proposal.color
        );
        this.allProposals.emit(this.proposals);
      });
  }

  private mapStatus(totals: GetProposalTotalResponse, status) {
    const newTotals = { ...totals };
    for (const key in totals) {
      if (totals.hasOwnProperty(key)) {
        const element = totals[key];
        newTotals[key] = element.map((obj: { id: string | number }) => {
          const newobj = {
            ...obj,
            fullStatus: status[obj.id]
          };
          return newobj;
        });
      }
    }
    return newTotals;
  }

  private calculateProposals(selectedTotal) {
    return selectedTotal.map((total, i) => {
      const colorScale = calculateColor(150, 270);
      const color = colorScale(i, selectedTotal.length);
      return {
        name: total.fullStatus.description,
        value: total.count,
        extra: { id: total.id },
        color
      };
    });
  }
  private calculateTotal(selectedTotal) {
    return selectedTotal
      .map(total => total.count)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  onSelect(event) {
    this.dispatchStatus(event.extra.id);
  }

  dispatchStatus(id: number | string) {
    const el = document.getElementById('proposal-list');
    el.scrollIntoView({ behavior: 'smooth' });
    this.store.dispatch(
      new ChangeFilterByAction({
        filterBy: { proposalStatus: id }
      })
    );
  }

  onChangeActiveProposals(
    value: 'monthlyTotals' | 'weeklyTotals' | 'lastThreeDaysTotals'
  ) {
    this.store.dispatch(
      new ChangeFilterByAction({
        filterBy: this.changeFilter(value)
      })
    );
    this.selectedTotal = this.totals[value];
    this.proposals = this.calculateProposals(this.selectedTotal);
    this.proposalsTotal = this.calculateTotal(this.selectedTotal);
    this.allProposals.emit(this.proposals);
  }

  sellingChange(event: any) {
    const sellingPointCode = event
      ? event.sellingPointCode
      : this.selectedSellingPoint;
    this.getTotals(sellingPointCode);
    this.store.dispatch(new SetSellingAction({ sellingPoint: event }));
  }

  changeFilter(value) {
    const endDate = moment();
    let startDate = moment();
    if (value === 'weeklyTotals') {
      startDate = moment().subtract(7, 'days');
    }
    if (value === 'monthlyTotals') {
      startDate = moment().subtract(1, 'month');
    }
    if (value === 'lastThreeDaysTotals') {
      startDate = moment().subtract(3, 'days');
    }
    return {
      endDate: momentToOurDate(endDate),
      startDate: momentToOurDate(startDate)
    };
  }
}

interface FullTotal extends Total {
  fullStatus: ProposalStatus;
}

function calculateColor(init = 0, end = 360) {
  const delta = end - init;
  return (index: number, length: number) => {
    const t = index / (length - 1) || 0;
    const odd = index % 2;
    const lux = odd * 20 + 60;
    const hue = t * delta + init;
    return `hsl(${hue},100%,${lux}%)`;
  };
}
