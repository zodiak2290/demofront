import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../interfaces/form.-field.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-field-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.css'],
})
export class FieldEditorComponent implements OnInit, OnChanges {
  @Input() field!: FormField;
  @Output() saveChanges = new EventEmitter<FormField>();
  @Output() cancelReq = new EventEmitter<void>();

  editedField: FormField = {} as FormField;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.editedField.label = this.translate.instant(this.editedField.label);
  }

  ngOnChanges() {
    this.editedField = { ...this.field };
  }

  onSave() {
    this.saveChanges.emit(this.editedField);
  }

  onCancel() {
    this.cancelReq.emit();
  }

  updateOptions(value: string) {
    this.editedField.options = value.split(',').map((o) => o.trim());
  }
}
