import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AxiosquentModel } from 'src/app/axioquent';
import { FormField } from '../dynamic-form/dynamic-form.interfaces';
declare const require: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('dynamicForm') public form: any;
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
      this.fieldsConfig = require(`src/app/data/adminSystem/${this.resource}`).default;
      this.modelClass = require(`src/app/models/adminSystem/${this.resource}`).default;
      // this.loadData();
    });
  }

  ngOnInit() {
  }

  async loadData() {
    this.loading = true;
    const resp = await this.modelClass
      .option('populate', 'userInformation,userConfigurations')
      .find(this.id);
    this.loading = false;
    this.model = resp;
  }

  save() {
    this.form.submit();
  }

  cancel() {
  }
}
