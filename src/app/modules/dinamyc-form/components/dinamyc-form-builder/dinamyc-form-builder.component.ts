import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form.-field.interface';
import { FormFieldPaletteComponent } from '../form-field-palette/form-field-palette.component';
import { FormElementComponent } from '../form-element/form-element.component';
import { DEFAULT_FORM_FIELDS } from '../../constants/form-field-palette.data';
import { FieldEditorComponent } from '../field-editor/field-editor.component';

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
    FieldEditorComponent,
  ],
  templateUrl: './dinamyc-form-builder.component.html',
  styleUrls: ['./dinamyc-form-builder.component.css'],
})
export class DinamycFormBuilderComponent {
  elements: FormField[] = [...DEFAULT_FORM_FIELDS];
  selectedField: FormField | null = null;
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

  editField(field: FormField) {
    this.selectedField = field;
  }

  saveField(field: FormField) {
    const index = this.formElements.findIndex((f) => f.id === field.id);
    if (index !== -1) this.formElements[index] = { ...field };
    this.selectedField = null;
  }

  cancelEdit() {
    this.selectedField = null;
  }
}
