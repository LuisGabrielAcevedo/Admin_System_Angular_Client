import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";
import Company from "src/app/models/admin-system/companies";
import { map } from "rxjs/operators";
import ProductCategory from "src/app/models/admin-system/product-categories";
import ProductType from "src/app/models/admin-system/product-types";
import Brand from "src/app/models/admin-system/brands";
import Vendor from "src/app/models/admin-system/vendors";
import AdminSystem from "src/app/models/admin-system/admin-system";
import { ProductCharacteristicsComponent } from "src/app/modules/admin-system/inventory/product-characteristics/product-characteristics.component";
import Store from "src/app/models/admin-system/stores";
import { ProductPricesComponent } from "src/app/modules/admin-system/inventory/product-prices/product-prices.component";

const productFields: IDynamicFormField[] = [
  {
    name: "Company",
    key: "company",
    component: EDynamicFormFieldTypes.asyncAutocomplete,
    mainGroup: "Company",
    flexConfig: {
      row: 1,
      flex: 100
    },
    validators: [DynamicFormValidators.required()],
    options: {
      placeholder: "Select a company",
      disableCondition: arg => arg._id,
      fieldOptions: arg =>
        Company.option("search", arg)
          .option("populate", "application")
          .findRx()
          .pipe(map(resp => resp.data)),
      associationText: "name",
      associationValue: "_id"
    }
  },
  {
    name: "Store",
    key: "stores",
    component: EDynamicFormFieldTypes.select,
    mainGroup: "Company",
    flexConfig: {
      row: 2,
      flex: 100
    },
    options: {
      placeholder: "Select the stores",
      fieldOptions: arg => {
        return arg
          ? Store.filter("company", arg)
              .findRx()
              .pipe(map(resp => resp.data))
          : Store.findRx().pipe(map(resp => resp.data));
      },
      associationText: "name",
      associationValue: "_id",
      depend: "company",
      multiple: true
    }
  },
  {
    name: "Name",
    key: "name",
    component: EDynamicFormFieldTypes.textField,
    mainGroup: "Product info",
    flexConfig: {
      row: 1,
      flex: 100
    },
    validators: [DynamicFormValidators.required()]
  },
  {
    name: "Unit",
    key: "unit",
    component: EDynamicFormFieldTypes.enum,
    mainGroup: "Product info",
    flexConfig: {
      row: 2,
      flex: 25
    },
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () =>
        AdminSystem.urlParam("units")
          .findRx()
          .pipe(
            map(resp =>
              resp.data.map(item => {
                return {
                  text: item.name,
                  value: item.id
                };
              })
            )
          )
    }
  },
  {
    name: "Price",
    key: "basePrice",
    component: EDynamicFormFieldTypes.numericField,
    mainGroup: "Product info",
    flexConfig: {
      row: 2,
      flex: 25
    }
  },
  {
    name: "Require inventory",
    key: "requireInventory",
    component: EDynamicFormFieldTypes.switch,
    mainGroup: "Product info",
    flexConfig: {
      row: 2,
      flex: 25
    }
  },
  {
    name: "Require inventory by boxes",
    key: "requireInventoryByBoxes",
    component: EDynamicFormFieldTypes.switch,
    mainGroup: "Product info",
    flexConfig: {
      row: 2,
      flex: 25
    },
    options: {
      visibleCondition: arg => arg.requireInventory
    }
  },
  {
    name: "Active product",
    key: "isActive",
    component: EDynamicFormFieldTypes.switch,
    defaultValue: true,
    mainGroup: "Product info",
    flexConfig: {
      row: 3,
      flex: 25
    }
  },
  {
    name: "Online sale",
    key: "isOnlineSale",
    component: EDynamicFormFieldTypes.switch,
    mainGroup: "Product info",
    flexConfig: {
      row: 3,
      flex: 25
    }
  },
  {
    name: "Description",
    key: "description",
    component: EDynamicFormFieldTypes.textarea,
    mainGroup: "Product info",
    flexConfig: {
      row: 4,
      flex: 100
    }
  },
  {
    name: "Details",
    key: "details",
    component: EDynamicFormFieldTypes.textarea,
    mainGroup: "Product info",
    flexConfig: {
      row: 5,
      flex: 100
    }
  },
  {
    name: "Category",
    key: "category",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Product info",
    options: {
      fieldOptions: arg =>
        ProductCategory.filter("company", arg)
          .findRx()
          .pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name",
      depend: "company"
    },
    flexConfig: {
      row: 6,
      flex: 50
    }
  },
  {
    name: "Type",
    key: "type",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Product info",
    options: {
      fieldOptions: arg =>
        ProductType.filter("company", arg)
          .findRx()
          .pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name",
      depend: "company"
    },
    flexConfig: {
      row: 6,
      flex: 50
    }
  },
  {
    name: "Brand",
    key: "brand",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Product info",
    options: {
      fieldOptions: arg =>
        Brand.filter("company", arg)
          .findRx()
          .pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name",
      depend: "company"
    },
    flexConfig: {
      row: 7,
      flex: 50
    }
  },
  {
    name: "Vendor",
    key: "vendor",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Product info",
    options: {
      fieldOptions: arg =>
        Vendor.filter("company", arg)
          .findRx()
          .pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name",
      depend: "company"
    },
    flexConfig: {
      row: 7,
      flex: 50
    }
  },
  {
    name: null,
    key: null,
    dynamicComponent: ProductCharacteristicsComponent,
    mainGroup: "Characteristics"
  },
  {
    name: null,
    key: null,
    dynamicComponent: ProductPricesComponent,
    mainGroup: "Prices"
  }
];

export default productFields;
