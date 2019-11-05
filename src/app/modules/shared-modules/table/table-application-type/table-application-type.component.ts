import { Component, OnInit, Input } from "@angular/core";
import formatTextFn from "../utilities/format-text";
interface ITableItem {
  application?: {
    _id: string;
  };
}

@Component({
  selector: "app-table-application-type",
  templateUrl: "./table-application-type.component.html",
  styleUrls: ["./table-application-type.component.css"]
})
export class TableApplicationTypeComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: any;
  text = null;

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    let text = formatTextFn(this.item, this.field as string);
    text = text ? text : "Sin información";
    this.text = text.length > 14 ? `${text.substr(0, 14)}...` : text;
  }

  color() {
    let background = "none";
    let color = "none";
    let fontWeight = "none";
    if (this.item.application && this.field !== "applicationRole") {
      color = "white";
      fontWeight = "600";
      background = this.background(this.item.application._id);
    } else if (this.field === "applicationRole") {
      color = this.item[this.field] === "USER" ? "none" : "white";
      fontWeight = this.item[this.field] === "USER" ? "none" : "600";
      background = this.item[this.field] === "USER" ? "none" : "#304ffe";
    } else if (this.field === "_id") {
      color = "white";
      fontWeight = "600";
      background = this.background(this.item[this.field]);
    } else if (!this.item.application) {
      color = "white";
      background = "#e0e0e0";
    }
    return {
      background: background,
      color: color,
      "font-weight": fontWeight
    };
  }

  background(value) {
    let background = "none";
    switch (value) {
      case "5cca3732a342520bbcd24563": // Sports courts
        background = "#40CA19";
        break;
      case "5cca2327062c7606d986e719": // Musical instruments
        background = "#2E2378";
        break;
      case "5cca37c6a342520bbcd24564": // Transport
        background = "#EDD90E";
        break;
      case "5cca227c5084d906c1ffb021": // Restaurant
        background = "#901111";
        break;
      case "5cca22d05084d906c1ffb022": // Fast food
        background = "#C42B68";
        break;
      case "5cca36c0a342520bbcd24562": // Fitness center
        background = "#57B7D8";
        break;
      case "5cca2362062c7606d986e71a": // Car sale
        background = "#ED6A0F";
        break;
      default:
        background = "#e0e0e0";
        break;
    }
    return background;
  }

  icon() {
    let icon = "perm_identity";
    if (this.item.application && this.field !== "applicationRole") {
      icon = this.selectIcon(this.item.application._id);
    } else if (this.field === "applicationRole") {
    } else if (this.field === "_id") {
      icon = this.selectIcon(this.item[this.field]);
    } else if (!this.item.application) {
    }
    return icon;
  }

  selectIcon(value) {
    let icon = "peple";
    switch (value) {
      case "5cca3732a342520bbcd24563": // Sports courts
        icon = "rowing";
        break;
      case "5cca2327062c7606d986e719": // Musical instruments
        icon = "audiotrack";
        break;
      case "5cca37c6a342520bbcd24564": // Transport
        icon = "local_taxi";
        break;
      case "5cca227c5084d906c1ffb021": // Restaurant
        icon = "restaurant";
        break;
      case "5cca22d05084d906c1ffb022": // Fast food
        icon = "fastfood";
        break;
      case "5cca36c0a342520bbcd24562": // Fitness center
        icon = "rowing";
        break;
      case "5cca2362062c7606d986e71a": // Car sale
        icon = "directions_car";
        break;
      default:
        icon = "perm_identity";
        break;
    }
    return icon;
  }
}
