import { Model } from "src/app/axioquent/index";

export class MercadoLibreBaseModel extends Model {
  public baseUrl(): string {
    return "https://api.mercadolibre.com/sites/MLA/search";
  }
}
