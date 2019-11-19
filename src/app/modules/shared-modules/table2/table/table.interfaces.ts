export interface ITableHeader {
  label: string;
  key: string;
  component: ETableComponents;
  sortable?: boolean;
  visibleOnMobile?: boolean;
  width?: string;
}

export interface ITableItem {
  [key: string]: any;
}

export enum ETableComponents {
  text = 'TextComponent',
  date = 'DateComponent',
  status = 'StatusComponent',
  dni = 'DniComponent',
  currency = 'CurrencyComponent'
}

export enum ESortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface ITableSort {
  prop: string;
  dir: ESortDirection;
}

export interface ITableAction {
  icon?: string;
  label?: string;
  clickEvent?: (arg: ITableItem) => void;
}

export interface ITablePagintation {
  page: number;
  perPage: number;
  total: number;
  pages?: number;
  limit1?: number;
  limit2?: number;
  tmpPages?: number[];
}

export interface ITableChanges {
  pagination?: ITablePagintation;
  sort?: ITableSort;
}
