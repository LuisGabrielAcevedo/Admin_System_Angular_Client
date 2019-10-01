import { Model } from "src/app/lgx-axios-dev-tools/index";

export class MercadoLibreBaseModel extends Model {
  public baseUrl(): string {
    return "https://api.mercadolibre.com/sites/MLA/search";
  }
}
