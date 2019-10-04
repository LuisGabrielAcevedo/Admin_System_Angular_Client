import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const customerHeaders: IDynamicTableHeader[] = [
  {
    label: "Nombre completo",
    key: "firstName,lastName",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Email",
    key: "email",
    component: EDynamicTableComponentType.text
  }
];

export default customerHeaders;
