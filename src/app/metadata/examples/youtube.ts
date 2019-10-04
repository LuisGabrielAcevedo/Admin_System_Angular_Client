import {
  IDynamicTableHeader,
  EDynamicTableComponentType
} from "../../modules/shared-modules/table/table.interfaces";
export const youtubeHeaders: IDynamicTableHeader[] = [
  {
    label: "Canal",
    key: "snippet.channelTitle",
    component: EDynamicTableComponentType.text
  },
  {
    label: "Titulo",
    key: "snippet.title",
    component: EDynamicTableComponentType.text
  },
  {
    label: "",
    key: "snippet.thumbnails.default.url",
    component: EDynamicTableComponentType.image
  }
];
