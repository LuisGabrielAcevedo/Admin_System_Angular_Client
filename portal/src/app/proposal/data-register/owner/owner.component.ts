import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstants } from '@app/common/common-constants';
import { ModalService } from '@app/common/modal';
import { MONTHS } from '@app/constants/date.constants';
import { ENRI_STATUS_RES } from '@app/constants/enri.constants';
import { PEP_TYPE } from '@app/constants/pep.constants';
import { AfipActivity } from '@app/pre-proposal/api/afipActivity';
import { DomainsService } from '@app/pre-proposal/services/domains.service';
import { ProposalService } from '@app/proposal';
import { Customer, Gender, ProposalDTO } from '@app/proposal/api';
import {
  Country,
  DocumentType,
  EconomicSector,
  EducationLevel,
  EnterpriseType,
  Locality,
  MaritalStatus,
  MobileProvider,
  Occupation,
  Profession,
  Role,
  State,
  TaxCategory
} from '@app/proposal/api/patch.proposal.req';
import { AddressSelectorComponent } from '@app/shared/ui-components/address-selector/address-selector.component';
import { FormFieldErrorMap } from '@app/shared/ui-components/form-field/form-field-error.model';
import {
  addMapItem,
  removeMapItem
} from '@app/shared/util/functions/map.function';
import { genMoment } from '@app/shared/util/functions/moment.function';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { proposalSelector } from '../../state/proposal.selectors';
import { BlacklistDTO } from '../api/blacklist';
import {
  Address2NormalizerRequest,
  ContactDataForm2PatchCustomer,
  GetProposalRes2ContactDataForm,
  NormalizerResponse2Address,
  SelectedAddress2Address
} from '../mappers/contact-data-form.map';
import {
  GetProposalRes2PersonalDataForm,
  PersonalDataForm2PatchCustomer
} from '../mappers/personal-data-form.map';
import {
  GetProposalRes2ProfessionalDataForm,
  ProfessionalDataForm2PatchCustomer
} from '../mappers/professional-data-form.map';
import { ContactDataForm } from '../models/contact-data-form.model';
import { ChildComponentOutput } from '../models/customer-patch.model';
import { PersonalDataForm } from '../models/personal-data-form.model';
import { ProfessionalDataForm } from '../models/professional-data-form.model';
import { EnriStatusService } from '../services/enri-status.service';
import { BLACKLIST_RES_STATUS } from './../../../constants/blacklist.constants';
import { NORMALIZER_RESULT_CODE } from './../../../constants/normalizer.constants';
import { CUSTOMER_PATCH_RES } from './../../../constants/proposal-patch.constants';
import { VEHICLE_TYPE } from './../../../constants/vehicle.constants';
import {
  createFormFieldError,
  FormFieldError
} from './../../../shared/ui-components/form-field/form-field-error.model';
import { Month } from './../../api/patch.proposal.req';
import { Address } from './../models/contact-data-form.model';
import { AddressNormalizerService } from './../services/address-normalizer.service';
import { getDateFromISO } from '@app/shared/util/functions/iso-date.function';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {
  public title = this.translate.instant('@Owner');
  public formSubmitAttempt: boolean = false;
  public isMarriedWithCoOwner: boolean = null;
  public isPyme: boolean = null;
  public isOwner: boolean = true;
  public depRel: boolean;
  public coOwnerDni: string;
  public coOwnerSpouseDni: string;
  public birthDate: string;
  public cellPhoneIsBlacklisted: boolean = false;
  /* Personal data input and output objects */
  public personalDataInput: PersonalDataForm;
  private personalDataOutput: ChildComponentOutput;
  /* Contact data input and output objects */
  public contactDataInput: ContactDataForm;
  private contactDataOutput: ChildComponentOutput;
  public normalizedAddress: Address;
  /* Professional data input and output objects */
  public professionalDataInput: ProfessionalDataForm;
  private professionalDataOutput: ChildComponentOutput;
  private hasCoOwner: boolean;
  protected ngUnsubscribe: Subject<any> = new Subject();
  protected proposalNumber: number;
  protected customerId: number;

  /* Children */
  @ViewChild('accordion') public accordion: NgbAccordion;

  /* Lists for child components */
  public personalDocumentTypes: Array<DocumentType> = [];
  public genders: Array<Gender> = [];
  public countries: Array<Country> = [];
  public maritalStatusList: Array<MaritalStatus> = [];
  public ivaCategories: Array<TaxCategory> = [];
  public iibbCategories: Array<TaxCategory> = [];
  public workDocumentTypes: Array<DocumentType> = [];
  public states: Array<State>;
  public localities: Array<Locality>;
  public mobileProviders: Array<MobileProvider>;
  public occupations: Array<Occupation>;
  public roles: Array<Role>;
  public professions: Array<Profession>;
  public educationLevels: Array<EducationLevel>;
  public enterpriseTypes: Array<EnterpriseType>;
  public economicSectors: Array<EconomicSector>;
  public afipActivities: Array<AfipActivity>;
  public afipMonths: Array<Month>;
  public afipYears: Array<number>;
  public personalErrors: FormFieldErrorMap = {};
  public professionalErrors: FormFieldErrorMap = {};

  constructor(
    private router: Router,
    private modalService: ModalService,
    private proposalService: ProposalService,
    private domainsService: DomainsService,
    private store: Store<any>,
    public translate: TranslateService,
    private normalize: AddressNormalizerService,
    private enriStatusService: EnriStatusService
  ) {}

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data && data.proposal) {
          const proposal: ProposalDTO = data.proposal;
          const owner: Customer = proposal.owner;
          this.personalDataInput = GetProposalRes2PersonalDataForm(
            proposal,
            'owner'
          );
          this.contactDataInput = GetProposalRes2ContactDataForm(
            proposal,
            'owner'
          );
          this.professionalDataInput = GetProposalRes2ProfessionalDataForm(
            proposal,
            'owner'
          );

          this.depRel = owner.worksInDependencyRelationship;
          this.isMarriedWithCoOwner = owner.isMarriedWithCoOwner;
          this.proposalNumber = proposal.proposalNumber;
          this.customerId = owner.id;
          this.birthDate = getDateFromISO(owner.birthDate);
          this.hasCoOwner = proposal.coOwner ? true : false;
          this.coOwnerDni = proposal.coOwner ? proposal.coOwner.document : null;
          this.coOwnerSpouseDni =
            proposal.coOwner && proposal.coOwner.nonParticipantSpouse
              ? proposal.coOwner.nonParticipantSpouse.document
              : null;
          const vehicle = proposal.vehicle;
          this.checkPyme(
            vehicle.vehicleType.filter,
            !vehicle.fuelYear.zeroKm,
            vehicle.purchaseValue
          );
        }
      });

    // Microservices subscriptions
    this.domainsService.getGender().subscribe(data => {
      this.genders = data;
    });

    this.domainsService
      .getDocumentType(CommonConstants.PERSONAL_DATA)
      .subscribe(data => {
        this.personalDocumentTypes = data;
      });

    this.domainsService
      .getDocumentType(CommonConstants.WORK_DATA)
      .subscribe(data => {
        this.workDocumentTypes = data;
      });

    this.domainsService.getMaritalStatus().subscribe(data => {
      this.maritalStatusList = data;
    });

    this.domainsService.getCountry().subscribe(data => {
      this.countries = data;
    });

    this.domainsService
      .getTaxCategory(CommonConstants.IVA_CAT)
      .subscribe(data => {
        this.ivaCategories = data;
      });

    this.domainsService
      .getTaxCategory(CommonConstants.IIBB_CAT)
      .subscribe(data => {
        this.iibbCategories = data;
      });

    this.domainsService.getState().subscribe(data => {
      this.states = data;
    });

    this.domainsService.getMobileProvider().subscribe(data => {
      this.mobileProviders = data;
    });

    this.domainsService.getOccupation().subscribe(data => {
      this.occupations = data;
    });

    this.domainsService.getAfipActivity().subscribe(data => {
      this.afipActivities = data;
    });

    this.afipYears = this.domainsService.getYearsTo1950();

    this.afipMonths = MONTHS;
  }

  /**
   * Method to check if vehicle is PyME or not
   * @param type Type of vehicle (Auto, Utilitarian or Truck)
   * @param used If the vehicle is used or not
   * @param value The price of the vehicle
   */
  checkPyme(type: string, used: boolean, value: number) {
    if (type === VEHICLE_TYPE.TRUCK.CODE) {
      this.isPyme = true;
    } else if (type === VEHICLE_TYPE.CAR.CODE) {
      this.isPyme = false;
    } else if (type === VEHICLE_TYPE.UTILITARY.CODE) {
      this.domainsService.getCompanySize(used, value, type).subscribe(data => {
        this.isPyme = data.isPyme;
      });
    }
  }

  /**
   * Calls the getLocality service to fetch localities based on the selected province
   * @param stateId Selected province object id
   */
  loadLocalities(stateId: number) {
    this.domainsService.getLocality(stateId).subscribe(data => {
      this.localities = data;
    });
  }

  /**
   * Calls the getRole service to fecth roles based on the selected occupation
   * @param occupationId Selected occupation object id
   */
  loadRoles(occupationId: number) {
    this.domainsService.getRole(occupationId).subscribe(data => {
      this.roles = data;
    });
  }

  /**
   * Calls the getProfession, getEconomicSector and getEnterpriseType services to fecth
   * Professions, Economic Sectors and Enterprise Type based on the selected Role
   * @param roleId Selected role object id
   */
  loadProfessionsEconomicSectorsAndEnterpriseTypes(roleId: number) {
    this.domainsService.getProfession(roleId).subscribe(data => {
      this.professions = data;
    });

    this.domainsService.getEconomicSector(roleId).subscribe(data => {
      this.economicSectors = data;
    });

    this.domainsService.getEnterpriseType(roleId).subscribe(data => {
      this.enterpriseTypes = data;
    });
  }

  /**
   * Gets the education levels from the selected profession
   * @param professionObject Selected profession object
   */
  loadEducationLevels(professionObject: Profession) {
    if (professionObject.educationLevels) {
      this.educationLevels = professionObject.educationLevels;
    } else {
      const p = this.professions.find(e => e.id === professionObject.id);
      this.educationLevels = p.educationLevels;
    }
  }

  /**
   * Method to call service to normalize address and handle its
   * response.
   * @param address Address to be normalized
   */
  normalizeAddress(address: Address) {
    const payload = Address2NormalizerRequest(address);

    this.normalize
      .normalizeAddress(payload)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res.resultCode === NORMALIZER_RESULT_CODE.APPROVED) {
          this.normalizedAddress = NormalizerResponse2Address(res);
        } else if (res.resultCode === NORMALIZER_RESULT_CODE.ERROR) {
          return;
        } else if (res.resultCode === NORMALIZER_RESULT_CODE.REVIEW) {
          const modalRef = this.modalService.openWithComponent(
            AddressSelectorComponent,
            res,
            this.translate.instant('@Address Normalizer'),
            [
              {
                label: this.translate.instant('@Accept'),
                action: () => {},
                type: 'secondary'
              }
            ],
            undefined,
            false
          );

          modalRef.componentInstance.emitAddress.subscribe(outputData => {
            const refinedPayload = Address2NormalizerRequest(
              SelectedAddress2Address(outputData)
            );

            this.normalize
              .normalizeAddress(refinedPayload)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(refinedRes => {
                this.normalizedAddress = NormalizerResponse2Address(refinedRes);
              });
          });
        }
      });
  }

  /**
   * Method to check if cell number is in the blacklist microservice
   * @param phone cel number to validate from contact.component (cellPhoneBlacklistNumber Output)
   */
  checkCellPhoneBlacklist(phone: BlacklistDTO): void {
    if ((phone.prefix + phone.number).length === 10) {
      this.domainsService.getBlacklistCheck(phone).subscribe(
        res => {
          this.cellPhoneIsBlacklisted =
            res.status === BLACKLIST_RES_STATUS.APPROVED ? false : true;
        },
        err => {
          this.cellPhoneIsBlacklisted = false;
        }
      );
    }
  }

  /**
   * Method to execute validations
   * @param data Data from personal data component
   */
  executePersonalDataValidations(data: PersonalDataForm) {
    const ownerDni = data.personalDocumentNumber;
    const ownerSpouseDni =
      data.spouseData && data.spouseData.personalDocumentNumber
        ? data.spouseData.personalDocumentNumber
        : null;
    if (ownerDni && ownerSpouseDni) {
      this.validateSamePerson(
        ownerDni,
        ownerSpouseDni,
        createFormFieldError(
          'El DNI del Titular y su cónyuge no pueden ser iguales',
          1
        ),
        'ownerAndOwnerSpouseDuplicate'
      );
    }
    if (ownerSpouseDni && this.coOwnerDni) {
      this.validateSamePerson(
        ownerSpouseDni,
        this.coOwnerDni,
        createFormFieldError(
          'El DNI del cónyuge del Titular no puede ser igual al del Cotitular',
          2
        ),
        'coOwnerAndOwnerSpouseDuplicate'
      );
    }
    if (ownerSpouseDni && this.coOwnerSpouseDni) {
      this.validateSamePerson(
        ownerSpouseDni,
        this.coOwnerSpouseDni,
        createFormFieldError(
          'El DNI del cónyuge del Titular no puede ser igual al del cónyuge del Cotitular',
          3
        ),
        'ownerSpouseAndCoOwnerSpouseDuplicate'
      );
    }
  }

  /**
   * Method to validate if two dni's are equal
   * @param firstDoc First dni
   * @param secondDoc Second dni
   * @param error FormFieldError
   * @param errorName Name of error
   */
  validateSamePerson(
    firstDoc: string,
    secondDoc: string,
    error: FormFieldError,
    errorName: string
  ) {
    if (firstDoc && secondDoc && error && errorName && firstDoc === secondDoc) {
      this.personalErrors = addMapItem<FormFieldErrorMap, FormFieldError>(
        this.personalErrors,
        errorName,
        error
      );
    } else {
      this.personalErrors = removeMapItem<FormFieldErrorMap>(
        this.personalErrors,
        errorName
      );
    }
  }

  /**
   * Method to execute validations
   * @param data Data from professional data component
   */
  executeProfessionalDataValidations(data: ProfessionalDataForm): void {
    if (!data.afipMonth || !data.afipYear) return;
    const birthDateMoment = genMoment(this.birthDate);
    const currentDate =
      Number(data.afipMonth) < 10
        ? `010${data.afipMonth}${data.afipYear}`
        : `01${data.afipMonth}${data.afipYear}`;
    const currentDateMoment = genMoment(currentDate);
    if (currentDateMoment && currentDateMoment.isBefore(birthDateMoment)) {
      this.professionalErrors = addMapItem<FormFieldErrorMap, FormFieldError>(
        this.professionalErrors,
        'invalidAfipDate',
        createFormFieldError('Fecha inválida', 1)
      );
    } else {
      this.professionalErrors = removeMapItem<FormFieldErrorMap>(
        this.professionalErrors,
        'invalidAfipDate'
      );
    }
  }

  /**
   * Method to load data from child components
   * @param childOutput Data, validity and type of child component
   */
  loadChildComponentData(childOutput: ChildComponentOutput): void {
    if (childOutput.type === 'personal') this.personalDataOutput = childOutput;
    if (childOutput.type === 'contact') this.contactDataOutput = childOutput;
    if (childOutput.type === 'professional')
      this.professionalDataOutput = childOutput;

    if (this.personalDataOutput) {
      this.executePersonalDataValidations(this.personalDataOutput
        .value as PersonalDataForm);
    }
    if (this.professionalDataOutput) {
      this.executeProfessionalDataValidations(this.professionalDataOutput
        .value as ProfessionalDataForm);
    }
  }

  /**
   * Loads all three forms from child components to send to backend
   * @param personalDataOutput Output from Personal Data component
   * @param contactDataOutput Output from Contact Data component
   * @param professionalDataOutput Output from Professional Data component
   */
  createPayload(
    personalDataOutput: ChildComponentOutput,
    contactDataOutput: ChildComponentOutput,
    professionalDataOutput: ChildComponentOutput
  ): Partial<Customer> {
    return {
      ...PersonalDataForm2PatchCustomer(
        personalDataOutput.value as PersonalDataForm,
        'OWNER'
      ),
      ...ContactDataForm2PatchCustomer(
        contactDataOutput.value as ContactDataForm
      ),
      ...ProfessionalDataForm2PatchCustomer(
        professionalDataOutput.value as ProfessionalDataForm
      ),
      owner: true
    };
  }

  /**
   * Method to check validity of proposal regarding PEP status of
   * customer
   * @param customer Customer to validate
   */
  private validatePep(customer: Partial<Customer>): boolean {
    const isValid = customer.pep.type === PEP_TYPE.FOREIGNER ? false : true;
    return isValid;
  }

  /**
   * Method to return Route based on Enri Status Service Response
   * @param res Response from EnriStatusService
   */
  private getRoute(res: string): string {
    if (res === ENRI_STATUS_RES.VALID && this.hasCoOwner) {
      return `proposal/data-register/coowner/${this.proposalNumber}`;
    } else if (res === ENRI_STATUS_RES.VALID && !this.hasCoOwner) {
      return `proposal/data-register/vehicle/${this.proposalNumber}`;
    } else if (res === ENRI_STATUS_RES.EXPIRED) {
      return `proposal/data-register/owner/${this.proposalNumber}/enri`;
    }
  }

  /**
   * Checks validation, submits the form and navigates to appropiate route
   */
  submit() {
    this.formSubmitAttempt = true;
    this.accordion.expandAll();

    if (
      this.personalDataOutput.valid &&
      this.contactDataOutput.valid &&
      this.professionalDataOutput.valid
    ) {
      const customerPatchPayload = this.createPayload(
        this.personalDataOutput,
        this.contactDataOutput,
        this.professionalDataOutput
      );

      const isPepValid = this.validatePep(customerPatchPayload);

      this.proposalService
        .patchCustomer(customerPatchPayload, this.proposalNumber, 'owner')
        .subscribe(data => {
          if (
            data &&
            data.status === CUSTOMER_PATCH_RES.APPROVED &&
            isPepValid
          ) {
            this.enriStatusService
              .getEnriStatus('OWNER', this.customerId)
              .subscribe(res => {
                this.router.navigate([this.getRoute(res.enriStatus)]);
              });
          } else if (
            data &&
            data.status === CUSTOMER_PATCH_RES.REJECTED &&
            !isPepValid
          ) {
            const modalRef = this.modalService.error(
              this.translate.instant(
                '@Regretably we cannot go on with your application. Please go to your nearets car dealership to continue with your application in person'
              ),
              this.translate.instant('@Error'),
              [],
              () => {
                this.router.navigate([`/panel/proposals`]);
              }
            );

            modalRef.componentInstance.modalCloseOutput.subscribe(
              (action: Function) => {
                action();
              }
            );
          }
        });
    } else {
      this.modalService.error(
        this.translate.instant(
          '@Please correct the fields with incorrect and / or incomplete data'
        ),
        this.translate.instant('@Error')
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
