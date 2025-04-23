import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../interfaces/form.-field.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MobileDetectorService } from 'src/app/services/mobile-detector/mobile-detector.service';

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

  constructor(private mobileService: MobileDetectorService) {}

  ngOnInit() {
    this.setMobile();
  }

  setMobile() {
    this.mobileService.isMobile$.subscribe((isMobile) => (this.isMobile = isMobile));
  }
}
