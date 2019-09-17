export interface ISidebarItem {
    name: string;
    icon?: string;
    route?: string;
    subItems?: ISidebarItem[];
}
