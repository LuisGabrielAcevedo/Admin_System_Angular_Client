import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-image',
  templateUrl: './table-image.component.html',
  styleUrls: ['./table-image.component.css']
})
export class TableImageComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  image;
  constructor( private httpTableService: TableService) {}

  ngOnInit() {
    // this.formatImage();
  }

  async formatImage() {
    // const image = await this.httpTableService.formatText(this.item, this.field);
    // this.image = 'src/assets/images/user.png';
  }

}
