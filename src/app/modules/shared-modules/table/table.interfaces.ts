import { Observable } from "rxjs";

export interface IDynamicTableHeader {
  label: string;
  key: string;
  component: EDynamicTableComponentType;
  sortable?: string;
}

export enum EDynamicTableComponentType {
  text = "TableTextComponent",
  search = "TableSearchComponent",
  button = "TableButtonComponent",
  image = "TableImageComponent",
  gallery = "TableGalleryComponent",
  applicationType = "TableApplicationTypeComponent",
  information = "TableItemInformationComponent",
  secondTable = "TableSecondTableComponent"
}

export interface IDynamicTableItem {
  [key: string]: any;
}

export interface IDynamicTableContainerComponentData {
  item?: object | object[];
  field?: string | string[];
  button?: IDynamicTableButton;
  observable?: (...arg: any[]) => Observable<any>;
  galleryConfig?: IDynamicTableGalleryConfig;
  secondTableConfig?: IDynamicTableSecondTableConfig;
  cardConfig?: IDynamicTableCardConfig;
  position?: number;
}

export interface IDynamicTableGalleryConfig {
  galleryType?: string;
  galleryListData?: string;
  galleryImage?: string;
  galleryTitle?: string;
  gallerySubTitle?: string;
  galleryDescription?: string;
  button?: IDynamicTableButton;
}

export interface IDynamicTableCardConfig {
  cardType: string;
  cardImage?: string;
  cardTitle?: string;
  cardSubTitle?: string;
  labels?: string[];
  columnData: string[];
  rowActions?: IDynamicTableButton[];
}

export interface IDynamicTableSecondTableConfig {
  rowActions?: IDynamicTableButton[];
  multiSelect?: boolean;
  secondTableListData?: string;
  fields: Array<{
    label: string;
    value: string;
    type: string;
  }>;
}

export interface IDynamicTableButton {
  icon?: string;
  class?: string;
  label?: string;
  event?: (...arg: any[]) => void;
  modal?: IDynamicTableModal;
  type?: string;
  activeComponet?: ITableActiveComponent;
  dialog?: ITableDialog;
  redirectTo?: string;
  outputItemAction?: string;
  visible?: (...arg: any[]) => boolean;
  disabled?: (...arg: any[]) => boolean;
}

export interface IDynamicTableModal {
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
  buttons?: IDynamicTableButton[];
}

export interface ITableDialog {
  component: any;
  width?: string;
  height?: string;
  data: IDynamicTableContainerComponentData;
}

export interface ITableActiveComponent {
  type: string;
  row: number;
  data?: IDynamicTableContainerComponentData;
}

export interface IDynamicTableActiveModalAction {
  modal: IDynamicTableModal;
  position: number;
}

export interface DynamicITableActiveComponentAction {
  activeComponent: ITableActiveComponent;
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
