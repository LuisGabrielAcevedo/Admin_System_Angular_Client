import { Observable } from 'rxjs';
import { IReceiptPdfResponse } from 'client/app/app/models/receipt';

export class ReceiptsServiceMock {
	getReceipt(_id: string): Observable<IReceiptPdfResponse> {
		return new Observable();
	}
}