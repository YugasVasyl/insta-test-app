import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber',
  standalone: true,
})
export class ShortNumberPipe implements PipeTransform {

  transform(value: number | undefined): string {
    value = value || 0;

    if (value < 1000) {
      return `${value}`;
    } else if (value < 100000) {
      return `${+(value / 1000).toFixed(1)}K`;
    } else if (value < 1000000) {
      return `${Math.floor(value / 1000)}K`;
    } else {
      return `${+(value / 1000000).toFixed(1)}M`;
    }
  }
}
