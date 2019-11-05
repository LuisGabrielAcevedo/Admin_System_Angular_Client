import get from "lodash/get";
import { IDynamicTableItem } from "../table.interfaces";
export type TGetValueFn = (item: IDynamicTableItem, key: string) => any;

const getValueFn: TGetValueFn = (item, key) => get(item, key, null);

export default getValueFn;
