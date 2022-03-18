import { Pipe, PipeTransform } from '@angular/core'

import * as moment from 'moment'

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform (value: number): string {
    return moment.duration(value, 'seconds').asMinutes() + 'm'
  }
}
