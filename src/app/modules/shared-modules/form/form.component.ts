import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ILgxModel } from "src/app/axioquent";
import {
  FormField,
  FormModel,
  MaterialFormData
} from "../dynamic-form/dynamic-form.interfaces";
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { Subscription } from "rxjs";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnDestroy {
  @ViewChild("dynamicForm") public form: DynamicFormComponent;
  public subscriptions: Subscription[] = [];
  public materialData: MaterialFormData = {
    // appearance: "fill",
    floatLabel: "always"
  };
  public loading: boolean;
  public model: ILgxModel;
  public resource: string;
  public id: string;
  public modelClass: any;
  public fieldsConfig: FormField[];
  public title: string;
  public buttonLabel: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
  ) {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.resource = params.get("resource");
        this.id = params.get("id");
        this.title = this.id
          ? `${this.resource.replace("-", "_")}.edit.title`
          : `${this.resource.replace("-", "_")}.new.title`;
        this.title = this.translateService.instant(this.title);
        this.buttonLabel = this.id ? "edit" : "save";
        this.initComponent();
      })
    );
  }

  public async initComponent() {
    const modelClassModule = await import(
      `src/app/models/admin-system/${this.resource}`
    );
    this.modelClass = modelClassModule.default;
    const fieldsConfigModule = await import(
      `src/app/metadata/admin-system/form/${this.resource}`
    );
    this.fieldsConfig = fieldsConfigModule.default;
    if (this.id) this.loadData();
  }

  public loadData(): void {
    this.loading = true;
    this.modelClass
      .with(this.with())
      .findByIdRx(this.id)
      .subscribe(resp => {
        this.model = resp.data;
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
    let resource: string = this.resource;
    if (resource.includes("-")) resource = resource.split("-").join("");
    const populateData = {
      users:
        "company,application,userConfigurations.currentStore,userInformation,role",
      companies: "application,country,admin",
      applications: "",
      stores: "country,application,company,storeConfigurations",
      states: "country",
      vendors: "company,country,state",
      brands: "company,vendors",
      productcategories: "company",
      producttypes: "company",
      products: "company.application,category,type,brand,vendor",
      rooms: "company"
    };
    return populateData[resource];
  }

  public saveAction(model: FormModel): void {
    this.modelClass.saveRx(model).subscribe(resp => this.goToTable());
  }

  public updateAction(model: FormModel): void {
    this.modelClass
      .updateRx(model._id, model)
      .subscribe(() => this.goToTable());
  }

  public goToTable() {
    this.router.navigate([`/admin-system/${this.resource}`]);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
