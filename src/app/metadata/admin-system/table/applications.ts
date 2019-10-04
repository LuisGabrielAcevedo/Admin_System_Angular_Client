import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

export const applicationHeaders: IDynamicTableHeader[] = [
  {
    label: "Code",
    key: "code",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Name",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Descripcion",
    key: "description",
    component: EDynamicTableComponentType.text
  }
];

export default applicationHeaders;
