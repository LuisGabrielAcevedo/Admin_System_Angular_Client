import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  DynamicTableHeader,
  DynamicTableButtonAction,
  DynamicTableItem
} from "src/app/modules/shared-modules/table/table.interfaces";
import { youtubeHeaders } from "src/app/metadata/examples/youtube";
import { YoutubeBaseModel } from "src/app/models/examples/youtube/base-model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.css"]
})
export class YoutubeComponent implements OnInit {
  public title: string = 'Youtube';
  public data: DynamicTableItem[] = [];
  public headers: DynamicTableHeader[] = youtubeHeaders;
  public loading: boolean = false;
  public rowActions: DynamicTableButtonAction[] = [];
  public videoSelected: string = null;
  @ViewChild("iframe") iframe: ElementRef;
  constructor() {}

  ngOnInit() {
    this.loadVideos("coldplay");
  }

  public loadVideos(value?: string) {
    this.loading = true;
    YoutubeBaseModel.option("part", "snippet")
      .option("maxResults", "50")
      .option("q", value)
      .findRx()
      .pipe(map(resp => resp.items))
      .subscribe(resp => {
        this.data = resp.filter(video => video.id.kind === "youtube#video");
        this.loading = false;
      });
  }

  public videoSelectedAction(data: any) {
    const url = `https://www.youtube.com/embed/${data.item.id.videoId}`;
    this.iframe.nativeElement.src = url;
  }
}
