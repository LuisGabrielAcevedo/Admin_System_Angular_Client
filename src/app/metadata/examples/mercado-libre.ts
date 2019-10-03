import {
  DynamicTableHeader,
  DynamicTableComponentType
} from "../../modules/shared-modules/table/table.interfaces";

export const mercadoLibreHeaders: DynamicTableHeader[] = [
  {
    label: "",
    key: "thumbnail",
    component: DynamicTableComponentType.image
  },
  {
    label: "Id",
    key: "id",
    component: DynamicTableComponentType.text
  },
  {
    label: "Titulo",
    key: "title",
    component: DynamicTableComponentType.text
  },
  {
    label: "Precio",
    key: "price/b/$ AR",
    component: DynamicTableComponentType.text
  }
];
