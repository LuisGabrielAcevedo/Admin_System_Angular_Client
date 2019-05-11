import { TableHeader } from '../components/sharedComponents/table/table.interfaces';
export const YoutubeHeader: TableHeader[] = [
    {
        label: 'Canal',
        value: 'snippet.channelTitle',
        type: 'TableTextComponent'
    },
    {
        label: 'Titulo',
        value: 'snippet.title',
        type: 'TableTextComponent'
    },
    {
        label: '',
        value: 'snippet.thumbnails.default.url',
        type: 'TableImageComponent'
    }
];
