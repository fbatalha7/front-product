import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-status-toggle',
  templateUrl: './status-toggle.html',
  styleUrls: ['./status-toggle.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StatusToggleComponent),
    multi: true
  }]
})
export class StatusToggleComponent implements ControlValueAccessor {
  value = true;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  toggle() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.value = value ?? true;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
