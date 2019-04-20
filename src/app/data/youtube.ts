import { TableHeader } from '../components/sharedComponents/table/table.interfaces';
export const YoutubeHeader: TableHeader[] = [
    {
        label: 'Canal',
        value: 'snippet.channelTitle',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Titulo',
        value: 'snippet.title',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: '',
        value: 'snippet.thumbnails.default.url',
        type: 'TableImageComponent',
        class: 'table_long'
    }
];
