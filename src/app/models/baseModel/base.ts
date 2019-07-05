import { Model, AxiosquentHeaders } from '../../axioquent';
import { TokenService } from '../../services/http/token.service';

export class Base extends Model {
    public baseUrl(): string {
        return 'http://localhost:3500/api/v1';
    }

    public headers(): AxiosquentHeaders {
        const tokenService = new TokenService();
        const token = tokenService.getToken();
        return {
            Authorization: token
        };
    }
}

