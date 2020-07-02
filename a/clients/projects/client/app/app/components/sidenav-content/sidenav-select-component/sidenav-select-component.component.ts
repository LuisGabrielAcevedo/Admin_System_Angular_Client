import {
	Component,
	OnInit,
	Input,
	ViewChild,
	ComponentFactoryResolver,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { SidenavSelectComponentDirective } from './sidenav-select-component.directive';
import { ISidenavStep } from 'client/app/app/models/sidenav';

export class SidenavContentDynamicComponent {
	constructor(public step: ISidenavStep) {}
}

@Component({
	selector: 'mcy-sidenav-select-component',
	template: `
		<ng-template mcySidenavSelectComponent></ng-template>
	`
})
export class SidenavSelectComponent implements OnInit, OnChanges {
	@ViewChild(SidenavSelectComponentDirective, { static: true })
	public sidenavSelectComponentDirective!: SidenavSelectComponentDirective;
	@Input() public step!: ISidenavStep;
	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.step && changes.step.currentValue) {
			this.renderComponent();
		}
	}

	renderComponent() {
		const dynamicComponent: SidenavContentDynamicComponent = new SidenavContentDynamicComponent(
			this.step
		);
		const componentInstance = this.generateInstance<any>(dynamicComponent);
		componentInstance.data = dynamicComponent.step.data;
	}

	private generateInstance<T>(
		fieldInstanceComponent: SidenavContentDynamicComponent
	) {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
			fieldInstanceComponent.step.component
		);
		const viewContainerRef = this.sidenavSelectComponentDirective
			.viewContainerRef;
		viewContainerRef.clear();
		const componentRef = viewContainerRef.createComponent(componentFactory);
		const componentInstance = componentRef.instance as T;
		return componentInstance;
	}
}
