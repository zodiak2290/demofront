import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form.-field.interface';
import { FormFieldType } from '../../enums/form-field-type';

@Component({
  selector: 'app-dinamyc-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './dinamyc-form-builder.component.html',
  styleUrls: ['./dinamyc-form-builder.component.css'],
})
export class DinamycFormBuilderComponent {
  elements: FormField[] = [
    { type: FormFieldType.Text, label: 'Texto' },
    { type: FormFieldType.Textarea, label: 'Área de texto' },
    { type: FormFieldType.Select, label: 'Seleccionar', options: ['Opción 1', 'Opción 2'] },
    { type: FormFieldType.Button, label: 'Botón' },
    { type: FormFieldType.Checkbox, label: 'Casilla de verificación' },
    { type: FormFieldType.Radio, label: 'Opción múltiple', options: ['Opción A', 'Opción B'] },
    { type: FormFieldType.Date, label: 'Fecha' },
    { type: FormFieldType.Email, label: 'Correo electrónico' },
    { type: FormFieldType.Number, label: 'Número' },
    { type: FormFieldType.Tel, label: 'Teléfono' },
    { type: FormFieldType.Url, label: 'Sitio web' },
  ];

  formElements: FormField[] = [];

  drop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.formElements, event.previousIndex, event.currentIndex);
    } else {
      const cloned = {
        ...event.previousContainer.data[event.previousIndex],
        id: crypto.randomUUID(),
      };
      this.formElements.push(cloned);
    }
  }

  trackByFn(index: number, item: FormField): string | number {
    return item.id || index;
  }

  removeElement(index: number): void {
    this.formElements.splice(index, 1);
  }

  selectedField: FormField | null = null;

  editField(field: FormField) {
    this.selectedField = { ...field };
  }

  saveFieldConfig() {
    if (!this.selectedField) return;
    const index = this.formElements.findIndex((el) => el.id === this.selectedField!.id);
    if (index !== -1) {
      this.formElements[index] = { ...this.selectedField };
    }
    this.selectedField = null;
  }

  cancelEdit() {
    this.selectedField = null;
  }
}
