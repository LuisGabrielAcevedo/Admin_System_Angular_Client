import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RangeLineComponent } from './range-line.component';

describe('RangeLineComponent', () => {
	let component: RangeLineComponent;
	let fixture: ComponentFixture<RangeLineComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RangeLineComponent ],
			imports: [MatInputModule,
				MatFormFieldModule]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RangeLineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
