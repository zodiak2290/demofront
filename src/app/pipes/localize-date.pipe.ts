import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localizeDate',
  pure: false
})
export class LocalizeDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService, private datePipe: DatePipe) { }

  transform(value: any, pattern: string = 'mediumDate'): any {
    return this.datePipe.transform(value, pattern, undefined, this.translateService.currentLang);
  }

}
