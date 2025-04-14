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

  it('should format the date according to the default pattern', () => {
    const date = new Date('2023-01-01T12:00:00');;
    const formattedDate = pipe.transform(date);
    expect(formattedDate).toBe('Jan 1, 2023'); // Adjust based on your locale
  });

  it('should format the date according to the provided pattern', () => {
    const date = new Date('2023-01-01T12:00:00');;
    const pattern = 'fullDate';
    const formattedDate = pipe.transform(date, pattern);
    expect(formattedDate).toBe('Sunday, January 1, 2023'); // Adjust based on your locale
  });

  it('should return null if the value is null', () => {
    const formattedDate = pipe.transform(null);
    expect(formattedDate).toBeNull();
  });

  it('should return null if the value is undefined', () => {
    const formattedDate = pipe.transform(undefined);
    expect(formattedDate).toBeNull();
  });


});
