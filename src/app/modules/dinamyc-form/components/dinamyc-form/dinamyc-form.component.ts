import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormSection } from '../../interfaces/form-section.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dinamyc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dinamyc-form.component.html',
  styleUrls: ['./dinamyc-form.component.css'],
})
export class DinamycFormComponent implements OnChanges {
  @Input() sections: FormSection[] = [];
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (this.sections && this.sections.length > 0) {
      this.buildForm();
    }
  }

  private buildForm() {
    const controls = this.sections.reduce(
      (acc, section) => {
        this.processSection(section, acc);
        return acc;
      },
      {} as { [key: string]: any },
    );

    this.form = this.fb.group(controls);
  }

  private processSection(section: FormSection, controls: { [key: string]: any }) {
    section.rows.forEach((row) => {
      this.processRow(row, controls);
    });
  }

  private processRow(row: any, controls: { [key: string]: any }) {
    row.columns.flat().forEach((field) => {
      this.addFieldToControls(field, controls);
    });
  }

  private addFieldToControls(field: any, controls: { [key: string]: any }) {
    controls[field.id] = [{ value: '', disabled: field.disabled }];
  }

  getValue(id: string) {
    return this.form.get(id)?.value;
  }

  getResponsiveColumnClass(columnCount: number): string {
    // Ajustes responsivos usando clases Bootstrap
    switch (columnCount) {
      case 1:
        return 'col-12';
      case 2:
        return 'col-12 col-sm-6';
      case 3:
        return 'col-12 col-sm-6 col-md-4';
      case 4:
        return 'col-12 col-sm-6 col-md-3';
      case 6:
        return 'col-6 col-md-2';
      case 12:
        return 'col-6 col-md-1';
      default:
        return 'col-12'; // fallback
    }
  }

  onButtonClick(field) {
    console.log(field);
  }
}
