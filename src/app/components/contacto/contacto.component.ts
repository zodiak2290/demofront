import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import Validation from './utils/validation';
import { initializeApp } from 'firebase/app';
import { getDatabase ,set, ref } from "firebase/database";

import { environment } from "../../../environments/environment";

import { v4 as uuidv4 } from 'uuid';

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

    const app = initializeApp(environment.realtimefirebase);
    const database = getDatabase(app);
    set(ref(database, 'correos/' + uuidv4()), this.form.value).then((snapshot) => {
      console.log("enviado")
      this.onReset();

    })
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
