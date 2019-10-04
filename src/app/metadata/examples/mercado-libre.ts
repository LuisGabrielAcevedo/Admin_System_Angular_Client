import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "../../modules/shared-modules/table/table.interfaces";

export const mercadoLibreHeaders: IDynamicTableHeader[] = [
  {
    label: "",
    key: "thumbnail",
    component: EDynamicTableComponentType.image
  },
  {
    label: "Id",
    key: "id",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Titulo",
    key: "title",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Precio",
    key: "price/b/$ AR",
    component: EDynamicTableComponentType.text
  }
];
