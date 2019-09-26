import { Model } from "src/app/axioquent/index";

export class NetflixBaseModel extends Model {
  public baseUrl(): string {
    return "https://api.themoviedb.org/3/discover/movie?api_key=9265f925294b28164af238fee0a43362&primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&language=es";
  }
}
