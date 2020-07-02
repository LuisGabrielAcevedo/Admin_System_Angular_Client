import {Component} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Observable} from 'rxjs';

@Component({
	selector: 'mcy-media-query',
	template: `
    <div class="mqInfo">
      Active MediaQuery(s):
      <ul>
        <li *ngFor="let change of (media$ | async) as changes">
          {{change.mqAlias}} = {{change.mediaQuery}}
        </li>
      </ul>
    </div>
  `,
	styleUrls: ['./media-query.component.scss'],
})
export class MediaQueryComponent {
	media$: Observable<MediaChange[]>;

	constructor(media: MediaObserver) {
		this.media$ = media.asObservable();
	}
}
