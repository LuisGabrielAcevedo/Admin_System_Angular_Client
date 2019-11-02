import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EconomicSector,
  EnterpriseType,
  Occupation,
  Profession,
  Role
} from '@app/proposal/api/patch.proposal.req';
import {
  BlacklistDTO,
  BlacklistResponse
} from '@app/proposal/data-register/api/blacklist';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  EMPTY_SPACES,
  VEHICLE_TYPE_ORDER
} from '../../common/common-constants';
import { BranchResponse } from '../../proposal/data-register/api/branch';
import { Country } from '../../proposal/data-register/api/country';
import { Locality } from '../../proposal/data-register/api/locality';
import { MaritalStatus } from '../../proposal/data-register/api/maritalStatus';
import { MobileProvider } from '../../proposal/data-register/api/mobileProvider';
import { State } from '../../proposal/data-register/api/state';
import { TaxCategory } from '../../proposal/data-register/api/taxCategory';
import { AfipActivity } from '../api/afipActivity';
import { Brand } from '../api/brand';
import { CompanySize } from '../api/companySize';
import { Gender } from '../api/gender';
import { Model } from '../api/model';
import { ParsedPerson, Person } from '../api/person';
import { VehicleType } from '../api/vehicleType';
import { Year, YearFactory } from '../api/year';
import { BrandAndModel, UseType } from './../../proposal/api/proposal';
import { DocumentType } from './../api/documentType';
import { CouponResponse } from '../api/couponResponse';

@Injectable({ providedIn: 'root' })
export class DomainsService {
  constructor(private http: HttpClient) {}

  public getPerson(doc): Observable<Array<Person>> {
    return this.http
      .get<Array<any>>(
        `${environment.modules.persons}cuit?document-number=${doc}`
      )
      .pipe(
        map(res => {
          return res.map(person => {
            const parsedPerson: Person = {
              number: person.cuitNumber,
              description: person.fullName
            };
            return this.splitFullName(parsedPerson);
          });
        })
      );
  }

  splitFullName(person: Person): ParsedPerson {
    if (
      !person ||
      !EMPTY_SPACES.test(person.description) ||
      person.description.indexOf('NO CLIENTE') > -1
    ) {
      return { ...person, name: '', lastName: '' };
    }

    const namesList: string[] = person.description
      .split(' ')
      .filter(name => name);

    if (namesList.length === 1) {
      const lastName = this.trimName(namesList[0], 20);
      return { ...person, lastName, name: '' };
    }
    const halfList = Math.floor(namesList.length / 2);
    const firstNames = this.trimName(namesList.slice(halfList).join(' '), 40);
    const lastNames = this.trimName(namesList.slice(0, halfList).join(' '), 20);
    return { ...person, name: firstNames, lastName: lastNames };
  }

  trimName(names: string, maxLength: number): string {
    if (names.length <= maxLength) return names;
    return names.slice(0, maxLength).trim();
  }

  public getGender(): Observable<Array<Gender>> {
    return this.http.get<Array<Gender>>(environment.modules.domain + 'gender');
  }

  public getSellingPoints(isBranch = false) {
    let params = new HttpParams();
    if (isBranch) {
      params = params.append('isBankBranch', '' + isBranch);
    }

    return this.http.get<Array<BranchResponse>>(
      environment.modules.domain + 'sellingPoints',
      { params }
    );
  }

  public getDocumentType(typeDoc: string): Observable<Array<DocumentType>> {
    return this.http.get<Array<DocumentType>>(
      environment.modules.domain + 'documentType?typeGroup=' + typeDoc
    );
  }

  public getTaxCategory(taxCat: string): Observable<Array<TaxCategory>> {
    return this.http.get<Array<TaxCategory>>(
      environment.modules.domain + 'taxCategories?category=' + taxCat
    );
  }

  public getMobileProvider(): Observable<Array<MobileProvider>> {
    return this.http.get<Array<MobileProvider>>(
      environment.modules.domain + 'mobile-providers'
    );
  }

  public getCountry(): Observable<Array<Country>> {
    return this.http.get<Array<Country>>(
      environment.modules.domain + 'nationality'
    );
  }

  public getState(): Observable<Array<State>> {
    return this.http.get<Array<State>>(environment.modules.domain + 'states');
  }

  public getLocality(stateId: number): Observable<Array<Locality>> {
    return this.http.get<Array<Locality>>(
      environment.modules.domain + 'naturalness/' + stateId
    );
  }

  public getMaritalStatus(): Observable<Array<MaritalStatus>> {
    return this.http.get<Array<MaritalStatus>>(
      environment.modules.domain + 'maritalStatus'
    );
  }

  public getVehicleType(): Observable<Array<VehicleType>> {
    return this.http
      .get<Array<VehicleType>>(environment.modules.domain + 'vehicle/types')
      .pipe(
        map(res => {
          return res
            .map(type => {
              return {
                ...type,
                sortId: VEHICLE_TYPE_ORDER[type.filter] || 0
              };
            })
            .sort((a, b) => a.sortId - b.sortId);
        })
      );
  }

