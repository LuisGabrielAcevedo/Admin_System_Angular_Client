import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class YoutubeService {
    rowActions;
    constructor(private http: HttpClient) {
    }

    getVideos(value: string): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?id=7lCDEYXw3mM&key=AIzaSyBQDrfTg_vB26R4IwvCEuB1AwTWoW9scrE&q=${value}&part=snippet&maxResults=50`);
    }
}
