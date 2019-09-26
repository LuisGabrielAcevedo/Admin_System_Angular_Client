import { Component, OnInit, Input } from '@angular/core';
import { FormModel, FormField, MaterialFormData } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';
import Store from 'src/app/models/admin-system/stores';

@Component({
  selector: 'app-product-prices',
  templateUrl: './product-prices.component.html',
  styleUrls: ['./product-prices.component.css']
})
export class ProductPricesComponent implements OnInit {
  public currentModel: FormModel;
  @Input() public field: FormField;
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  @Input() set model(model: FormModel) {
    this.currentModel = model;
  }
  constructor() { }

  ngOnInit() {
  }

}
