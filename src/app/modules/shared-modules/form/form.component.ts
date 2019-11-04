import { Component, ViewChild, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ILgxModel, Lgx } from "src/app/lgx-axios-dev-tools/index";
import {
  IDynamicFormField,
  IDynamicFormModel,
  IDynamicFormMaterialData
} from "../dynamic-form/dynamic-form.interfaces";
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnDestroy {
  @ViewChild("dynamicForm") public form: DynamicFormComponent;
  public subscriptions: Subscription[] = [];
  public materialData: IDynamicFormMaterialData = {
    appearance: "fill",
    floatLabel: "always"
  };
  public loading: boolean;
  public model: ILgxModel;
  public resource: string;
  public id: string;
  public modelClass: Lgx;
  public fieldsConfig: IDynamicFormField[];
  public title: string;
  public buttonLabel: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService
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
    let modelClass = this.modelClass;
    if (this.with()) modelClass = modelClass.with(this.with());
    this.loading = true;
    modelClass.findByIdRx(this.id).subscribe(resp => {
      this.model = resp.data;
      this.loading = false;
    });
  }

  public save(): void {
    this.form.submit().subscribe(resp => {
      resp.valid
        ? resp.model._id
          ? this.updateAction(resp.model)
          : this.saveAction(resp.model)
        : console.log(resp);
    });
  }

  public with(): string {
    let resource: string = this.resource;
    if (resource.includes("-")) resource = resource.split("-").join("");
    const populateData = {
      users:
        "company,application,userConfigurations.currentStore,userInformation,role,profileImage",
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

  public saveAction(model: IDynamicFormModel): void {
    this.modelClass.saveRx(model).subscribe(resp => this.goToTable());
  }

  public updateAction(model: IDynamicFormModel): void {
    if (model.profileImageFile) {
      this.modelClass
        .updateRx(model._id, model)
        .pipe(
          switchMap(() => {
            return this.modelClass
              .urlParam("images")
              .formData()
              .update(model._id, {
                file: model.profileImageFile
              });
          })
        )
        .subscribe(() => this.goToTable());
    } else {
      this.modelClass
        .updateRx(model._id, model)
        .subscribe(() => this.goToTable());
    }
  }

  public goToTable() {
    this.router.navigate([`/admin-system/${this.resource}`]);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
