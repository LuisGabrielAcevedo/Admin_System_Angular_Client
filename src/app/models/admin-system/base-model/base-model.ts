import { Model, AxiosquentQueryConfig } from "src/app/axioquent/index";

export class AdminSystemBaseModel extends Model {
  public queryConfig: AxiosquentQueryConfig = {
    orderBy: 'sort',
    with: 'populate',
    per_page: 'itemsPerPage'
  }
  
  public baseUrl(): string {
    // return 'http://localhost:3500/api/v1';
    return "https://adminsystemnodeserver.herokuapp.com/api/v1";
  }
}

