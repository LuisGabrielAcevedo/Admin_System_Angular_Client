import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-image',
  templateUrl: './table-image.component.html',
  styleUrls: ['./table-image.component.css']
})
export class TableImageComponent implements OnInit, OnChanges {
  @Input() field: string;
  @Input() item: object;
  image;
  constructor( private httpTableService: TableService) {
    this.image = null;
   }

  ngOnInit() {
    this.formatImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('imagen onChange');
  }

  async formatImage() {
    const image = await this.httpTableService.formatText(this.item, this.field);
    image ? this.image = image : this.image = 'https://soygrowers.com/wp-content/uploads/2017/02/default_bio_600x600.jpg';
  }

}
