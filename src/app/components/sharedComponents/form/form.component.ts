import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AxiosquentModel } from 'src/app/axioquent';
import { FormField, FormModel, MaterialFormData } from '../dynamic-form/dynamic-form.interfaces';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
declare const require: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('dynamicForm') public form: DynamicFormComponent;
  materialData: MaterialFormData = {
    appearance: 'outline',
    floatLabel: 'always'
  } 
  loading: boolean;
  model: AxiosquentModel;
  resource: string;
  id: string;
  modelClass: any;
  fieldsConfig: FormField[];
  title: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get('resource');
      this.title = this.resource;
      this.id = params.get('id');
      this.fieldsConfig = require(`src/app/data/adminSystem/form/${this.resource}`).default;
      this.modelClass = require(`src/app/models/adminSystem/${this.resource}`).default;
      this.loadData();
    });
  }

  ngOnInit() {
  }

  public loadData(): void {
    this.loading = true;
    this.modelClass
      .option('populate', this.with())
      .findByIdRx(this.id)
      .subscribe(resp => {
        this.model = resp;
        this.loading = false;
      });
  }

  public save(): void {
    this.form.submit().subscribe(resp => { 
      resp.valid 
        ? resp.currentModel._id 
          ? this.updateAction(resp.currentModel)
          : this.saveAction(resp.currentModel)
        : console.log(resp);
    });
  }

  public with(): string {
    const populateData = {
      users: 'company,application,userConfigurations.currentStore,userInformation,role',
      companies: 'country'
    }
    return populateData[this.resource];
  }

  public saveAction(model: FormModel): void {
    const modelClass = new this.modelClass();
    modelClass.create(model);
    modelClass.saveRx().subscribe(resp => console.log(resp));
  }

  public updateAction(model: FormModel): void {
    const modelClass = new this.modelClass();
    modelClass.create(model);
    modelClass.updateRx().subscribe(resp => console.log(resp));
  }

  cancel() {
  }
}
