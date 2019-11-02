import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentsList } from '../../../proposal/data-register/api/proposalDTO';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: CommentsList[];

  @Output() onTypeComment = new EventEmitter();

  public messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.messageForm = this.formBuilder.group({
      comment: [null]
    });
  }

  public typingComment(event) {
    const MESSAGE = event.srcElement.value;
    this.onTypeComment.emit(MESSAGE);
  }
}
