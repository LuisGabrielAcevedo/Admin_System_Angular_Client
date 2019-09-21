import { Model, AxiosquentHeaders } from 'src/app/axioquent/index';

export class Base extends Model {
    public baseUrl(): string {
        return 'http://localhost:3500/api/v1';
        // return 'https://adminsystemnodeserver.herokuapp.com/api/v1';
    }

    public headers(): AxiosquentHeaders {
        return {
            Authorization: ''
        };
    }
}

