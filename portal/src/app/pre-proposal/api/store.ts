export interface Store {
  integrationCode: string;
  idSellingPoint: number;
  name: string;
}

export const StoreFactory = (param: any = {}): Store => {
  const newStore = {
    integrationCode: '504',
    idSellingPoint: 504,
    name: ''
  };

  const result = { ...newStore, ...param } as Store;

  return result;
};
