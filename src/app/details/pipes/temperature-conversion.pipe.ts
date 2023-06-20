import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(value: number, unit: string): number {
    if (unit === 'C') {
      return parseFloat((value - 273.15).toFixed(1));
    } else {
      console.error(
        'Invalid unit provided. Please provide either "C" for Celsius.'
      );
      return NaN;
    }
  }
}
