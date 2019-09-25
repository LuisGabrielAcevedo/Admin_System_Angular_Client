import { Model } from "src/app/axioquent/index";

export class AdminSystemBaseModel extends Model {
  public baseUrl(): string {
    // return 'http://localhost:3500/api/v1';
    return "https://adminsystemnodeserver.herokuapp.com/api/v1";
  }
}
