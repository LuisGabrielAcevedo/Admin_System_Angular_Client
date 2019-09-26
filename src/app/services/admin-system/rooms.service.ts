import { DynamicTableButtonAction } from "src/app/components/sharedComponents/table/table.interfaces";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import Room from "src/app/models/admin-system/rooms";

@Injectable({
  providedIn: "root"
})
export default class RoomService {
  constructor(private router: Router) {}

  getRowActions(): DynamicTableButtonAction[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        type: "TableButtonComponent",
        event: arg => {
          this.router.navigate(["/admin-system/rooms/edit", arg._id]);
        }
      },
      {
        icon: "delete",
        label: "Eliminar",
        type: "TableButtonComponent",
        modal: {
          number: 1,
          row: 0,
          question: "Esta seguro que desea borrar el cuarto?",
          successButtonText: "Si",
          successButtonEvent: arg => Room.destroyRx(arg._id).pipe(),
          cancelButtonText: "No"
        }
      }
    ];
  }
}
