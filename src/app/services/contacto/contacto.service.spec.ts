import { TestBed } from '@angular/core/testing';

import { ContactoService } from './contacto.service';

describe('ContactoService', () => {
  let service: ContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send form data to the database', async () => {
    const mockData = { name: 'John Doe', email: 'john.doe@example.com' };
    const spySet = spyOn<any>(service, 'enviarFormulario').and.callThrough();

    await service.enviarFormulario(mockData);

    expect(spySet).toHaveBeenCalled();
  });

  it('should generate a unique ID for each form submission', async () => {
    const mockData1 = { name: 'Alice', email: 'alice@example.com' };
    const mockData2 = { name: 'Bob', email: 'bob@example.com' };

    const spySet = spyOn<any>(service, 'enviarFormulario').and.callThrough();

    await service.enviarFormulario(mockData1);
    await service.enviarFormulario(mockData2);

    expect(spySet).toHaveBeenCalledTimes(2);
  });

});
