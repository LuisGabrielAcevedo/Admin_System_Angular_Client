import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  videoSelected: string = null;
  @ViewChild('iframe') iframe: ElementRef;
  constructor( private httpYoutubeService: YoutubeService) {}

  ngOnInit() {
    this.loadVideos('coldplay');
  }

  loadVideos(value?: string) {
    this.rowActions = this.httpYoutubeService.getRowActions();
    this.loading = true;
    this.httpYoutubeService.getVideos(value).subscribe(
      resp => {
        this.loading = false;
        this.data = resp.items.filter( video => video.id.kind === 'youtube#video');
      }
    );
  }

  itemSelectedAction(data: any) {
    console.log(data);
    const url = `https://www.youtube.com/embed/${data.item.id.videoId}`;
    this.iframe.nativeElement.src = url;
  }

}
