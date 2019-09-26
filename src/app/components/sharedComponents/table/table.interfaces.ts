import { Observable } from "rxjs";

export interface DynamicTableHeader {
  label: string;
  key: string;
  component: DynamicTableComponentType;
  sortable?: string;
}

export enum DynamicTableComponentType {
  text = "TableTextComponent",
  search = "TableSearchComponent",
  button = "TableButtonComponent",
  image = "TableImageComponent",
  gallery = "TableGalleryComponent",
  applicationType = "TableApplicationTypeComponent",
  information = "TableItemInformationComponent",
  secondTable = "TableSecondTableComponent"
}

export interface DynamicTableItem {
  [key: string]: any;
}

export interface DynamicTableContainerComponentData {
  item?: object | object[];
  field?: string | string[];
  button?: DynamicTableButtonAction;
  observable?: (...arg: any[]) => Observable<any>;
  galleryConfig?: DynamicTableGalleryConfig;
  secondTableConfig?: DynamicTableSecondTableConfig;
  cardConfig?: DynamicTableCardConfig;
  position?: number;
}

export interface DynamicTableGalleryConfig {
  galleryType?: string;
  galleryListData?: string;
  galleryImage?: string;
  galleryTitle?: string;
  gallerySubTitle?: string;
  galleryDescription?: string;
  button?: DynamicTableButtonAction;
}

export interface DynamicTableCardConfig {
  cardType: string;
  cardImage?: string;
  cardTitle?: string;
  cardSubTitle?: string;
  labels?: string[];
  columnData: string[];
  rowActions?: DynamicTableButtonAction[];
}

export interface DynamicTableSecondTableConfig {
  rowActions?: DynamicTableButtonAction[];
  multiSelect?: boolean;
  secondTableListData?: string;
  fields: Array<{
    label: string;
    value: string;
    type: string;
  }>;
}

export interface DynamicTableButtonAction {
  icon?: string;
  class?: string;
  label?: string;
  event?: (...arg: any[]) => void;
  modal?: DynamicTableModal;
  type?: string;
  activeComponet?: TableActiveComponent;
  dialog?: TableDialog;
  redirectTo?: string;
  outputItemAction?: string;
  visible?: (...arg: any[]) => boolean;
  disabled?: (...arg: any[]) => boolean;
}

export interface DynamicTableModal {
  number: number;
  row: number;
  question?: string;
  successButtonText?: string;
  successButtonDisabled?: (...arg: any[]) => boolean;
  successButtonClass?: string;
  successButtonEvent?: (...arg: any[]) => Observable<any>;
  cancelButtonText?: string;
  cancelButtonEvent?: string;
  cancelButtonClass?: string;
  buttonsClass?: string;
  buttons?: DynamicTableButtonAction[];
}

export interface TableDialog {
  component: any;
  width?: string;
  height?: string;
  data: DynamicTableContainerComponentData;
}

export interface TableActiveComponent {
  type: string;
  row: number;
  data?: DynamicTableContainerComponentData;
}

export interface DynamicTableActiveModalAction {
  modal: DynamicTableModal;
  position: number;
}

export interface DynamicTableActiveComponentAction {
  activeComponent: TableActiveComponent;
  position: number;
}

export interface DynamicTablePagination {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export const DynamicTablePaginationDefault: DynamicTablePagination = {
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 5
};

export interface DynamicTableChanges {
  sort?: string;
  sortDirection?: string;
  pagination?: DynamicTablePagination;
}
