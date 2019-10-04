import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "src/app/modules/shared-modules/table/table.interfaces";

const userHeaders: IDynamicTableHeader[] = [
  {
    label: "",
    key: "profileImage.url",
    component: EDynamicTableComponentType.image
  },
  {
    label: "Empresa",
    key: "company.name",
    component: EDynamicTableComponentType.text,
    sortable: "company"
  },
  {
    label: "Nombre",
    key: "firstName,lastName",
    component: EDynamicTableComponentType.text,
    sortable: "firstName"
  }
];

export default userHeaders;
