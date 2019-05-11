import { TableHeader } from '../components/sharedComponents/table/table.interfaces';
export const MercadoLibreHeader: TableHeader[] = [
  {
    label: '',
    value: 'thumbnail',
    type: 'TableImageComponent'
  },
  {
    label: 'Id',
    value: 'id',
    type: 'TableTextComponent'
  },
  {
    label: 'Titulo',
    value: 'title',
    type: 'TableTextComponent'
  },
  {
    label: 'Precio',
    value: 'price/b/$ AR',
    type: 'TableTextComponent'
  },
  {
    label: 'Barrio',
    value: 'seller_address.city.name',
    type: 'TableTextComponent'
  }
];
