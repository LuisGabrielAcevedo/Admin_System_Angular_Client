import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAdmin from './admin/admin.reducers';
import * as fromAdminSystem from './adminSystem/adminSystem.reducers';
import * as fromApplication from './application/application.reducers';
import * as fromCountry from './country/country.reducers';
import * as fromCustomer from './customer/customer.reducers';
import * as fromCompany from './company/company.reducers';
import * as fromLicense from './license/license.reducers';
import * as fromLocal from './local/local.reducers';
import * as fromUser from './user/user.reducers';
import * as fromRole from './role/role.reducers';
import * as fromPermission from './permission/permission.reducers';
import * as fromSnackbar from './snackbar/snackbar.reducers';
import * as fromBrand from './brand/brand.reducers';
import * as fromProductCategory from './productCategory/productCategory.reducers';
import * as fromProductType from './productType/productType.reducers';
import * as fromProduct from './product/product.reducers';
import * as fromVendor from './vendor/vendor.reducers';


export interface State {
    admin: fromAdmin.AdminState;
    adminSystem: fromAdminSystem.AdminSystemState;
    application: fromApplication.ApplicationState;
    country: fromCountry.CountryState;
    customer: fromCustomer.CustomerState;
    company: fromCompany.CompanyState;
    license: fromLicense.LicenseState;
    local: fromLocal.LocalState;
    user: fromUser.UserState;
    role: fromRole.RoleState;
    permission: fromPermission.PermissionState;
    snackbar: fromSnackbar.SnackbarState;
    brand: fromBrand.BrandState;
    productCategory: fromProductCategory.ProductCategoryState;
    productType: fromProductType.ProductTypeState;
    product: fromProduct.ProductState;
    vendor: fromVendor.VendorState;

}

export const reducers: ActionReducerMap<State> = {
    admin: fromAdmin.AdminReducer,
    adminSystem: fromAdminSystem.AdminSystemReducer,
    application: fromApplication.ApplicationReducer,
    country: fromCountry.CountryReducer,
    company: fromCompany.CompanyReducer,
    customer: fromCustomer.CustomerReducer,
    license: fromLicense.LicenseReducer,
    local: fromLocal.LocalReducer,
    user: fromUser.UserReducer,
    role: fromRole.RoleReducer,
    permission: fromPermission.PermissionReducer,
    snackbar: fromSnackbar.SnackbarReducer,
    brand: fromBrand.BrandReducer,
    productCategory: fromProductCategory.ProductCategoryReducer,
    productType: fromProductType.ProductTypeReducer,
    product: fromProduct.ProductReducer,
    vendor: fromVendor.VendorReducer
};

export const getUserState = (state: State) => state.user;
export const getAdminState = (state: State) => state.admin;
export const getAdminSystemState = (state: State) => state.adminSystem;
export const getApplicationState = (state: State) => state.application;
export const getCountryState = (state: State) => state.country;
export const getCompanyState = (state: State) => state.company;
export const getLicenseState = (state: State) => state.license;
export const getLocalState = (state: State) => state.local;
export const getCustomerState = (state: State) => state.customer;
export const getRoleState = (state: State) => state.role;
export const getPermissionState = (state: State) => state.permission;
export const getSnackbarState = (state: State) => state.snackbar;
export const getBrandState = (state: State) => state.brand;
export const getProductCategoryState = (state: State) => state.productCategory;
export const getProductTypeState = (state: State) => state.productType;
export const getProductState = (state: State) => state.product;
export const getVendorState = (state: State) => state.vendor;

// User selectors
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUsersList = createSelector(getUserState, fromUser.getUsersList);
export const getIsLoadingUsers = createSelector(getUserState, fromUser.getIsLoadingUsers);
export const getIsLoadingUser = createSelector(getUserState, fromUser.getIsLoadingUser);
export const getPaginationUser = createSelector(getUserState, fromUser.getPagination);

// Admin selectors
export const getAdmins = createSelector(getAdminState, fromAdmin.getAdmins);
export const getIsLoadingAdmins = createSelector(getAdminState, fromAdmin.getIsLoadingAdmins);
export const getIsLoadingAdmin = createSelector(getAdminState, fromAdmin.getIsLoadingAdmin);
export const getPaginationAdmin = createSelector(getAdminState, fromAdmin.getPagination);

// Admin system selectors
export const getApiProductTypes = createSelector(getAdminSystemState, fromAdminSystem.getApiProductTypes);
export const getUnits = createSelector(getAdminSystemState, fromAdminSystem.getUnits);
export const getCoins = createSelector(getAdminSystemState, fromAdminSystem.getCoins);
export const getIsLoadingAdminSystem = createSelector(getAdminSystemState, fromAdminSystem.getLoadingAdminSystem);

// Application selectors
export const getApplications = createSelector(getApplicationState, fromApplication.getApplications);
export const getApplicationsList = createSelector(getApplicationState, fromApplication.getApplicationsList);
export const getIsLoadingApplications = createSelector(getApplicationState, fromApplication.getIsLoadingApplications);
export const getIsLoadingApplication = createSelector(getApplicationState, fromApplication.getIsLoadingApplication);
export const getPaginationApplication = createSelector(getApplicationState, fromApplication.getPagination);

// Country selectors
export const getCountries = createSelector(getCountryState, fromCountry.getCountries);
export const getCountriesList = createSelector(getCountryState, fromCountry.getCountriesList);
export const getIsLoadingCountries = createSelector(getCountryState, fromCountry.getIsLoadingCountries);
export const getIsLoadingCountry = createSelector(getCountryState, fromCountry.getIsLoadingCountry);
export const getPaginationCountry = createSelector(getCountryState, fromCountry.getPagination);

