import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';


@Injectable()
export class YoutubeService {
    constructor(private http: HttpClient) {
    }

    getVideos(value: string): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?id=7lCDEYXw3mM&key=AIzaSyBQDrfTg_vB26R4IwvCEuB1AwTWoW9scrE&q=${value}&part=snippet&maxResults=50`);
    }

    getRowActions(): TableButtonAction[] {
        return [
            {
                icon: 'queue_music',
                label: 'play',
                type: 'TableButtonComponent',
                outputItemAction: 'play'
            }
        ];
    }
}
