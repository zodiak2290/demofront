import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../interfaces/form.-field.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-element',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.css',
})
export class FormElementComponent implements OnInit {
  @Input() element!: FormField;
  @Input() index!: number;
  @Output() edit = new EventEmitter<FormField>();
  @Output() remove = new EventEmitter<number>();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.element.placeholder =
      this.element.placeholder || this.translate.instant(this.element.label);
  }
}
