import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignatureComponent } from './signature.component';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { SignaturesServiceMock } from 'client/app/app/services/signatures.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';

describe('SignatureComponent', () => {
	let component: SignatureComponent;
	let fixture: ComponentFixture<SignatureComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignatureComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SignaturesService, useClass: SignaturesServiceMock }
			],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignatureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
