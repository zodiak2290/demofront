import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface FormField {
  id?: string;
  type:
    | 'text'
    | 'select'
    | 'textarea'
    | 'button'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'email'
    | 'number'
    | 'tel'
    | 'url';
  label: string;
  clases?: string[];
  placeholder?: string;
  options?: string[];
}

@Component({
  selector: 'app-dinamyc-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './dinamyc-form-builder.component.html',
  styleUrls: ['./dinamyc-form-builder.component.css'],
})
export class DinamycFormBuilderComponent {
  elements: FormField[] = [
    { type: 'text', label: 'Texto' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'select', label: 'Select' },
    { type: 'button', label: 'Botón' },
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
