import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const storeHeaders: IDynamicTableHeader[] = [
  {
    label: "Nombre",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Empresa",
    key: "company.name",
    component: EDynamicTableComponentType.text
  }
];

export default storeHeaders;
