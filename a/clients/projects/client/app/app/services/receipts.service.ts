import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { IReceiptPdfResponse } from '../models/receipt';

@Injectable()
export class ReceiptsService {

	constructor(private data: DataService) { }

	getReceipt(id: string): Observable<IReceiptPdfResponse> {
		return this.data.get(`v1/receipts/receipts/${id}`);
	}
}
