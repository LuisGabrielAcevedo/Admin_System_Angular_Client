import { Component, OnInit } from '@angular/core';
import { MercadoLibreService } from '../../../../services/exampleEndPoints/http.mercadolibre';
import { TableHeader, TableButtonAction } from '../../../sharedComponents/table/table.interfaces';
import { MercadoLibreHeader } from '../../../../data/mercadoLibre';

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './mercado-libre.component.html',
  styleUrls: ['./mercado-libre.component.css']
})
export class MercadoLibreComponent implements OnInit {
  data: object[];
  headers: TableHeader[] = MercadoLibreHeader;
  colors = ['#E3F2FD', '#64B5F6', '#fff159'];
  loading = false;
  rowActions: TableButtonAction[];
  constructor(private httpMercadoLibreService: MercadoLibreService) { }

  ngOnInit() {
    this.loadProducts('coldplay');
  }

  loadProducts(value?: string) {
    this.loading = true;
    this.httpMercadoLibreService.getProducts(value).subscribe(
      resp => {
        this.loading = false;
        this.data = resp.results;
        this.getRowActions();
      }
    );
  }

  getRowActions() {
    this.rowActions = this.httpMercadoLibreService.getRowActions();
  }
}
