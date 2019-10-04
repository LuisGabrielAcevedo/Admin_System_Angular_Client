import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const productHeaders: IDynamicTableHeader[] = [
  {
    label: "Nombre",
    key: "name",
    component: EDynamicTableComponentType.text,
    sortable: "name"
  },
  {
    label: "Empresa",
    key: "company.name",
    component: EDynamicTableComponentType.text,
    sortable: "company"
  },
  {
    label: "Price",
    key: "basePrice/a/$",
    component: EDynamicTableComponentType.text,
    sortable: "basePrice"
  }
];

export default productHeaders;
