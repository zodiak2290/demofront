import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { of } from 'rxjs';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

// Pipe simulado para localizeDate
@Pipe({ name: 'localizeDate' })
class MockLocalizeDatePipe implements PipeTransform {
  transform(value: any): string {
    return 'fecha-formateada';
  }
}

// Servicio mock para EmpresaService
class MockEmpresaService {
  getEmpresasAsync() {
    const mockSnapshot = {
      forEach: (cb: Function) => {
        cb({
          data: () => ({
            id: 2,
            nombre: 'Empresa Mock',
            fechaInicial: { toDate: () => new Date('2020-01-01') },
            fechaFin: { toDate: () => new Date('2021-01-01') },
            descripcionEmpleo: 'Desarrollador Angular',
            tecnologias: ['Angular', 'Firebase']
          })
        });
      }
    };
    return Promise.resolve(mockSnapshot);
  }
}
describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineComponent, MockLocalizeDatePipe],
      providers: [{ provide: EmpresaService, useClass: MockEmpresaService }]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    await component.ngOnInit(); // wait for data to load
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display at least one company', () => {
    const timelineElements = fixture.debugElement.queryAll(By.css('.timeline'));
    expect(timelineElements.length).toBeGreaterThan(0);
  });

  it('should display the company name and job description', () => {
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).toContain('Empresa Mock');
    expect(content).toContain('Desarrollador Angular');
  });

  it('should display the formatted date using the pipe', () => {
    const span = fixture.debugElement.query(By.css('.year'));
    expect(span.nativeElement.textContent).toContain('fecha-formateada');
  });

  it('should display technologies if they are present', () => {
    const content = fixture.debugElement.nativeElement.textContent;
    expect(content).toContain('Angular');
    expect(content).toContain('Firebase');
  });
});
