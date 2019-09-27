import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NetflixBaseModel } from "src/app/models/examples/netflix/base-model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public movies: object[] = [];
  constructor() {}
  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    NetflixBaseModel.findRx().subscribe(resp => {
      let movies: object = this.movies;
      this.movies = resp.results;
    });
  }

  formatImage(movie: string) {
    return "https://image.tmdb.org/t/p/w500" + movie;
  }

  scrollIndex(index: number) {
    if (index === 269) {
      this.loadMovies();
    }
  }
}
