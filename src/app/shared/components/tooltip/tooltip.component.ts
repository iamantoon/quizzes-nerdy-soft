import {Component, input} from '@angular/core';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  text = input.required<string>();
  position = input<TooltipPosition>('above');
}
