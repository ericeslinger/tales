import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(value: any[], column: string = '', order = 'asc'): any[] {
    if (!value || order === '' || !order || value.length < 2) {
      return value;
    }

    const precursor = value.concat();

    if (!column || column === '') {
      precursor.sort();
    } else {
      precursor.sort((a, b) => {
        if (typeof a[column] === 'string') {
          return a[column].localeCompare(b[column]);
        } else if (a[column] < b[column]) {
          return -1;
        } else if (a[column] > b[column]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (order === 'desc') {
      return precursor.reverse();
    } else {
      return precursor;
    }
  }
}
