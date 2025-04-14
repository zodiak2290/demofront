import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ContactoService } from 'src/app/services/contacto/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    subject: new UntypedFormControl(''),
    message: new UntypedFormControl(''),
  });
  submitted = false;
  enviando = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private contactoService: ContactoService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        subject: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        message: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200)
          ]
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){

    if (this.form.invalid) {
      this.toastr.error("Formulario invalido", "Error");
      return;
    }
    this.enviando = true;
    this.submitted = true;
    this.form.value.fecha = moment().utc().format();


    this.contactoService.enviarFormulario(this.form.value).then(() => {
      this.toastr.success("Mensaje enviado correctamente", "Aviso");
      this.onReset();
      this.enviando = false;
    }).catch(() => {
      this.enviando = false;
      this.toastr.error("No fue posible enviar su mensaje", "Importante");
    });

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
