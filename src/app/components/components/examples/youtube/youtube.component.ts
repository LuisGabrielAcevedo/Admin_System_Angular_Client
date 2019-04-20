import { Component, OnInit } from '@angular/core';
import { TableHeader, TableButtonAction } from '../../../sharedComponents/table/table.interfaces';
import { YoutubeHeader } from '../../../../data/youtube';
import { YoutubeService } from '../../../../services/exampleEndPoints/http.youtube';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  data: object[];
  headers: TableHeader[] = YoutubeHeader;
  colors = ['#E3F2FD', '#64B5F6', '#1976D2'];
  loading = false;
  rowActions: TableButtonAction[];
  constructor( private httpYoutubeService: YoutubeService) { }

  ngOnInit() {
    this.loadVideos('coldplay');
  }

  loadVideos(value?: string) {
    this.loading = true;
    this.httpYoutubeService.getVideos(value).subscribe(
      resp => {
        this.loading = false;
        this.data = resp.items.filter( video => video.id.kind === 'youtube#video');
      }
    );
  }

}
