import { Component, OnInit, Input } from "@angular/core";
import { IDynamicTableModal, IDynamicTableButton } from "../table.interfaces";
import { TableService } from "src/app/modules/shared-modules/table/table.service";

@Component({
  selector: "app-table-modal",
  templateUrl: "./table-modal.component.html",
  styleUrls: ["./table-modal.component.css"]
})
export class IDynamicTableModalComponent implements OnInit {
  public buttonSelected: string;
  public loading: boolean;
  @Input() modalData: IDynamicTableModal;
  @Input() item: object;
  @Input() position: number;
  constructor(public tableService: TableService) {}

  ngOnInit() {}

  buttonActions(button: IDynamicTableButton) {
    this.buttonSelected = button.label;
    this.tableService.buttonActions(button, this.position, this.item);
  }

  modalSuccesActions() {
    if (this.modalData.successButtonEvent) {
      this.loading = true;
      this.modalData.successButtonEvent(this.item).subscribe(() => {
        this.loading = false;
        this.tableService.closeModal.emit();
        this.tableService.reload.emit();
      });
    }
  }

  visibleButton(button: IDynamicTableButton) {
    return button.visible ? button.visible(this.item) : true;
  }

  disabledButton(button: IDynamicTableButton) {
    return button.disabled ? button.disabled(this.item) : false;
  }

  color(button: IDynamicTableButton) {
    return this.buttonSelected === button.label
      ? { color: "#304ffe" }
      : { color: "rgba(127,127,127,0.5)" };
  }
}
