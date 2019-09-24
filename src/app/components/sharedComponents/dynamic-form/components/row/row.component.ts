import { Component, OnInit, Input } from '@angular/core';
import { FormField, MaterialFormData, FormModel } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() public fields: FormField[];
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  @Input() public model: FormModel;
  public rowTitle: string = null;
  constructor() {
  }

  ngOnInit() {
    this.fields.forEach((field) => {
      if (field.flexConfig && field.flexConfig.rowTitle)
        this.rowTitle = field.flexConfig!.rowTitle!;
    });
  }
}
