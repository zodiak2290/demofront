import { Component, HostListener, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form.-field.interface';
import { FormFieldPaletteComponent } from '../form-field-palette/form-field-palette.component';
import { FormElementComponent } from '../form-element/form-element.component';
import { DEFAULT_FORM_FIELDS } from '../../constants/form-field-palette.data';
import { FieldEditorComponent } from '../field-editor/field-editor.component';
import { DinamycFormComponent } from '../dinamyc-form/dinamyc-form.component';
import { FormSection } from '../../interfaces/form-section.interface';
import { FormRow } from '../../interfaces/form-row.interface';
import { MobileDetectorService } from 'src/app/services/mobile-detector/mobile-detector.service';

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
    DinamycFormComponent,
  ],
  templateUrl: './dinamyc-form-builder.component.html',
  styleUrls: ['./dinamyc-form-builder.component.css'],
})
export class DinamycFormBuilderComponent {
  elements: FormField[] = [...DEFAULT_FORM_FIELDS];
  selectedField: FormField | null = null;
  formElements: FormField[] = [];
  showPreview = false;
  sections: FormSection[] = [{ id: 'section1', title: 'Sección 1', rows: [] }];
  selectedFieldLocation: {
    sectionIndex: number;
    rowIndex: number;
    columnIndex: number;
    fieldIndex: number;
  } | null = null;

  idCounter = 0;

  get isMobile(): boolean {
    return this.mobileService.isMobile;
  }

  constructor(private mobileService: MobileDetectorService) {}

  get connectedDropListIds(): string[] {
    const ids = ['toolbox-list'];
    this.sections.forEach((section) => {
      section.rows.forEach((row) => {
        row.columns.forEach((_, i) => {
          ids.push(`${row.id}-col${i}`);
        });
      });
    });
    return ids;
  }

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

  removeElement(
    sectionIndex: number,
    rowIndex: number,
    columnIndex: number,
    fieldIndex: number,
  ): void {
    this.sections[sectionIndex].rows[rowIndex].columns[columnIndex].splice(fieldIndex, 1);
  }

  editField(
    field: FormField,
    sectionIndex: number,
    rowIndex: number,
    columnIndex: number,
    fieldIndex: number,
  ) {
    this.selectedField = field;
    this.selectedFieldLocation = { sectionIndex, rowIndex, columnIndex, fieldIndex };
  }

  saveField(updatedField: FormField) {
    if (!this.selectedFieldLocation) return;

    const { sectionIndex, rowIndex, columnIndex, fieldIndex } = this.selectedFieldLocation;
    this.sections[sectionIndex].rows[rowIndex].columns[columnIndex][fieldIndex] = {
      ...updatedField,
    };

    this.selectedField = null;
    this.selectedFieldLocation = null;
  }

  cancelEdit() {
    this.selectedField = null;
    this.selectedFieldLocation = null;
  }

  addRow(sectionIndex: number, columnCount: number): void {
    const section = this.sections[sectionIndex];
    const rowId = `row${++this.idCounter}`;
    const columns: FormField[][] = Array.from({ length: columnCount }, () => []);

    const newRow: FormRow = {
      id: rowId,
      columnCount,
      columns,
    };

    section.rows.push(newRow);
  }

  addSection() {
    const id = 'section' + ++this.idCounter;
    this.sections.push({ id, title: 'Sección ' + this.sections.length, rows: [] });
  }

  changeColumnCount(sectionIndex: number, rowIndex: number, newCount: number) {
    const row = this.sections[sectionIndex].rows[rowIndex];
    const currentFields = row.columns.flat();
    const newColumns: FormField[][] = Array.from({ length: newCount }, () => []);
    currentFields.forEach((f, i) => newColumns[i % newCount].push(f));

    row.columns = newColumns;
    row.columnCount = newCount;
  }

  onDropField(
    event: CdkDragDrop<FormField[]>,
    secIndex: number,
    rowIndex: number,
    colIndex: number,
  ) {
    const row = this.sections[secIndex].rows[rowIndex];
    const target = row.columns[colIndex];
    const prev = event.previousContainer.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(target, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'toolbox-list') {
      const cloned = {
        ...event.item.data,
        id: 'field' + ++this.idCounter,
      };
      target.splice(event.currentIndex, 0, cloned);
    } else {
      transferArrayItem(prev, target, event.previousIndex, event.currentIndex);
    }
  }

  removeRow(sectionIndex: number, rowIndex: number) {
    this.sections[sectionIndex].rows.splice(rowIndex, 1);
  }

  previewForm(showPreview: boolean) {
    this.showPreview = showPreview;
  }
}
