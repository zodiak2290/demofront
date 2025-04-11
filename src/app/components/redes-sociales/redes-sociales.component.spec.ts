import { TestBed } from '@angular/core/testing';
import { ContactoComponent } from '../contacto/contacto.component'; // Asegúrate de que la ruta sea correcta
import { RedesSocialesComponent } from '../redes-sociales/redes-sociales.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


describe('RedesSocialesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactoComponent,
        RedesSocialesComponent
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
