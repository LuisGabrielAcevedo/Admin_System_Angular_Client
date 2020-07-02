import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
	ISalaryPaymentFormValue,
	makeSalaryPaymentFormValue,
	makeSalaryPaymentState
	} from 'client/app/app/modules/payments/models/salary-payment';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { Subscription, Observable } from 'rxjs';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { IContact, makeContact, IRequest, ITransfer, makeTransfer, makeSidenavClose } from 'client/app/app/models';
import { ContactService } from 'client/app/app/services/contact.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { ContactAddComponent } from 'client/app/app/sidenav/contact/contact-add/contact-add.component';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-salary-payment-success',
	templateUrl: './salary-payment-success.component.html',
	styleUrls: ['./salary-payment-success.component.scss']
})
export class SalaryPaymentSuccessComponent implements OnInit, OnDestroy {
	public salaryPayment: ISalaryPaymentFormValue = makeSalaryPaymentFormValue({});
	public lastSalaryPayment: IRequest | null = null;
	public state: any;
	private subscription: Subscription = new Subscription();
	public currency = '';
	public destinationContact: IContact = makeContact({});

	constructor(
		private router: Router,
		private salaryPaymentService: SalaryPaymentService,
		private receiptsService: ReceiptsService,
		private pdfService: PdfService,
		private contactService:ContactService,
		private translateService: TranslateService,
		private analyticsService: AnalyticsService,
		private sidenavService: SidenavService,
		private utilsService: UtilsService
	) {}

	ngOnInit() {
		this.subscription.add(this.salaryPaymentService.getSalaryPaymentState().subscribe( state => {
			this.salaryPayment = state.newSalaryPaymentFormValue;
			this.lastSalaryPayment = state.lastSalaryPayment;
			this.validateState();
			this.checkSalaryPayment();
			this.destinationContact = this.salaryPayment.contact;
		}));
		this.trackPageView();
	}

