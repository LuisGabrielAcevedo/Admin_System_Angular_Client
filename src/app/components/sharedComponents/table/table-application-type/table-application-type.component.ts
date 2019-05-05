import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';
interface ITableItem {
  application?: {
    _id: string;
  }
}

@Component({
  selector: 'app-table-application-type',
  templateUrl: './table-application-type.component.html',
  styleUrls: ['./table-application-type.component.css']
})
export class TableApplicationTypeComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: ITableItem;
  text;
  constructor(private httpTableService: TableService) {
    this.text = null;
  }

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    let text = this.httpTableService.formatText(this.item, (this.field as string));
    text = text ? text : 'No data';
    this.text = text.length > 22 ? `${text.substr(0, 22)}...` : text;
  }

  margin() {
    return {
      'margin-top': window.innerWidth < 1001 && this.text.length > 15 ? '2px' : '12px'
    }
  }

  color() {
    let background = 'none';
    let color = 'none';
    let fontWeight = 'none';
    if (this.item.application && this.field !== 'applicationRole') {
      color = 'white';
      fontWeight = '600';
      background = this.background(this.item.application._id);
    } else if (this.field === 'applicationRole') {
      color = this.item[this.field] === "USER" ? 'none' : 'white';
      fontWeight = this.item[this.field] === "USER" ? 'none' : '600';
      background = this.item[this.field] === "USER" ? 'none' : '#1976D2';
    } else if (this.field === '_id') {
      color = 'white';
      fontWeight = '600';
      background = this.background(this.item[this.field]);
    }
    else if (!this.item.application) {
      background = '#e0e0e0';
    } 
    return {
      'background': background,
      'color': color,
      'font-weight': fontWeight
    }
  }

  background(value) {
    let background = 'none';
    switch (value) {
      case '5cca3732a342520bbcd24563': // Sports courts
        background = '#40CA19';
        break;
      case '5cca2327062c7606d986e719': // Musical instruments
        background = '#2E2378';
        break;
      case '5cca37c6a342520bbcd24564': // Transport
        background = '#EDD90E';
        break;
      case '5cca227c5084d906c1ffb021': // Restaurant
        background = '#901111';
        break;
      case '5cca22d05084d906c1ffb022': // Fast food
        background = '#C42B68';
        break;
      case '5cca36c0a342520bbcd24562': // Fitness center
        background = '#57B7D8';
        break;
      case '5cca2362062c7606d986e71a': // Car sale
        background = '#ED6A0F';
        break;
      default:
        background = '#e0e0e0';
        break;
    }
    return background;
  }
}


