import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IDynamicTableButton } from "src/app/modules/shared-modules/table/table.interfaces";

@Injectable({
  providedIn: "root"
})
export default class ApplicationService {
  constructor(private router: Router) {}

  getRowActions(): IDynamicTableButton[] {
    return [];
  }
}
