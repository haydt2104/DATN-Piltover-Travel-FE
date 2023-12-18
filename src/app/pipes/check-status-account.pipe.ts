import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkStatusAccount',
})
export class CheckStatusAccountPipe implements PipeTransform {
  transform(value: boolean, ...args: string[]): string {
    console.log('Check status account pipe', value);
    if (!value) {
      return '<i class="bi bi-lock"></i>';
    }
    return '<i class="bi bi-unlock"></i>';
  }
}
