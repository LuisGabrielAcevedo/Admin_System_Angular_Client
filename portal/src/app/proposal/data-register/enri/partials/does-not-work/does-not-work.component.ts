import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnriPayload } from '../../api/enri';

@Component({
  selector: 'app-does-not-work',
  templateUrl: './does-not-work.component.html',
  styleUrls: ['./does-not-work.component.scss']
})
export class DoesNotWorkComponent implements OnInit {
  @Input() formSubmitAttempt: boolean;
  @Output() onDoesNotWorkForm = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {}

  public formDoesNotWork: FormGroup;
  private enriPayload: EnriPayload;
  private answers = [];

  ngOnInit() {
    this.generateForm();
    this.formDoesNotWork.valueChanges.subscribe(() => {
      if (this.formDoesNotWork.valid) {
        this.generatePayload();
        this.onDoesNotWorkForm.emit(this.enriPayload);
      }
    });
  }
  private generateForm() {
    this.formDoesNotWork = this.formBuilder.group({
      questionOne: [null, [Validators.required]]
    });
  }

  private generatePayload() {
    this.answers = [];
    this.answers.push(this.formDoesNotWork.value.questionOne);

    this.enriPayload = {
      status: this.formDoesNotWork.status,
      answers: this.answers
    };
  }
}
