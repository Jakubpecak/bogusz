import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Option {
  value: number;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-single-autocomplete-input',
  templateUrl: './single-autocomplete-input.component.html',
  styleUrl: './single-autocomplete-input.component.scss'
})
export class SingleAutocompleteInputComponent implements OnInit, OnChanges {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() options: Option[] = [];
  @Input() placeholder!: string;

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.convertFormValues();
    }
  }

  ngOnInit(): void {}
  
  convertFormValues() {
    const formValues = this.control?.value;
    if (formValues) {
        const newFormValues = typeof formValues === 'string' ? parseInt(formValues, 10) : formValues;
        this.control?.patchValue(newFormValues);
    }
  }

}