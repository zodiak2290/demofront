import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormSection } from '../dinamyc-form-builder/dinamyc-form-builder.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dinamyc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dinamyc-form.component.html',
  styleUrls: ['./dinamyc-form.component.css'],
})
export class DinamycFormComponent {
  @Input() sections: FormSection[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    this.buildForm();
  }

  private buildForm() {
    const controls: { [key: string]: any } = {};

    this.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.columns.forEach((column) => {
          column.forEach((field) => {
            controls[field.id] = [{ value: '', disabled: field.disabled }]; // por ahora sin validaciones
          });
        });
      });
    });

    this.form = this.fb.group(controls);
  }

  getValue(id: string) {
    return this.form.get(id)?.value;
  }
}
