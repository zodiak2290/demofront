import { Component } from '@angular/core';
import { DinamycFormBuilderComponent } from '../../dinamyc-form-builder/dinamyc-form-builder.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dinamyc-form-view',
  standalone: true,
  imports: [CommonModule, DinamycFormBuilderComponent],
  templateUrl: './dinamyc-form-view.component.html',
  styleUrls: ['./dinamyc-form-view.component.css'],
})
export class DinamycFormViewComponent {}
