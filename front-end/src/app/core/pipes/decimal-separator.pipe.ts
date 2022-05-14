import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DecimalSeparatorPipe'
})
export class DecimalSeparatorPipe implements PipeTransform {

  transform(value: number, _args?: any): any {
    return value.toString().replace('.', ',');
  }
}
