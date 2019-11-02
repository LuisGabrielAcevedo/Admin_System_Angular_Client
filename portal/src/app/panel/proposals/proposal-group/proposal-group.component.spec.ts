import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { of } from 'rxjs';
import { DomainsService } from '../../../pre-proposal/services/domains.service';
import { ProposalService } from '../../../proposal/proposal.service';
import { selectProposalStatusEntities } from '../../state/proposal-status/proposal.status.selectors';
import { ProposalGroupComponent } from './proposal-group.component';
import { SetSellingAction } from '../../state/proposal-selling/proposal.selling.actions';
import { ChangeFilterByAction } from '../../state/proposal-filter/proposal.filter.actions';
import { momentToOurDate } from '../../state/functions';
import * as moment from 'moment';

describe('ProposalGroupComponent', () => {
  let component: ProposalGroupComponent;
  let fixture: ComponentFixture<ProposalGroupComponent>;
  let store: MockStore<any>;
  let domainsService: DomainsService;
  let proposalService: ProposalService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalGroupComponent],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        NgxChartsModule,
        NgSelectModule,
        FormsModule,
        NgbModule
      ],
      providers: [
        {
          provide: ProposalService,
          useValue: {
            getProposalTotals: jest.fn().mockReturnValue(
              of({
                monthlyTotals: [],
                weeklyTotals: [],
                lastThreeDaysTotals: []
              })
            )
          }
        },
        provideMockStore({
          initialState: {
            'proposal-filter': {
              startDate: {
                year: 2019,
                month: 5,
                day: 25
              },
              fromDateLimit: {
                year: 2019,
                month: 3,
                day: 25
              },
              today: {
                year: 2019,
                month: 6,
                day: 25
              },
              endDate: {
                year: 2019,
                month: 6,
                day: 25
              },
              proposalStatus: '',
              document: '',
              sellingPointCode: '540'
            },
            'proposal-status': {
              ids: ['', 1, 2, 3, 4, 5, 6, 7],
              entities: {
                '1': {
                  id: 1,
                  description: 'APROBADA'
                },
                '2': {
                  id: 2,
                  description: 'EN ANALISIS'
                },
                '3': {
                  id: 3,
                  description: 'PENDIENTE'
                },
                '4': {
                  id: 4,
                  description: 'RECHAZADA'
                },
                '5': {
                  id: 5,
                  description: 'CANCELADA'
                },
                '6': {
                  id: 6,
                  description: 'COMPLETADO'
                },
                '7': {
                  id: 7,
                  description: 'TRAMITE CANCELADO'
                },
                '': {
                  id: '',
                  description: 'TODOS'
                }
              },
              selectedStatusCode: null
            },
            'proposal-list': {
              loading: false,
              pageSize: 20,
              totalElements: 61,
              pageNumber: 0,
              proposalResponseList: [
                {
                  proposalNumber: 63534,
                  financedAmount: 6349500,
                  owner: {
                    firstName: 'ROBERTO RAGUEL VALENTE',
                    lastName: 'DE SNOPEK',
                    document: '35072862'
                  },
                  vehicle: {
                    vehicleType: {
                      id: 1,
                      description: 'AUTO',
                      filter: 'A',
                      inativo: false,
                      organizationId: 13
                    },
                    brand: {
                      id: 9,
                      description: 'MASERATI',
                      integrationCode: '102',
                      inactive: false,
                      organizationId: 13
                    },
                    model: {
                      id: 3420,
                      description: 'GRAN TURISMO',
                      integrationCode: '10',
                      disabled: false,
                      organizationId: 13
                    },
                    fuelYear: {
                      id: 15007,
                      year: 2012,
                      zeroKm: false,
                      inactive: false,
                      organizationId: 13,
                      origin: 'IMPORTADO'
                    },
                    purchaseValue: 8300000,
                    adapted: false,
                    taxi: false,
                    used: true
                  },
                  status: {
                    id: 11,
                    proposalStatusCode: 'R',
                    proposalStatusDescription: 'REGISTRO DE DATOS',
                    proposalStatusGroup: {
                      id: 3,
                      description: 'PENDIENTE',
                      organizationId: 13
                    },
                    organizationId: 13,
                    priorityNumber: null
                  },
                  creationDate: '2019-06-05T20:20:57.000+0000'
                },
                {
                  proposalNumber: 63533,
                  financedAmount: 956250,
                  owner: {
                    firstName: 'ZZ NO CLIENTE',
                    lastName: 'NO CLIENTE',
                    document: '22228050'
                  },
                  vehicle: {
                    vehicleType: {
                      id: 2,
                      description: 'UTILITARIO',
                      filter: 'U',
                      inativo: false,
                      organizationId: 13
                    },
                    brand: {
                      id: 45,
                      description: 'NISSAN',
                      integrationCode: '30',
                      inactive: false,
                      organizationId: 13
                    },
                    model: {
                      id: 667,
                      description: 'PICK-UP FRONTIER 2.3 DC 4X4 LE AT',
                      integrationCode: '206',
                      disabled: false,
                      organizationId: 13
                    },
                    fuelYear: {
                      id: 4169,
                      year: 2018,
                      zeroKm: false,
                      inactive: false,
                      organizationId: 13,
                      origin: 'NACIONAL'
                    },
                    purchaseValue: 1250000,
                    adapted: false,
                    taxi: false,
                    used: true
                  },
                  status: {
                    id: 11,
                    proposalStatusCode: 'R',
                    proposalStatusDescription: 'REGISTRO DE DATOS',
                    proposalStatusGroup: {
                      id: 3,
                      description: 'PENDIENTE',
                      organizationId: 13
                    },
                    organizationId: 13,
                    priorityNumber: null
                  },
                  creationDate: '2019-06-05T19:36:20.000+0000'
                }
              ],
              proposalMappedList: [
                {
                  proposalNumber: 63534,
                  financedAmount: 6349500,
                  creationDate: '2019-06-05T20:20:57.000Z',
                  vehicleName: 'GRAN TURISMO',
                  fullName: 'DE SNOPEK, ROBERTO RAGUEL VALENTE',
                  firstName: 'ROBERTO RAGUEL VALENTE',
                  lastName: 'DE SNOPEK',
                  document: '35072862',
                  status: 'PENDIENTE'
                },
                {
                  proposalNumber: 63533,
                  financedAmount: 956250,
                  creationDate: '2019-06-05T19:36:20.000Z',
                  vehicleName: 'PICK-UP FRONTIER 2.3 DC 4X4 LE AT',
                  fullName: 'NO CLIENTE, ZZ NO CLIENTE',
                  firstName: 'ZZ NO CLIENTE',
                  lastName: 'NO CLIENTE',
                  document: '22228050',
                  status: 'PENDIENTE'
                }
              ]
            },
            'proposal-selling': {
              name: 'SALVADOR M PESTELLI SA',
              sellingPointCode: '540',
              idSellingPoint: 350763,
              city: 'CAPITAL',
              strategyCode: 'C540',
              agentCode: '540',
              branchCode: '90055',
              integrationCode: '55'
            }
          }
        }),
        {
          provide: DomainsService,
          useValue: {
            getSellingPoints: jest.fn().mockReturnValue(of([]))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    domainsService = TestBed.get(DomainsService);
    proposalService = TestBed.get(ProposalService);
    fixture = TestBed.createComponent(ProposalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should call getSellingPoints and dispatch an action', () => {
      component.idSellingPoint = '540';
      const response = [
        {
          agentCode: '2555',
          branchCode: '90385',
          city: '1 DE MAYO',
          continueWithoutInsurance: 'N',
          idSellingPoint: 350715,
          integrationCode: '385',
          name: 'COMERCIAL POSADAS SA',
          sellingPointCode: '2555',
          strategyCode: 'C2555',
          concierges: []
        },
        {
          agentCode: '111111',
          branchCode: '9022222222222385',
          city: 'Londrina',
          continueWithoutInsurance: 'N',
          idSellingPoint: 350715,
          integrationCode: '385',
          name: 'TEST INC',
          sellingPointCode: '540',
          strategyCode: 'C2555',
          concierges: []
        }
      ];
      jest
        .spyOn(domainsService, 'getSellingPoints')
        .mockReturnValue(of(response));

      const mock = jest.spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(mock).toHaveBeenCalledWith(
        new SetSellingAction({
          sellingPoint: response[1]
        })
      );

      expect(component.sellingPoints).toEqual(response);
    });
    it('selectedSellingPoint correct according to store', () => {
      component.idSellingPoint = '540';
      const response = {
        name: 'SALVADOR M PESTELLI SA',
        sellingPointCode: '540',
        idSellingPoint: 350763,
        city: 'CAPITAL',
        strategyCode: 'C540',
        agentCode: '540',
        branchCode: '90055',
        integrationCode: '55'
      };

      jest.spyOn(store, 'select').mockReturnValue(of(response));

      component.ngOnInit();

      expect(component.selectedSellingPoint).toEqual(response);
    });
  });
  it('get totals should work', () => {
    const mock = jest
      .spyOn(proposalService, 'getProposalTotals')
      .mockReturnValue(
        of({
          monthlyTotals: [
            {
              id: 1,
              count: 25,
              proposalStatus: 'Analise'
            },
            {
              id: 2,
              count: 25,
              proposalStatus: 'Done'
            }
          ],
          weeklyTotals: [],
          lastThreeDaysTotals: []
        })
      );
    jest.spyOn(store, 'select').mockReturnValue(
      of({
        '1': {
          description: 'Analise',
          id: 1
        },
        '2': {
          description: 'Done',
          id: 2
        }
      })
    );

    component.getTotals('123');

    expect(mock).toHaveBeenCalledWith('123');
    expect(component.totals).toEqual({
      monthlyTotals: [
        {
          id: 1,
          count: 25,
          proposalStatus: 'Analise',
          fullStatus: { description: 'Analise', id: 1 }
        },
        {
          id: 2,
          count: 25,
          proposalStatus: 'Done',
          fullStatus: { description: 'Done', id: 2 }
        }
      ],
      weeklyTotals: [],
      lastThreeDaysTotals: []
    });
    expect(component.selectedTotal).toEqual([
      {
        id: 1,
        count: 25,
        proposalStatus: 'Analise',
        fullStatus: { description: 'Analise', id: 1 }
      },
      {
        id: 2,
        count: 25,
        proposalStatus: 'Done',
        fullStatus: { description: 'Done', id: 2 }
      }
    ]);

    expect(component.proposals[0].name).toEqual('Analise');
    expect(component.proposals[0].value).toEqual(25);
    expect(component.proposals[0].extra).toEqual({ id: 1 });
    expect(component.proposalsTotal).toEqual(50);
  });
  it('dispatchStatus should work', () => {
    const id = '123';
    const obj = {
      scrollIntoView: jest.fn()
    } as any;

    jest.spyOn(document, 'getElementById').mockReturnValue(obj);
    const objMock = jest.spyOn(obj, 'scrollIntoView');

    const mock = jest.spyOn(store, 'dispatch');

    component.dispatchStatus(id);

    expect(mock).toHaveBeenCalledWith(
      new ChangeFilterByAction({
        filterBy: { proposalStatus: id }
      })
    );
    expect(objMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
  it('onChangeActiveProposals should work', () => {
    const obj = {
      monthlyTotals: [
        {
          id: 1,
          count: 25,
          proposalStatus: 'Analise',
          fullStatus: { description: 'Analise', id: 1 }
        },
        {
          id: 2,
          count: 25,
          proposalStatus: 'Done',
          fullStatus: { description: 'Done', id: 2 }
        }
      ],
      weeklyTotals: [],
      lastThreeDaysTotals: []
    };

    const mock = jest.spyOn(store, 'dispatch');
    component.totals = obj;
    component.onChangeActiveProposals('monthlyTotals');
    const response = mock.mock.calls[0][0] as any;

    expect(response.payload.filterBy.endDate).toEqual(
      momentToOurDate(moment())
    );
    expect(response.payload.filterBy.startDate).toEqual(
      momentToOurDate(moment().subtract(1, 'month'))
    );

    expect(component.selectedTotal).toEqual(obj.monthlyTotals);

    expect(component.proposals[0].name).toEqual('Analise');
    expect(component.proposals[0].value).toEqual(25);
    expect(component.proposals[0].extra).toEqual({ id: 1 });
    expect(component.proposalsTotal).toEqual(50);
  });
});
