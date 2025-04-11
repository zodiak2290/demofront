import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizeDatePipe } from './localize-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('LocalizeDatePipe', () => {
  let pipe: LocalizeDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        DatePipe
      ]
    });

    const translateService = TestBed.inject(TranslateService);
    const datePipe = TestBed.inject(DatePipe);

    pipe = new LocalizeDatePipe(translateService, datePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });


});
