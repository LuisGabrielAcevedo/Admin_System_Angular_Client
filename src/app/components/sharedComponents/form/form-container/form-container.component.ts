import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnChanges,
    SimpleChanges,
    SimpleChange,
    Output,
    EventEmitter
} from '@angular/core';
import { FormDirective } from './form-container.directive';
import { FormContainerComponentType, FormContainerComponentData } from '../form.interfaces';
import { ComponentItem } from './form-container.component.item';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
    selector: 'app-form-container',
    template: `<ng-template appFormHost></ng-template>`
})
export class FormContainerComponent implements OnInit, OnChanges {
    @ViewChild(FormDirective) adHostForm: FormDirective;
    @Input() componentType: FormContainerComponentType;
    @Input() componentData: FormContainerComponentData;
    @Output() changeValue: EventEmitter<object> = new EventEmitter();
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.loadComponent();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const cData: SimpleChange = changes.componentData;
        const cType: SimpleChange = changes.componentType;
        if (cData) {
        this.componentData = Object.assign(cData.currentValue);
        }
        if (cType) {
            this.componentType = cType.currentValue;
        }
        this.loadComponent();
    }

    loadComponent() {
        switch (this.componentType) {
            case FormContainerComponentType.Input: {
                const tableRowItem = new ComponentItem(FormInputComponent, this.componentData);
                const componentInstance = this.generateInstance<FormInputComponent>(tableRowItem);
                if (tableRowItem.data.inputData) {
                    componentInstance.placeholder = tableRowItem.data.inputData.placeholder;
                    componentInstance.inputValue = tableRowItem.data.inputData.value;
                    componentInstance.field = tableRowItem.data.inputData.field;
                }
                componentInstance.changeValue.subscribe(data => {
                    this.changeValue.emit(data);
                });
                break;
            }
        }
    }

    private generateInstance<T>(componentItem: ComponentItem) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentItem.component);
        const viewContainerRef = this.adHostForm.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = <T>componentRef.instance;
        return componentInstance;
    }
}
