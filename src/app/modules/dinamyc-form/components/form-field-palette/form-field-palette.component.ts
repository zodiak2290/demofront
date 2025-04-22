import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../interfaces/form.-field.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-palette',
  standalone: true,
  imports: [CommonModule, DragDropModule, TranslateModule],
  templateUrl: './form-field-palette.component.html',
  styleUrls: ['./form-field-palette.component.css'],
})
export class FormFieldPaletteComponent implements OnInit {
  @Input() elements: FormField[] = [];
  @Input() connectedDropListIds: string[] = [];
  @Output() dropped = new EventEmitter<CdkDragDrop<FormField[]>>();

  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
  }
}
