import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NetflixService } from 'src/app/services/exampleEndPoints/netflix.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public movies: object[] = [];
  constructor(private netflixService: NetflixService) { }
  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.netflixService.geMovies().subscribe(resp => {
      this.movies = resp.results;
    })
  }

  formatImage(movie: string) {
    return 'https://image.tmdb.org/t/p/w500' + movie;
  }
}
