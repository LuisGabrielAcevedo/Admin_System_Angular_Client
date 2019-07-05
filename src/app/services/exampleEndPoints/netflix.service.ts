import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NetflixService {
    constructor(private http: HttpClient) {
    }

    geMovies(): Observable<any> {
        return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=9265f925294b28164af238fee0a43362&primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&language=es');
    }
}
