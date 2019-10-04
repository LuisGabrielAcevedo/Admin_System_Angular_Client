import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

export const vendorHeaders: IDynamicTableHeader[] = [
  {
    label: "Empresa",
    key: "company.name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Nombre",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Email",
    key: "email",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Phone",
    key: "phone",
    component: EDynamicTableComponentType.text
  }
];

export default vendorHeaders;
