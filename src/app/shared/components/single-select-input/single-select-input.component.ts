import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-select-input',
  templateUrl: './single-select-input.component.html',
  styleUrl: './single-select-input.component.scss'
})
export class SingleSelectInputComponent {
  @Input() label!: string;
  @Input() control: any;
  @Input() list!: number[];
  @Input() type!: string;
}
