import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    const height = (event.target as Window).innerHeight;
    console.log(`Window size: ${width}x${height}`);
    this.setMobile();
  }

  isMobile = false;

  ngOnInit() {
    this.setMobile();
  }

  setMobile() {
    this.isMobile = window.innerWidth < 1300;
  }
}
