import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BooleanToStringPipe'
})
export class BooleanToStringPipe implements PipeTransform {
  transform(value: boolean, _args?: any): any {
    return value ? 'SI' : 'NO';
  }
}