  public getBrand(vType: string, couponId?: string): Observable<Array<Brand>> {
    const params = couponId
      ? new HttpParams().set('couponId', couponId.toString())
      : {};
    return this.http
      .get<Array<Brand>>(
        environment.modules.domain + 'vehicle/types/' + vType + '/brands',
        { params }
      )
      .pipe(
        map(res => {
          return res.sort(function(a, b) {
            if (a.description > b.description) {
              return 1;
            }
            if (a.description < b.description) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        })
      );
  }

  public getModel(
    vBrandId: number,
    couponId?: string
  ): Observable<Array<Model>> {
    const params = couponId
      ? new HttpParams().set('couponId', couponId.toString())
      : {};
    return this.http
      .get<Array<Model>>(
        environment.modules.domain + 'vehicle/brands/' + vBrandId + '/models',
        { params }
      )
      .pipe(
        map(res => {
          return res.sort(function(a, b) {
            if (a.description > b.description) {
              return 1;
            }
            if (a.description < b.description) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        })
      );
  }

  public getBrandAndModel(
    year: number,
    vType: string,
    zeroKm: boolean,
    value: number
  ): Observable<Array<BrandAndModel>> {
    return this.http.get<Array<BrandAndModel>>(
      `${environment.modules.domain}vehicles?estimatedValue=${value}&type=${vType}&year=${year}&zeroKm=${zeroKm}`
    );
  }

  public getUseTypes(): Observable<Array<UseType>> {
    return this.http.get<Array<UseType>>(
      `${environment.modules.domain}vehicle/use-types`
    );
  }

  public getYearWithModel(vModel: number): Observable<Array<Year>> {
    return this.http
      .get<Array<Year>>(
        `${environment.modules.domain}vehicle/model/${vModel}/fuelYears`
      )
      .pipe(
        map(res => {
          return res.map(type => {
            return YearFactory(type);
          });
        })
      );
  }

  public getYearWithVehicleType(vType: string): Observable<Array<Year>> {
    return this.http
      .get<Array<Year>>(
        `${environment.modules.domain}vehicle/type/${vType}/fuelYears`
      )
      .pipe(
        map(res => {
          return res.map(type => {
            return YearFactory(type);
          });
        })
      );
  }

  public getLastYears(lastYear: number = 10): Array<Year> {
    const start = new Date().getFullYear();
    const years: Array<Year> = [];
    years.push(YearFactory({ year: start, zeroKm: true }));
    years.push(YearFactory({ year: start, zeroKm: false }));
    years.push(YearFactory({ year: start - 1, zeroKm: true }));
    for (let year = 1; year < lastYear; year++) {
      years.push(YearFactory({ year: start - year }));
    }
    return years;
  }

  public getYearsTo1950(): Array<number> {
    const start = new Date().getFullYear();
    const years: Array<number> = [];
    for (let year = start - 1; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  }

  public getMonths(start: number = 1): Array<string> {
    const months: Array<string> = [];
    for (let month = start; month <= 12; month++) {
      months.push(month.toString());
    }
    return months;
  }

  public getCompanySize(
    isUsed: boolean,
    vPrice: number,
    vType: string
  ): Observable<CompanySize> {
    return this.http.get<CompanySize>(
      environment.modules.domain +
        'company-size?isUsed=' +
        isUsed +
        '&vehiclePrice=' +
        vPrice +
        '&vehicleType=' +
        vType
    );
  }

  public getAfipActivity(): Observable<Array<AfipActivity>> {
    return this.http.get<Array<AfipActivity>>(
      environment.modules.domain + 'afip/activities'
    );
  }

  public getOccupation(): Observable<Array<Occupation>> {
    return this.http.get<Array<Occupation>>(
      environment.modules.domain + 'careers/occupation'
    );
  }

  public getRole(occuId: number): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(
      environment.modules.domain + 'careers/function?occupationId=' + occuId
    );
  }

  public getProfession(roleId: number): Observable<Array<Profession>> {
    return this.http.get<Array<Profession>>(
      environment.modules.domain + 'careers/professions?functionId=' + roleId
    );
  }

  public getEnterpriseType(roleId: number): Observable<Array<EnterpriseType>> {
    return this.http.get<Array<EnterpriseType>>(
      environment.modules.domain + 'careers/company-types?functionId=' + roleId
    );
  }

  public getEconomicSector(roleId: number): Observable<Array<EconomicSector>> {
    return this.http.get<Array<EconomicSector>>(
      environment.modules.domain +
        'careers/economic-sectors?functionId=' +
        roleId
    );
  }
  public getBlacklistCheck(phone: BlacklistDTO): Observable<BlacklistResponse> {
    return this.http.post<BlacklistResponse>(
      environment.modules.domain + 'phones/validate',
      phone
    );
  }
  public getCoupon(
    sellingPointCode: string
  ): Observable<Array<CouponResponse>> {
    return this.http.get<Array<CouponResponse>>(
      `${environment.modules.domain}sellingPoint/${sellingPointCode}/coupons`
    );
  }
}
