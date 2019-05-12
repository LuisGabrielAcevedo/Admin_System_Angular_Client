import { Observable } from 'rxjs';

export interface TableHeader {
    label: string;
    value: string;
    type: string;
    sortable?: boolean;
    descending?: boolean;
}

export enum TableContainerComponentType {
    Text = 'TableTextComponent',
    Search = 'TableSearchComponent',
    Button = 'TableButtonComponent',
    Image = 'TableImageComponent',
    Gallery = 'TableGalleryComponent',
    ApplicationType = 'TableApplicationTypeComponent',
    Information = 'TableItemInformationComponent',
    secondTable = 'TableSecondTableComponent'
}

export interface TableContainerComponentData {
    item?: object | object[];
    field?: string | string[];
    button?: TableButtonAction;
    observable?: (...arg: any[]) => Observable<any>;
    galleryConfig?: TableGalleryConfig;
    secondTableConfig?: TableSecondTableConfig;
    cardConfig?: TableCardConfig;
    position?: number;
}

export interface TableGalleryConfig {
    galleryType?: string;
    galleryListData?: string;
    galleryImage?: string;
    galleryTitle?: string;
    gallerySubTitle?: string;
    galleryDescription?: string;
    button?: TableButtonAction;
}

export interface TableCardConfig {
    cardType: string;
    cardImage?: string;
    cardTitle?: string;
    cardSubTitle?: string;
    labels?: string[];
    columnData: string[];
    rowActions?: TableButtonAction[];
}

export interface TableSecondTableConfig {
    rowActions?: TableButtonAction[];
    multiSelect?: boolean;
    secondTableListData?: string;
    fields: Array<{
        label: string;
        value: string;
        type: string;
    }>;
}


export interface TableButtonAction {
    icon?: string;
    class?: string;
    label?: string;
    event?: (...arg: any[]) => void;
    modal?: TableModal;
    type?: string;
    activeComponet?: TableActiveComponent;
    dialog?: TableDialog;
    redirectTo?: string;
    outputItemAction?: string;
    visible?: (...arg: any[]) => boolean;
    disabled?: (...arg: any[]) => boolean;
}

export interface TableModal {
    number: number;
    row: number;
    question?: string;
    successButtonText?: string;
    successButtonDisabled?: (...arg: any[]) => boolean;
    successButtonClass?: string;
    successButtonEvent?: string;
    cancelButtonText?: string;
    cancelButtonEvent?: string;
    cancelButtonClass?: string;
    buttonsClass?: string;
    buttons?: TableButtonAction[];
}

export interface TableDialog {
    component: any;
    width?: string;
    height?: string;
    data: TableContainerComponentData;
}

export interface TableActiveComponent {
    type: string;
    row: number;
    data?: TableContainerComponentData;
}

export interface TableOutputItemData {
    action: string;
    item: any;
}

export interface TableButtonOuputAction {
    modal: TableModal;
    position: number;
}

export interface ActiveComponentOutputAction {
    activeComponent: TableActiveComponent;
    position: number;
}

export interface TablePagination {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

export const TablePaginationDefault: TablePagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5
};

