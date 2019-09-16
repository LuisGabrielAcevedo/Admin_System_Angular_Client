import { Component, OnInit, Input } from '@angular/core';
import { FormMainGroup, MaterialFormData } from '../../dynamic-form.interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormService } from '../../dynamic-form.service';

@Component({
  selector: 'app-panels-form',
  templateUrl: './panels-form.component.html',
  styleUrls: ['./panels-form.component.css']
})
export class PanelsFormComponent implements OnInit {
  public selectedPanel: FormControl;
  public subscriptions: Subscription[] = [];
  @Input() public mainGroups: FormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  constructor(public dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.selectedPanel = new FormControl(0);
    this.subscriptions.push(
      this.dynamicFormService.setActiveGroup.subscribe(value => {
        if (this.selectedPanel.value !== value) this.selectedPanel.patchValue(value);
      })
    );
  }

}
