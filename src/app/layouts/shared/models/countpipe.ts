import { Pipe, PipeTransform } from '@angular/core';
import { count } from 'rxjs';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  transform(input: any): any {
    return count(input);
  }
}