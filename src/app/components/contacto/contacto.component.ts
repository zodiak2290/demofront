import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import Validation from './utils/validation';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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
    this.submitted = true;
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));    
    console.log("send")
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
