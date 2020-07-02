/* tslint:disable */
/**
 *
 * Analytics Lib (GA) for Angular CLI v4
 * @version 1.0.0 (2019-08-29)
 *
 * @author Diego Riccio (Accenture Interactive)
 * @author Lucas Domingues (Accenture Interactive)
 *
 */

import { Injectable } from '@angular/core';

@Injectable()
export class Analytics {

	public enabled: boolean = true;
	public expose: boolean = false;
	public adobeDataLayerName: string = 'analyticsData';
	public debug: boolean = false;
	public debugColor: string = 'font-weight: bold; color: red';
	public gtmContainerId?: string;
	public autoTrackState: boolean = false;

	public listClassification = [
		'site.platformdetails',
		'site.applicationdetails',
		'visitor.customerdetails',
		'visitor.elegibility',
		'transaction.details',
		'custom.logintype',
		'custom.surveyscore',
		'custom.whatevervariable'
	];

	public adobeToGoole = {
		'site.vrsid': 'site.channel',
		'site.assessibility': 'site.accessibility',
		'site.assessibilitystatus': 'site.accessibility',
		'site.activatedpermissions': 'site.permissions',
		'site.platform': 'site.developmenttype',
		'site.platformdetails.AM': 'site.environment',
		'site.platformdetails.VA': 'site.environment',
		'site.platformdetails.UA': 'site.useragent',
		'site.applicationdetails.AG': 'visitor.agencystoreid',
		'visitor.customerid': 'visitor.client.idpf',
		'visitor.companyid': 'visitor.client.idpjcompany',
		'visitor.companyoperator': 'visitor.client.idpjoperator',
		'visitor.customerdetails.TP': 'visitor.client.accounttype',
		'visitor.customerdetails.AG': 'visitor.client.agency',
		'visitor.customersegment': 'visitor.client.commercialsegment',
		'visitor.customerdetails.FF': 'visitor.client.declaredincomerange',
		'visitor.customerdetails.LM': 'visitor.client.limitusage',
		'visitor.customerdetails.PPC': 'visitor.client.loannearduedate',
		'visitor.customerdetails.RA': 'visitor.client.occupation',
		'visitor.customerdetails.PERF': 'visitor.client.profile',
		'visitor.customerdetails.PP': 'visitor.client.rewardsprogram',
		'visitor.customerdetails.SCR': 'visitor.client.score',
		'visitor.customerdetails.EST': 'visitor.client.stars',
		'visitor.customerdetails.CTT': 'visitor.client.titularitycode',
		'visitor.customerdetails.SE': 'visitor.client.type',
		'visitor.elegibility.PA': 'visitor.client.elegibility',
		'visitor.storeid': 'visitor.agencystoreid',
		'transaction.details.CTB': 'transaction.details.bonusinstallments',
		'transaction.details.VR': 'transaction.details.cardcategory',
		'transaction.details.LMT': 'transaction.details.cardlimitrange',
		'transaction.details.BD': 'transaction.details.cardnetwork',
		'transaction.details.PT': 'transaction.details.cardpartner',
		'transaction.details.DCP': 'transaction.details.cardpurchaselimitrange',
		'transaction.details.DEF': 'transaction.details.cardwithdrawallimitrange',
		'transaction.details.CAN': 'transaction.details.chosenchannel',
		'transaction.details.PTS': 'transaction.details.clientrewardsvaluerange',
		'transaction.details.CUR': 'transaction.details.currency',
		'transaction.details.ACR': 'transaction.details.daystoinvoiceclosure',
		'transaction.details.TCD': 'transaction.details.destinationaccounttype',
		'transaction.details.BCD': 'transaction.details.destinationbank',
		'transaction.details.PLZ': 'transaction.details.installmentsterm',
		'transaction.details.CT': 'transaction.details.installmentsterm',
		'transaction.details.LMP': 'transaction.details.loanlimitrange',
		'transaction.details.PAO': 'transaction.details.offeredlimitincreaserange',
		'transaction.details.TCO': 'transaction.details.originaccounttype',
		'transaction.details.MDP': 'transaction.details.paymentmethod',
		'transaction.details.CAT': 'transaction.details.productcategory',
		'transaction.details.DP': 'transaction.details.productdetails',
		'transaction.details.PAS': 'transaction.details.requestedlimitincreaserange',
		'transaction.details.TS': 'transaction.details.tax',
		'transaction.details.INST': 'transaction.details.transactioninstitution',
		'transaction.details.STS': 'transaction.details.transactionstatus',
		'transaction.details.PVJ': 'transaction.details.travelnoticedestinationcountry',
		'transaction.details.FVI': 'transaction.details.travelnoticeinbounddate',
		'transaction.details.FVR': 'transaction.details.travelnoticeoutbounddate',
		'custom.partnerid': 'custom.confirmationid',
		'custom.internalid': 'custom.leadid',
		'custom.logintype.TA': 'custom.login.authenticationtype',
		'custom.logintype.TL': 'custom.login.type',
		'custom.surveyscore.RE': 'custom.survey.results',
		'custom.surveyscore.TG': 'custom.survey.tag',
		'custom.surveyscore.TP': 'custom.survey.type',
		'custom.whatevervariable.MSG': 'custom.message'
	};

