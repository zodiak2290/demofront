import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SeccionHabilidadesComponent } from './seccion-habilidades.component';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { of } from 'rxjs';

describe('SeccionHabilidadesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SeccionHabilidadesComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
    }).compileComponents();
  });
 //fix this test
  it('should create the component', () => {
    const fixture = TestBed.createComponent(SeccionHabilidadesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('SeccionHabilidadesComponent', () => {
    let component: SeccionHabilidadesComponent;
    let fixture: any;
    let empresaServiceMock: any;

    beforeEach(async () => {
      empresaServiceMock = {
        getHabilidades: jasmine.createSpy('getHabilidades').and.returnValue(
          Promise.resolve({
            forEach: (callback: Function) => {
              callback({ data: () => ({ skill1: 10, skill2: 20 }) });
            },
          })
        ),
      };

      await TestBed.configureTestingModule({
        declarations: [SeccionHabilidadesComponent],
        imports: [TranslateModule.forRoot()],
        providers: [{ provide: EmpresaService, useValue: empresaServiceMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(SeccionHabilidadesComponent);
      component = fixture.componentInstance;
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should call getHabilidades on ngAfterViewInit', async () => {
      spyOn(component, 'getHabilidades').and.callThrough();
      component.ngAfterViewInit();
      expect(component.getHabilidades).toHaveBeenCalled();
    });

    it('should process data correctly', () => {
      const inputData = {
        BrandA: { Model1: 5, Model2: 10 },
        BrandB: { Model3: 15 },
      };
      const processedData = component.processData(inputData);
      expect(processedData[0].name).toBe('BrandA');
      expect(processedData[1].name).toBe('BrandB');
    });

    it('should load the chart after fetching data', async () => {
      spyOn(component, 'loadGrafica').and.callThrough();
      await component.getHabilidades();
      expect(component.loadGrafica).toHaveBeenCalled();
      expect(component.loading).toBeFalse();
    });

    it('should return correct style for getStyleBar', () => {
      const style = component.getStyleBar(50);
      expect(style).toEqual({ width: '50%' });
    });
  });

});

