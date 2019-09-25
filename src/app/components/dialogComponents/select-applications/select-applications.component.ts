import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl } from "@angular/forms";
import { SnackbarSandbox } from "../../../sandbox/snackbar.sandbox";
import ApplicationService from "src/app/services/admin-system/applications.service";

@Component({
  selector: "app-select-applications",
  templateUrl: "./select-applications.component.html",
  styleUrls: ["./select-applications.component.css"]
})
export class SelectApplicationsComponent implements OnInit {
  applicationsList: any[] = [];
  applicationsSelected = new FormControl([]);
  loading: boolean = null;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  constructor(
    public dialogRef: MatDialogRef<SelectApplicationsComponent>,
    public applicationService: ApplicationService,
    public snackBar: SnackbarSandbox,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadApplications() {
    // this.applicationService.getApplicationsList({}).subscribe(resp => {
    //     this.applicationsList = resp.data;
    // });
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  updatePermissions() {
    this.loading = true;
    const applications = this.data.data.item.map(p => p._id);
    const observable = this.data.data.observable(
      applications,
      this.applicationsSelected.value
    );
    observable.subscribe(resp => {
      this.snackBar.sendMessage({
        action: "",
        message: resp.msg
      });
      this.loading = false;
      this.dialogRef.close(true);
    });
  }
}
