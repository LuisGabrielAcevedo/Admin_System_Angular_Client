import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "./services/http/message.service";
import { AdminSystemBaseModel } from "./models/admin-system/base-model/base";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public loading: boolean = false;
  constructor(
    public messageService: MessageService,
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(["es", "en"]);
    this.translateService.setDefaultLang("en");
  }

  ngOnInit() {
    AdminSystemBaseModel.getAxiosInstance().interceptors.request.use(
      request => {
        if (["put", "post"].includes(request.method)) this.loading = true;
        return request;
      }
    );

    AdminSystemBaseModel.getAxiosInstance().interceptors.response.use(
      response => {
        this.loading = false;
        return response;
      }
    );
  }
}
