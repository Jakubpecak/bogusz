import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-input',
  templateUrl: './single-input.component.html',
  styleUrl: './single-input.component.scss'
})
export class SingleInputComponent {
  @Input() label!: string;
  @Input() control: any;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() hide!: boolean;

}