	get content(){
		if (this.lastSalaryPayment)
			return this.lastSalaryPayment.content as ITransfer;
		return makeTransfer({});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	checkSalaryPayment() {
		if (!this.salaryPayment.contact.id) {
			this.router.navigateByUrl('app/payments/salary/contact');
		} else {
			if (this.salaryPayment.account) {
				this.currency = this.salaryPayment.account.currency.symbol;
			}
		}
	}

	endPayment() {
		this.trackFinishAction();
		this.router.navigateByUrl('app/dashboard');
	}

	validateState(){
		if(this.lastSalaryPayment)
		switch (this.lastSalaryPayment.state){
			case 'PENDING_APPROVAL':
				this.state = {
					state: 'PENDING_APPROVAL',
					descriptionReciept: this.translateService.instant('common.yourRequest'),
					icon: 'senha_circulo_outline',
					title: this.translateService.instant('pages.payments.salary.success.titlePendingApproval'),
					class: 'salary-payment-success__circle-success salary-payment-success__color-circle-pending-autorized',
					iconButtonSecundary: 'comprovante_outline',
					textButtonSecundary: this.translateService.instant('pages.payments.salary.success.detailRequest'),
				};
				break;

			case 'PARTIALLY_AUTHORIZED':
				this.state = {
					state: 'PARTIALLY_AUTHORIZED',
					descriptionReciept: this.translateService.instant('common.yourRequest'),
					title: this.translateService.instant('pages.payments.salary.success.titlePartiallyAuthorized'),
					icon: 'senha_circulo_outline',
					class: 'salary-payment-success__circle-success salary-payment-success__color-circle-pending-partially-autorized',
					iconButtonSecundary: 'comprovante_outline',
					textButtonSecundary: this.translateService.instant('pages.payments.salary.success.detailRequest')				};
				break;

			case 'AUTHORIZED':
				this.state = {
						state: 'AUTHORIZED',
						allowDownload: false,
						descriptionReciept: this.translateService.instant('common.yourReceipt'),
						icon: 'senha_circulo_outline',
						title: this.translateService.instant('pages.payments.salary.success.titleAuthorized'),
						class:'salary-payment-success__circle-success salary-payment-success__color-circle-autorized',
						iconButtonSecundary: 'comprovante_outline',
						textButtonSecundary: this.translateService.instant('pages.payments.salary.success.detailRequest')
					};


					if (this.lastSalaryPayment.content.state === 'APPROVED') {
						this.state = {
							state: 'AUTHORIZED',
							allowDownload: true,
							descriptionReciept: this.translateService.instant('common.yourReceipt'),
							icon: 'check',
							title: this.translateService.instant('pages.payments.salary.success.titleApproved'),
							class:'salary-payment-success__circle-success salary-payment-success__color-circle-autorized',
							iconButtonSecundary: 'download_outline',
							textButtonSecundary: this.translateService.instant('pages.payments.salary.success.downloadReceipt'),
						};
					}

					if (this.lastSalaryPayment.content.state === 'DENIED') {
						this.state = {
							state: 'REJECTED',
							descriptionReciept: this.translateService.instant('common.yourRequest'),
							icon: 'fechar',
							title: this.translateService.instant('pages.payments.salary.success.titleRejected'),
							class: 'salary-payment-success__circle-success salary-payment-success__color-circle-rejected',
							iconButtonSecundary: 'comprovante_outline',
							textButtonSecundary: this.translateService.instant('pages.payments.salary.success.detailRequest'),
						}
					}
					break;
			case 'REJECTED':
				this.state = {
						state: 'REJECTED',
						descriptionReciept: this.translateService.instant('common.yourRequest'),
						icon: 'fechar',
						title: this.translateService.instant('pages.payments.salary.success.titleRejected'),
						class: 'salary-payment-success__circle-success salary-payment-success__color-circle-rejected',
						iconButtonSecundary: 'comprovante_outline',
						textButtonSecundary: this.translateService.instant('pages.payments.salary.success.detailRequest'),
					};
					break;
			default:
				break;
		}
	}

	newPayment() {
		this.salaryPaymentService.updateSalaryPaymentState(makeSalaryPaymentState({}));
		this.trackNewPaymentAction();
		this.router.navigateByUrl('app/payments/salary/contact');
	}

	isContactInContactList(contact: IContact): Observable<boolean> {
		return this.contactService.isContactInContactList(contact);
	}

	detailRequest(){
		if ( this.lastSalaryPayment) {
			this.sidenavService.open({
				title: this.translateService.instant('pages.payments.salary.salaryPayment'),
				component: RequestDetailComponent,
				data: {
					id: this.lastSalaryPayment.id
				}
			});
		}
	}

	downloadReceipt() {
		if (this.lastSalaryPayment && this.lastSalaryPayment.id) {
			this.subscription.add(this.receiptsService.getReceipt(this.lastSalaryPayment.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	trackNewPaymentAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Button | Bottom',
			customAction: 'Click',
			customLabel: 'PagarNuevoSueldo'
		}, '');
	}

	trackAddContactAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Button | Right',
			customAction: 'Click',
			customLabel: 'AgendarDestinatario'
		}, 'PagoSueldos');
	}

	trackDownloadReceiptAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Link | Left',
			customAction: 'Download',
			customLabel: 'DescargarComprobante'
		}, 'PagoSueldos');
	}

	trackFinishAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Button | Bottom',
			customAction: 'Click',
			customLabel: 'Terminar'
		}, '');
	}

	openAddContact() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.contacts.add.title'),
			component: ContactAddComponent,
			data: {
				contact: this.destinationContact
			},
			hasMoreData: true,
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('common.ok'),
			})
		});
	}

	trackPageView() {
		const account = this.salaryPayment.account;
		this.analyticsService.trackPageView({
			name: 'Éxito',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: 'Complete',
				originaccounttype: account? account.type : '',
				currency: account? account.currency.symbol : ''
			}
		}, {
			transactioncomplete: '1',
			transactionvalue: this.salaryPayment.amount
		});
	}

	formattedDate(date: Date ) {
		return this.utilsService.formatDate(new Date(date));
	}
}
