import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnriPayload } from '../../api/enri';

@Component({
  selector: 'app-own-account',
  templateUrl: './own-account.component.html',
  styleUrls: ['./own-account.component.scss']
})
export class OwnAccountComponent implements OnInit {
  @Input() formSubmitAttempt: boolean;
  @Output() onOwnAccountForm = new EventEmitter();

  public formOwnAccount: FormGroup;
  private enriPayload: EnriPayload;
  private answers = [];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generateForm();
    this.formOwnAccount.valueChanges.subscribe(() => {
      if (this.formOwnAccount.valid) {
        this.generatePayload();
        this.onOwnAccountForm.emit(this.enriPayload);
      }
    });
  }
  private generateForm() {
    this.formOwnAccount = this.formBuilder.group({
      questionOne: [null, [Validators.required]],
      questionTwo: [null, [Validators.required]],
      questionThree: [null, [Validators.required]],
      questionFour: [null, [Validators.required]]
    });
  }

  private generatePayload() {
    this.answers = [];
    this.answers.push(this.formOwnAccount.value.questionOne);
    this.answers.push(this.formOwnAccount.value.questionTwo);
    this.answers.push(this.formOwnAccount.value.questionThree);
    this.answers.push(this.formOwnAccount.value.questionFour);
    this.enriPayload = {
      status: this.formOwnAccount.status,
      answers: this.answers
    };
  }
}
