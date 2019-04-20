import {
  Component,
  OnInit, Input, ViewChild, ComponentFactoryResolver, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter
} from '@angular/core';
import { TableContainerComponentData, TableContainerComponentType, TableOutputItemData } from '../table.interfaces';
import { TableDirective } from './table-container.directive';
import { ComponentItem } from './table-container.component.item';
import { TableTextComponent } from '../table-text/table-text.component';
import { TableButtonComponent } from '../table-button/table-button.component';
import { TableGalleryComponent } from '../table-gallery/table-gallery.component';
import { TableImageComponent } from '../table-image/table-image.component';
import { TableItemInformationComponent } from '../table-item-information/table-item-information.component';

@Component({
  selector: 'app-table-container',
  template: `<ng-template appTableHost></ng-template>`
})
export class TableContainerComponent implements OnInit, OnChanges {
  @ViewChild(TableDirective) adHost: TableDirective;
  @Input() componentType: TableContainerComponentType;
  @Input() componentData: TableContainerComponentData;
  @Output() openModal = new EventEmitter();
  @Output() itemToOutput: EventEmitter<TableOutputItemData> = new EventEmitter();
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
    this.componentType = cType.currentValue;
    this.loadComponent();
  }

  loadComponent() {
    switch (this.componentType) {
      case TableContainerComponentType.Search: {
        break;
      }
      case TableContainerComponentType.Button: {
        const tableRowItem = new ComponentItem(TableButtonComponent, this.componentData);
        const componentInstance = this.generateInstance<TableButtonComponent>(tableRowItem);
        if (tableRowItem.data.inputData) {
          componentInstance.item = tableRowItem.data.inputData.item;
          componentInstance.field = tableRowItem.data.inputData.field;
          componentInstance.buttonData = tableRowItem.data.inputData.button;
          componentInstance.position = tableRowItem.data.inputData.position;
        }
        componentInstance.openModal.subscribe(data => {
          this.openModal.emit(data);
        });
        componentInstance.itemToOutput.subscribe(data => {
          this.itemToOutput.emit(data);
        });
        break;
      }
      case TableContainerComponentType.Text: {
        const tableRowItem = new ComponentItem(TableTextComponent, this.componentData);
        const componentInstance = this.generateInstance<TableTextComponent>(tableRowItem);
        if (tableRowItem.data.inputData) {
          componentInstance.item = tableRowItem.data.inputData.item;
          componentInstance.field = tableRowItem.data.inputData.field;
        }
        break;
      }
      case TableContainerComponentType.Image: {
        const tableRowItem = new ComponentItem(TableImageComponent, this.componentData);
        const componentInstance = this.generateInstance<TableImageComponent>(tableRowItem);
        if (tableRowItem.data.inputData) {
          componentInstance.item = tableRowItem.data.inputData.item;
          componentInstance.field = tableRowItem.data.inputData.field;
        }
        break;
      }
      case TableContainerComponentType.Gallery: {
        const tableRowItem = new ComponentItem(TableGalleryComponent, this.componentData);
        const componentInstance = this.generateInstance<TableGalleryComponent>(tableRowItem);
        if (tableRowItem.data.inputData) {
          componentInstance.item = tableRowItem.data.inputData.item;
          componentInstance.field = tableRowItem.data.inputData.field;
        }
        break;
      }
      case TableContainerComponentType.Information: {
        const tableRowItem = new ComponentItem(TableItemInformationComponent, this.componentData);
        const componentInstance = this.generateInstance<TableItemInformationComponent>(tableRowItem);
        if (tableRowItem.data.inputData) {
          componentInstance.item = tableRowItem.data.inputData.item;
          componentInstance.field = tableRowItem.data.inputData.field;
        }
        break;
      }
    }
  }

  private generateInstance<T>(componentItem: ComponentItem) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <T>componentRef.instance;
    return componentInstance;
  }
}
