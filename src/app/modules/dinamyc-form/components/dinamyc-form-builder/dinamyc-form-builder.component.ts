import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form.-field.interface';
import { FormFieldType } from '../../enums/form-field-type';
import { FormFieldPaletteComponent } from '../form-field-palette/form-field-palette.component';
import { FormElementComponent } from '../form-element/form-element.component';
import { DEFAULT_FORM_FIELDS } from '../../constants/form-field-palette.data';

@Component({
  selector: 'app-dinamyc-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    FormFieldPaletteComponent,
    FormElementComponent,
  ],
  templateUrl: './dinamyc-form-builder.component.html',
  styleUrls: ['./dinamyc-form-builder.component.css'],
})
export class DinamycFormBuilderComponent {
  elements: FormField[] = [...DEFAULT_FORM_FIELDS];

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
