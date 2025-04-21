import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinamycFormBuilderComponent } from 'src/app/modules/dinamyc-form/components/dinamyc-form-builder/dinamyc-form-builder.component';
@Component({
  selector: 'app-dinamyc-form-view',
  standalone: true,
  imports: [CommonModule, DinamycFormBuilderComponent],
  templateUrl: './dinamyc-form-view.component.html',
  styleUrls: ['./dinamyc-form-view.component.css'],
})
export class DinamycFormViewComponent {}
