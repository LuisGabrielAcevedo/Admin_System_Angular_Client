import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const countryHeaders: IDynamicTableHeader[] = [
  {
    label: "Pais",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Lenguaje",
    key: "language",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Moneda",
    key: "currency",
    component: EDynamicTableComponentType.text
  }
];

export default countryHeaders;
