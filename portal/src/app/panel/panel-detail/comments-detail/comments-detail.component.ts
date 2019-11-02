import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CommentsList } from '../../../proposal/data-register/api/proposalDTO';
import { USER_TYPE } from '@app/constants/panel.contants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comments-detail',
  templateUrl: './comments-detail.component.html',
  styleUrls: ['./comments-detail.component.scss']
})
export class CommentsDetailComponent implements OnInit {
  @Input() comments: CommentsList[];
  @Input() shownComments: CommentsList[];
  @Input() commentGap: number;

  @Output() addMoreComments: EventEmitter<any> = new EventEmitter();
  @Output() collapseComments: EventEmitter<any> = new EventEmitter();

  public isCollapsed = true;
  public BANK = USER_TYPE.BANK;
  public labelBank = this.translate.instant('@Bank');

  constructor(private translate: TranslateService) {}

  ngOnInit() {}
}
