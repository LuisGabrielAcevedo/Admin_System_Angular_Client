import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppSettingsSandbox } from "./store/app-settings/app-settings.sandbox";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AdminSystemInterceptor } from "./interceptors/admin-system.interceptor";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public loading: boolean = false;
  public subscriptions: Subscription[] = [];
  constructor(
    private translateService: TranslateService,
    private appSettingsSandbox: AppSettingsSandbox,
    private adminSystemInterceptor: AdminSystemInterceptor
  ) {
    this.translateService.addLangs(["es", "en"]);
    this.translateService.setDefaultLang("en");
  }

  ngOnInit() {
    this.subscriptions.push(
      this.appSettingsSandbox
        .fetchRequests()
        .pipe(map(loadingEvents => !!Object.keys(loadingEvents).length))
        .subscribe(loading => {
          this.loading = loading;
        })
    );
  }
}
