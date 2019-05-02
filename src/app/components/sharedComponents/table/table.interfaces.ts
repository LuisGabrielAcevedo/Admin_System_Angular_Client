import { EventEmitter } from '@angular/core';

export interface TableHeader {
    label: string;
    value: string;
    type: string;
    class: string;
    sortable?: boolean;
    descending?: boolean;
}

export interface TableMobileHeader {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    rightText: string;
}

export enum TableContainerComponentType {
    Text = 'TableTextComponent',
    Search = 'TableSearchComponent',
    Button = 'TableButtonComponent',
    Image = 'TableImageComponent',
    Gallery = 'TableGalleryComponent',
    Information = 'TableItemInformationComponent'
}

export interface TableContainerComponentData {
    inputData?: {
        item?: object;
        field?: string;
        button?: TableButtonAction;
        position?: number;
    };
}


export interface TableButtonAction {
    icon: string;
    class?: string;
    label?: string;
    event?: (...arg: any[]) => void;
    modal?: TableModal;
    type?: string;
    activeComponet?: ActiveComponentData;
    redirectTo?: string;
    outputItemAction?: string;
}

export interface TableOutputItemData {
    action: string;
    item: any;
}

export interface ActiveComponentData {
    type: string;
    value?: string | string[];
    event?: (...arg: any[]) => void;
    inputData?: TableContainerComponentData;
}

export interface TableButtonOuputAction {
    modal: TableModal;
    position: number;
}

export interface ActiveComponentOutputAction {
    data: ActiveComponentData;
    position: number;
}

export interface TableModal {
    number: number;
    row: number;
    question?: string;
    successButtonText?: string;
    successButtonClass?: string;
    successButtonEvent?: string;
    cancelButtonText?: string;
    cancelButtonEvent?: string;
    cancelButtonClass?: string;
    buttonsClass?: string;
    buttons?: TableButtonAction[];
}

export interface TableDataFormated {
    button?: TableButtonAction;
    rowClass: string;
    type: string;
    value: string;
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

export const TableMobileDataDefault: TableMobileHeader = {
    image: '',
    title: '',
    subtitle: '',
    description: '',
    rightText: ''
}

