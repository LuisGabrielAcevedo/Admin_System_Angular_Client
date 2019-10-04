import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const stateHeaders: IDynamicTableHeader[] = [
  {
    label: "Name",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Country",
    key: "country.name",
    component: EDynamicTableComponentType.text
  }
];

export default stateHeaders;
