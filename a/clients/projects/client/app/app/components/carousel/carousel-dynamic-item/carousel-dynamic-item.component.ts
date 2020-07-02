import {
	Component,
	Input,
	ViewChild,
	ComponentFactoryResolver,
	OnChanges,
	SimpleChanges,
	OnDestroy,
	EventEmitter,
	Output
} from '@angular/core';
import { CarouselDynamicItemDirective } from './carousel-dynamic-item.directive';
import { ICarouselItem } from 'client/app/app/models/carousel';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-carousel-dynamic-item',
	template: `
		<ng-template mcyCarouselDynamicItem></ng-template>
	`
})
export class CarouselDynamicItemComponent implements OnChanges, OnDestroy {
	@ViewChild(CarouselDynamicItemDirective, { static: true })
	public carouselDynamicItemDirective!: CarouselDynamicItemDirective;
	public subscriptions: Subscription = new Subscription();
	@Input() public item!: ICarouselItem;
	@Input() public component!: any;
	@Output() actionEvent: EventEmitter<any> = new EventEmitter();
	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.component && changes.component.currentValue) {
			this.renderComponent();
		}
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	renderComponent() {
		const componentInstance = this.generateInstance<any>(this.component);
		if (componentInstance.actionEvent) {
			this.subscriptions.add(componentInstance.actionEvent.subscribe((event: any) => {
				this.actionEvent.emit(event);
			}));
		}
		componentInstance.data = this.item;
	}

	private generateInstance<T>(
		fieldInstanceComponent: any
	) {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
			fieldInstanceComponent);
		const viewContainerRef = this.carouselDynamicItemDirective
			.viewContainerRef;
		viewContainerRef.clear();
		const componentRef = viewContainerRef.createComponent(componentFactory);
		const componentInstance = componentRef.instance as T;
		return componentInstance;
	}
}
