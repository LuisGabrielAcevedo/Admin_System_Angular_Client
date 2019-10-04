import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";
export const companyHeaders: IDynamicTableHeader[] = [
  {
    label: "",
    key: "profileImage.url",
    component: EDynamicTableComponentType.image
  },
  {
    label: "Nombre",
    key: "name",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Pais",
    key: "country.name",
    component: EDynamicTableComponentType.text
  }
];

export default companyHeaders;
