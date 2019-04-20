export interface ISidebarItem {
    name: string;
    subItems?: ISidebarSubItem[];
}

export interface ISidebarSubItem {
    name: string;
    route?: string;
}