// Company selectors
export const getCompanies = createSelector(getCompanyState, fromCompany.getCompanies);
export const getCompaniesList = createSelector(getCompanyState, fromCompany.getCompaniesList);
export const getIsLoadingCompanies = createSelector(getCompanyState, fromCompany.getIsLoadingCompanies);
export const getIsLoadingCompany = createSelector(getCompanyState, fromCompany.getIsLoadingCompany);
export const getPaginationCompany = createSelector(getCompanyState, fromCompany.getPagination);

// License selectors
export const getLicenses = createSelector(getLicenseState, fromLicense.getLicenses);
export const getIsLoadingLicenses = createSelector(getLicenseState, fromLicense.getIsLoadingLicenses);
export const getIsLoadingLicense = createSelector(getLicenseState, fromLicense.getIsLoadingLicense);
export const getPaginationLicense = createSelector(getLicenseState, fromLicense.getPagination);

// Customer selectors
export const getCustomers = createSelector(getCustomerState, fromCustomer.getCustomers);
export const getIsLoadingCustomers = createSelector(getCustomerState, fromCustomer.getIsLoadingCustomers);
export const getIsLoadingCustomer = createSelector(getCustomerState, fromCustomer.getIsLoadingCustomer);
export const getPaginationCustomer = createSelector(getCustomerState, fromCustomer.getPagination);

// Local selectors
export const getLocals = createSelector(getLocalState, fromLocal.getLocals);
export const getIsLoadingLocals = createSelector(getLocalState, fromLocal.getIsLoadingLocals);
export const getIsLoadingLocal = createSelector(getLocalState, fromLocal.getIsLoadingLocal);
export const getPaginationLocal = createSelector(getLocalState, fromLocal.getPagination);
export const getLocalsList = createSelector(getLocalState, fromLocal.getLocalsList);


// Role selectors
export const getRoles = createSelector(getRoleState, fromRole.getRoles);
export const getRolesList = createSelector(getRoleState, fromRole.getRolesList);
export const getIsLoadingRoles = createSelector(getRoleState, fromRole.getIsLoadingRoles);
export const getIsLoadingRole = createSelector(getRoleState, fromRole.getIsLoadingRole);
export const getPaginationRole = createSelector(getRoleState, fromRole.getPagination);

// Permission selectors
export const getPermissions = createSelector(getPermissionState, fromPermission.getPermissions);
export const getPermissionsList = createSelector(getPermissionState, fromPermission.getPermissionsList);
export const getIsLoadingPermissions = createSelector(getPermissionState, fromPermission.getIsLoadingPermissions);
export const getIsLoadingPermission = createSelector(getPermissionState, fromPermission.getIsLoadingPermission);
export const getPaginationPermission = createSelector(getPermissionState, fromPermission.getPagination);

// Snackbar selectors
export const getNewMessage = createSelector(getSnackbarState, fromSnackbar.getNewMessage);

// Brands selectors
export const getBrands = createSelector(getBrandState, fromBrand.getBrands);
export const getBrandsList = createSelector(getBrandState, fromBrand.getBrandsList);
export const getIsLoadingBrands = createSelector(getBrandState, fromBrand.getIsLoadingBrands);
export const getIsLoadingBrand = createSelector(getBrandState, fromBrand.getIsLoadingBrand);
export const getPaginationBrand = createSelector(getBrandState, fromBrand.getPagination);

// Product Category selectors
export const getProductCategories = createSelector(getProductCategoryState, fromProductCategory.getProductCategories);
export const getProductCategoriesList = createSelector(getProductCategoryState, fromProductCategory.getProductCategoriesList);
export const getIsLoadingProductCategories = createSelector(getProductCategoryState, fromProductCategory.getIsLoadingProductCategories);
export const getIsLoadingProductCategory = createSelector(getProductCategoryState, fromProductCategory.getIsLoadingProductCategory);
export const getPaginationProductCategory = createSelector(getProductCategoryState, fromProductCategory.getPagination);

// Product Types selectors
export const getProductTypes = createSelector(getProductTypeState, fromProductType.getProductTypes);
export const getProductTypesList = createSelector(getProductTypeState, fromProductType.getProductTypesList);
export const getIsLoadingProductTypes = createSelector(getProductTypeState, fromProductType.getIsLoadingProductTypes);
export const getIsLoadingProductType = createSelector(getProductTypeState, fromProductType.getIsLoadingProductType);
export const getPaginationProductType = createSelector(getProductTypeState, fromProductType.getPagination);

// Product selectors
export const getProducts = createSelector(getProductState, fromProduct.getProducts);
export const getProductsList = createSelector(getProductState, fromProduct.getProductsList);
export const getIsLoadingProducts = createSelector(getProductState, fromProduct.getIsLoadingProducts);
export const getIsLoadingProduct = createSelector(getProductState, fromProduct.getIsLoadingProduct);
export const getPaginationProduct = createSelector(getProductState, fromProduct.getPagination);

// Vendor selectors
export const getVendors = createSelector(getVendorState, fromVendor.getVendors);
export const getVendorsList = createSelector(getVendorState, fromVendor.getVendorsList);
export const getIsLoadingVendors = createSelector(getVendorState, fromVendor.getIsLoadingVendors);
export const getIsLoadingVendor = createSelector(getVendorState, fromVendor.getIsLoadingVendor);
export const getPaginationVendor = createSelector(getVendorState, fromVendor.getPagination);

