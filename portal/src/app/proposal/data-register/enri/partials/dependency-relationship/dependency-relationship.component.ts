import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnriPayload } from '../../api/enri';

@Component({
  selector: 'app-dependency-relationship',
  templateUrl: './dependency-relationship.component.html',
  styleUrls: ['./dependency-relationship.component.scss']
})
export class DependencyRelationshipComponent implements OnInit {
  @Input() formSubmitAttempt: boolean;
  @Output() onDepedencyRelationshipForm = new EventEmitter();

  public formDependencyRelationship: FormGroup;

  public enriPayload: EnriPayload;

  private answers = [];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generateForm();
    this.formDependencyRelationship.valueChanges.subscribe(() => {
      if (this.formDependencyRelationship.valid) {
        this.generatePayload();
        this.onDepedencyRelationshipForm.emit(this.enriPayload);
      }
    });
  }

  private generatePayload() {
    this.answers = [];
    this.answers.push(this.formDependencyRelationship.value.questionOne);
    this.answers.push(this.formDependencyRelationship.value.questionTwo);
    this.answers.push(this.formDependencyRelationship.value.questionThree);

    this.enriPayload = {
      status: this.formDependencyRelationship.status,
      answers: this.answers
    };
  }

  private generateForm() {
    this.formDependencyRelationship = this.formBuilder.group({
      questionOne: [null, [Validators.required]],
      questionTwo: [null, [Validators.required]],
      questionThree: [null, [Validators.required]]
    });
  }
}
