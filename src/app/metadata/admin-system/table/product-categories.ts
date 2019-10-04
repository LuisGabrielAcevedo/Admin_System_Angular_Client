import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

export const productcomponentHeaders: IDynamicTableHeader[] = [
  {
    label: "Empresa",
    key: "company.name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Nombre",
    key: "name",
    component: EDynamicTableComponentType.text
  }
];

export default productcomponentHeaders;