	constructor() {}

	public init(config?: {[key: string]: any}) {
		const self: {[key: string]: any} = this;

		// Valores de configuração definidos no import da Lib
		if ('object' === typeof config) {
			config['enabled'] === undefined || (self.enabled = config['enabled']);
			config['expose'] === undefined || (self.expose = config['expose']);
			config['adobeDataLayerName'] === undefined || (self.adobeDataLayerName = config['adobeDataLayerName']);
			config['debug'] === undefined || (self.debug = config['debug']);
			config['debugColor'] === undefined || (self.debugColor = config['debugColor']);
			config['gtmContainerId'] === undefined || (self.gtmContainerId = config['gtmContainerId']);
			config['autoTrackState'] === undefined || (self.autoTrackState = config['autoTrackState']);
		}

		if (self.enabled) {

			try {

				if ( config && config['gtmContainerId'] ) {
					// Google Tag Manager
					(function(w : {[key: string]: any},d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f : {[key: string]: any}=d.getElementsByTagName(s)[0],
					j: {[key: string]: any}=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j['async']=true;j['src']=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer', self.gtmContainerId);
				} else {
					self.debug && console.log('Container do GTM não informado!');
				}

				// DataLayer padrão Adobe
				(window as any)[self.adobeDataLayerName] = (window as any)[self.adobeDataLayerName] || {};

				// DataLayer padrão Google
				(window as any)['dataLayer'] = (window as any)['dataLayer'] || [];

				// Disparo do pageView
				self.autoTrackState && self.trackState();

				self.debug && console.log('%cAnalytics - Constructor: ', self.debugColor, 'DataLayer built!');
				self.expose ? (window as any)['analyticsLib'] = self : (window as any)['analyticsLib'] = {};

				// Precisa sempre star exposto no Window para funcionamento da variáveis no GTM
				(window as any)['analyticsLib'].adobeDataLayerName = self.adobeDataLayerName;

			} catch(e) {
				self.debug && console.log('%cAnalytics - init - Error', self.debugColor, e);
			}
		}
	}

	public pageStart() {
		const self: {[key: string]: any} = this;

		try {
			self.setData('page.loadStart', (new Date).getTime());
			self.setData('custom', {});
			self.debug && console.log('%cAnalytics - pageStart: ', self.debugColor, (window as any)[self.adobeDataLayerName].page.loadStart);
		} catch(e) {
			self.debug && console.log('%cAnalytics - pageStart - Error', self.debugColor, e);
		}
	}

	public trackState(pageName?: string, custom?: object) {
		const self: {[key: string]: any} = this;

		try {
			pageName && self.setData('page.name', pageName);
			custom && self.setData('custom', custom);
			(window as any)[self.adobeDataLayerName].page.url || self.setData('page.url', document.location.href);
			self.setData('rule', 'pageLoad');
			self.setData('page.loadEnd', (new Date).getTime());
			self.setData('page.loadTime', (window as any)[self.adobeDataLayerName].page.loadEnd - (window as any)[self.adobeDataLayerName].page.loadStart);
			self.dataLayerParser();

			if (self.debug) {
				console.log('%cAnalytics - trackState - pageName: ', self.debugColor, (window as any)[self.adobeDataLayerName].page.name);
				console.log('%cAnalytics - trackState - pageUrl: ', self.debugColor, (window as any)[self.adobeDataLayerName].page.url);
				console.log('%cAnalytics - trackState - custom: ', self.debugColor, (window as any)[self.adobeDataLayerName].custom);
				console.log('%cAnalytics - trackState - loadEnd: ', self.debugColor, (window as any)[self.adobeDataLayerName].page.loadEnd);
				console.log('%cAnalytics - trackState - loadTime: ', self.debugColor, (window as any)[self.adobeDataLayerName].page.loadTime);
			}

			// Reset Data Layer
			(window as any)['google_tag_manager'] && (window as any)['google_tag_manager'][self.gtmContainerId].dataLayer.reset();

			// Trigger do GTM
			(window as any)['dataLayer'].push({'event': 'async_content_load', 'analyticsData': JSON.parse(JSON.stringify((window as any)[self.adobeDataLayerName]))});

			// Clean not Required dataLayer Variables
			self.setData('transaction', {});
			self.setData('custom', {});
			self.setData('ecommerce', {});

		} catch(e) {
			self.debug && console.log('%cAnalytics - trackState - Error', self.debugColor, e);
		}
	}

	public trackAction(custom?: {[key: string]: any}) {
		const self: {[key: string]: any} = this;

		if (self.enabled) {
			try {
				custom && self.setData('custom', custom);
				self.setData('rule', 'customLink');
				self.debug && console.log('%cAnalytics - trackAction: ', self.debugColor, (window as any)[self.adobeDataLayerName].custom);

				// Fallback para os Eventos
				var componentclicked =
					(window as any)[self.adobeDataLayerName].custom.componentclicked ||
					(window as any)[self.adobeDataLayerName].custom.ComponentClicked ||
					(window as any)[self.adobeDataLayerName].custom.actioninfo;

				if ( componentclicked ) {
					self.setData('custom.customCategory', componentclicked.match(/(MO:+)([^|]*)/)[2] +
						'|' + componentclicked.match(/(TP:+)([^|]*)/)[2] +
						'|' + componentclicked.match(/(PO:+)([^|]*)/)[2]);
					self.setData('custom.customAction', componentclicked.match(/(AC:+)([^|]*)/)[2]);
					self.setData('custom.customLabel', componentclicked.match(/(ID:+)([^|]*)/)[2]);
				}

				// Define se não é um hit de interação
				if ( custom && !custom.hasOwnProperty('noninteractionhit') && self.isNonInteractionHit(custom['customAction']) ) {
					self.setData("custom.events.noninteractionhit", 1);
				}

				// Reset Data Layer
				(window as any)['google_tag_manager'] && (window as any)['google_tag_manager'][self.gtmContainerId].dataLayer.reset();

				// Trigger do GTM
				(window as any)['dataLayer'].push({
					'event': 'async_content_load',
					'analyticsData': JSON.parse(JSON.stringify((window as any)[self.adobeDataLayerName]))
				});

				// Clean not Required dataLayer Variables
				self.setData('transaction', {});
				self.setData('custom', {});
				self.setData('ecommerce', {});

			} catch(e) {
				self.debug && console.log('%cAnalytics - trackAction - Error', self.debugColor, e);
			}
		}
	}

	/* ============================================================================= */
	/*** Funções auxiliares
  /* ============================================================================= */

	public isNonInteractionHit(action: string): any {

		/**
     * Identifica se o Evento deve ser considerado interação ou não
     * @param action: Ação do evento
     */

		const self = this;

		try {
			// Lista de ações que não são consideredados por padrão interação
			var listNonInteractionHit = [
				'Show'
			];

			return listNonInteractionHit.indexOf(action) !== -1 ? true : false;

		} catch(e) {
			self.debug && console.log('%cAnalytics - trackAction - Error', self.debugColor, e);
		}
	};

	public getTimeStamp(): any {

		/**
     * Gera um timeStamp no formado ISO string
     */

		const self = this;

		try {
			var now = new Date(),
				tzo = -now.getTimezoneOffset(),
				dif = tzo >= 0 ? '+' : '-';

			var pad = function(num: any) {
				var norm = Math.abs(Math.floor(num));
				return (norm < 10 ? '0' : '') + norm;
			};

			return now.getFullYear()
				+ '-' + pad(now.getMonth()+1)
				+ '-' + pad(now.getDate())
				+ 'T' + pad(now.getHours())
				+ ':' + pad(now.getMinutes())
				+ ':' + pad(now.getSeconds())
				+ '.' + pad(now.getMilliseconds())
				+ dif + pad(tzo / 60)
				+ ':' + pad(tzo % 60);

		} catch (e) {
			self.debug && console.log('%cAnalytics - getTimeStamp - Error', self.debugColor, e);
		}
	}

	public hasProp(obj: any, propPath: any, i?: number): any {

		/**
     * Verifica se uma propriedade ou propriedades filhas existem
     */

		const self = this;

		try {

			if (typeof(i) === 'undefined' && !(i=0)) { propPath = propPath.split('.'); }
			if (typeof(obj[propPath[i]]) !== 'undefined') {
				return (++i && i !== propPath.length) ? this.hasProp(obj[propPath[i - 1]], propPath, i) : true;
			}
			return false;

		} catch (e) {
			self.debug && console.log('%cAnalytics - hasProp - Error', self.debugColor, e);
		}
	};

	public dataLayerParser() {

		/**
     * Realiza todas conversões para deixar as implementações Adobe no formato Google configurado no GTM
     * e faz o push no dataLayer
     */

		const self : {[key: string]: any} = this;

		try {

			// Transforma o array dos eventos Adobe (chave "events") em parâmetros de um objeto (chave: valor)
			try {

				let arrayEvents: any = (window as any)[self.adobeDataLayerName].custom.events

				if (arrayEvents && arrayEvents.length > 0) {

					let objEvents: {[key: string]: any} = {};

					arrayEvents.forEach(function(e: string) {
						objEvents[e.split('=')[0]] = e.split('=')[1] || '1';
					});

					self.setData('custom.events', objEvents);
				}

			} catch (e) {
				self.debug && console.log("Ocorreu um erro na conversão dos Eventos: " + e);
			}

			// Criar novos parâmetros no dataLayer a partir dos classifications
			let classificationValue:any,
					classPairArr: string[];

			try {

				self.listClassification.forEach(function(classification: any){

					try { classificationValue = eval(self.adobeDataLayerName + '.' + classification).replace(/(^\|)|(\|$)/g,"");} catch(e) {}

					if ( classificationValue ) {
						self.setData(classification, {});

						classificationValue.split("|").map(function(classPairStr: string){
							classPairArr = classPairStr.split(":");
							self.adobeToGoole[(classification + "." + classPairArr[0])] &&
							self.setData(self.adobeToGoole[(classification + "." + classPairArr[0])], classPairArr[1]);
						});
					}
					classificationValue = undefined;
				});

			} catch(e) {
				self.debug && console.log("Ocorreu um erro ao converter as dimensões antigas com classifications: " + e);
			}

			for ( let prop in self.adobeToGoole ) {
				try {
					if ( self.adobeToGoole.hasOwnProperty(prop) ) {
						eval(self.adobeDataLayerName + '.' + prop) &&
						self.setData(self.adobeToGoole[prop], eval(self.adobeDataLayerName + '.' + prop));
					}
				} catch (e) {
					// Não ativar LOG, pois sempre vai ter um "erro" na função eval
					// console.log(e)
				}
			}

			// Fallback para antigo classification Survey Response (Feedback/Avaliação)
			if ( self.hasProp((window as any)[self.adobeDataLayerName], 'custom.surveyresponse') ) {
				try {
					self.setData('custom.survey.feedbackname', (window as any)[self.adobeDataLayerName].custom.surveyresponse.match(/(NM:+)([^|]*)/)[2]);
					self.setData('custom.survey.questionsandanswers', (window as any)[self.adobeDataLayerName].custom.surveyresponse.match(/(Q([^;]*):+)([^|]*)/)[0]);
				} catch (e) {
					self.debug && console.log("Ocorreu um erro na conversão de Survey Response: " + e);
				}
			}

			// Fallback para Google Hit Timestamp
			self.hasProp((window as any)[self.adobeDataLayerName], 'custom.hittimestamp') || self.setData('custom.hittimestamp', self.getTimeStamp());

			// Fallback para GTM Container ID
			self.hasProp((window as any)[self.adobeDataLayerName], 'site.gtmcontainerid') || self.setData('site.gtmcontainerid', self.gtmContainerId);

			// Fallback para Google Session ID
			// Ou usar outra lógica para geração do identificador
			self.hasProp((window as any)[self.adobeDataLayerName], 'visitor.sessionid') || self.setData('visitor.sessionid', Date.now() + Math.round((Math.random() * 100000000)));

		} catch (e) {
			self.debug && console.log('%cAnalytics - dataLayerParser - Error', self.debugColor, e);
		}

	};

	public setData(param: string, value: any): any {

		const self = this;

		if (self.enabled) {
			try {
				if (self.adobeDataLayerName === param) {
					(window as any)[self.adobeDataLayerName] = value;
					(window as any)[self.adobeDataLayerName] = (window as any)[self.adobeDataLayerName];
					self.debug && console.log('%cAnalytics - setData: ', self.debugColor, self.adobeDataLayerName + ' = ' , value);

					return true;
				}

				let analyticsParam = (window as any)[self.adobeDataLayerName];
				let i: number;
				const params = param.split('.');

				try {
					for (i = 0; i < params.length - 1; i++) {
						if (analyticsParam[params[i]] === undefined) { analyticsParam[params[i]] = {}; }
						analyticsParam = analyticsParam[params[i]];
					}
					analyticsParam[params[i]] = value;

					self.debug && console.log('%cAnalytics - setData: ', self.debugColor, self.adobeDataLayerName + '.' + param + ' = ' , analyticsParam[params[i]]);

				} catch (e) {}

			} catch (e) {
				self.debug && console.log('%cAnalytics - setData - Error', self.debugColor, e);
			}
		}
	}
}
