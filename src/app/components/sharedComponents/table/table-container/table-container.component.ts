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
import { TableApplicationTypeComponent } from '../table-application-type/table-application-type.component';

@Component({
  selector: 'app-table-container',
  template: `<ng-template appTableHost></ng-template>`
})
export class TableContainerComponent implements OnInit, OnChanges {
  @ViewChild(TableDirective) adHost: TableDirective;
  @Input() componentType: TableContainerComponentType;
  @Input() componentData: TableContainerComponentData;
  // @Output() itemToOutput: EventEmitter<TableOutputItemData> = new EventEmitter();
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cData: SimpleChange = changes.componentData;
    const cType: SimpleChange = changes.componentType;
    if (cData) this.componentData = { ...cData.currentValue };
    if (cType) this.componentType = cType.currentValue;
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
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
          componentInstance.button = tableRowItem.data.button;
          componentInstance.position = tableRowItem.data.position;
        }
        break;
      }
      case TableContainerComponentType.Text: {
        const tableRowItem = new ComponentItem(TableTextComponent, this.componentData);
        const componentInstance = this.generateInstance<TableTextComponent>(tableRowItem);
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
        }
        break;
      }
      case TableContainerComponentType.ApplicationType: {
        const tableRowItem = new ComponentItem(TableApplicationTypeComponent, this.componentData);
        const componentInstance = this.generateInstance<TableApplicationTypeComponent>(tableRowItem);
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
        }
        break;
      }
      case TableContainerComponentType.Image: {
        const tableRowItem = new ComponentItem(TableImageComponent, this.componentData);
        const componentInstance = this.generateInstance<TableImageComponent>(tableRowItem);
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
        }
        break;
      }
      case TableContainerComponentType.Gallery: {
        const tableRowItem = new ComponentItem(TableGalleryComponent, this.componentData);
        const componentInstance = this.generateInstance<TableGalleryComponent>(tableRowItem);
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
          componentInstance.observable = tableRowItem.data.observable;
          componentInstance.galleryConfig = tableRowItem.data.galleryConfig;
        }
        break;
      }
      case TableContainerComponentType.Information: {
        const tableRowItem = new ComponentItem(TableItemInformationComponent, this.componentData);
        const componentInstance = this.generateInstance<TableItemInformationComponent>(tableRowItem);
        if (tableRowItem.data) {
          componentInstance.item = tableRowItem.data.item;
          componentInstance.field = tableRowItem.data.field;
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
