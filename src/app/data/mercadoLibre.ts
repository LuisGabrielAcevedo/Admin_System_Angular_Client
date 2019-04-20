import { TableHeader } from '../components/sharedComponents/table/table.interfaces';
export const MercadoLibreHeader: TableHeader[] = [
  {
    label: '',
    value: 'thumbnail',
    type: 'TableImageComponent',
    class: 'table_long'
  },
  {
    label: 'Id',
    value: 'id',
    type: 'TableTextComponent',
    class: 'table_long'
  },
  {
    label: 'Titulo',
    value: 'title',
    type: 'TableTextComponent',
    class: 'table_long'
  },
  {
    label: 'Precio',
    value: 'price/b/$ AR',
    type: 'TableTextComponent',
    class: 'table_long'
  },
  {
    label: 'Barrio',
    value: 'seller_address.city.name',
    type: 'TableTextComponent',
    class: 'table_long'
  }
];
