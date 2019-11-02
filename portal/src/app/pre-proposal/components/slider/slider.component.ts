/**
 * USAGE EXAMPLE
 * 
 * <app-slider
      formControlName="sliderControl"
      (change)="changeValue()"
      [maxLimit]="900"
      [minLimit]="100"
      [max]="1000"
      [step]="10"
      [formatFunction]="myFormatFunction"
      [maxLabel]="'Max Label'"
      [maxLimitLabel]="'Max Limit'"
      [minLimitLabel]="'Min Limit'"
    ></app-slider>
 */

import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  forwardRef,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as noUiSlider from 'nouislider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges {
  /**
   * Widget Element Reference (Angular ElementRef)
   */
  @ViewChild('sliderWidget')
  sliderWidget: ElementRef;

  /**
   * Widget Controler Reference (DOM Element "noUiSlider" Property)
   */
  widgetController: any = null;

  @Output() change = new EventEmitter<any>();

  @Input()
  max: number = 1000;

  /**
   * Min must alway be ZERO
   */
  // @Input()
  min: number = 0;

  @Input()
  step: number = 20;

  @Input()
  maxLimit: number = 100; // TODO set/get default max

  @Input()
  minLimit: number = 0; // TODO set/get default min

  @Input()
  formatFunction: any = (value: number): string => {
    return value.toString();
  };

  @Input()
  maxLabel: string = '';

  @Input()
  maxLimitLabel: string = '';

  @Input()
  minLimitLabel: string = '';

  @Input()
  maxLimitMobileLabel: string = '';

  @Input()
  minLimitMobileLabel: string = '';

  private options: any = {};

  private _value: number = 0;

  // Events
  onChange = (newValue: number) => {};

  writeValue(valueParam: number): void {
    let value = Number(valueParam);
    this._value = value;
    this.updateOptions(value);
    this.renderValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }

  private renderValue(value: number) {
    if (!this.widgetController) return;
    this.widgetController.set(value);
  }

  private getIndex(value: number): string {
    const index = (value - this.min) / (this.max - this.min);
    return `${index * 100}%`;
  }

  private getNextStep(value: number, step: number): number {
    return (~~(value / step) + 1) * step;
  }

  private generateSteppedValues(min, max, step) {
    let values = [min];
    let next = this.getNextStep(min, step);
    for (let i = next; i < max; i += step) {
      values.push(i);
    }
    values.push(max);
    return values;
  }

  private generateLabel(label: string, value: string, name: string): string {
    return `<span class="${name} pip-label">${label}</span><span class="${name} pip-value">${value}</span>`;
  }

  private pipFormatFunction(value: number): string {
    const formatted = this.formatFunction(value);
    if (value === this.max && this.maxLabel) {
      return this.generateLabel(this.maxLabel, formatted, 'pip-max');
    }
    if (value === this.maxLimit && this.maxLimitLabel) {
      return (
        this.generateLabel(this.maxLimitLabel, formatted, 'pip-max-limit') +
        this.generateLabel(
          this.maxLimitMobileLabel,
          formatted,
          'pip-max-limit mobile'
        )
      );
    }
    if (value === this.minLimit && this.minLimitLabel) {
      return (
        this.generateLabel(this.minLimitLabel, formatted, 'pip-min-limit') +
        this.generateLabel(
          this.minLimitMobileLabel,
          formatted,
          'pip-min-limit mobile'
        )
      );
    }
    return formatted;
  }

  private getRange(value: number = -1) {
    let values = this.generateSteppedValues(
      this.minLimit,
      this.maxLimit,
      this.step
    );
    if (value > 0) values.push(value);

    let range = {};
    for (let i = 0; i < values.length; i++) {
      let index = this.getIndex(values[i]);
      range[index] = values[i];
    }
    range['min'] = this.min;
    range['max'] = this.max;

    return range;
  }

  private updateOptions(value: number = -1) {
    let range = this.getRange(value);

    this.options = {
      connect: [true, false],
      tooltips: [
        {
          to: this.formatFunction.bind(this)
        }
      ],
      snap: true,
      pips: {
        mode: 'values',
        values: [this.minLimit, this.maxLimit, this.max],
        stepped: true,
        density: -1,
        format: {
          to: this.pipFormatFunction.bind(this)
        }
      },
      range
    };
    this.renderOptions(this.options);
  }

  private getInitialOptions() {
    this.updateOptions();
    const start = this.maxLimit;
    return { ...this.options, start: start };
  }

  private renderOptions(options: any): void {
    if (!this.widgetController) return;
    this.widgetController.updateOptions(options);
  }

  valueUpdatedHandler(values, handle, unencoded) {
    const value = unencoded[handle];
    this.updateOptions(value);
    this.onChange(value);
    this.change.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateOptions();
    this.renderValue(this._value);
  }

  validateLimits(values, handle, unencoded) {
    const value = unencoded[handle];
    if (value < this.minLimit) this.widgetController.set(this.minLimit);
    if (value > this.maxLimit) this.widgetController.set(this.maxLimit);
  }

  ngAfterViewInit(): void {
    noUiSlider.create(
      this.sliderWidget.nativeElement,
      this.getInitialOptions()
    );
    this.widgetController = (this.sliderWidget.nativeElement as any).noUiSlider;
    this.widgetController.on('change', this.valueUpdatedHandler.bind(this));
    this.widgetController.on('update', this.validateLimits.bind(this));
  }
}
