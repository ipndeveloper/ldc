import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PositiveDecimalSeparatorPipe'
})
export class PositiveDecimalSeparatorPipe implements PipeTransform {

  transform(value: number, _args?: any): any {

    if (value < 0) {
        value = value * (-1);
    }

    return value.toString().replace('.', ',');
  }
}
