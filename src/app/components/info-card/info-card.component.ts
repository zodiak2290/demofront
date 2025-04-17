import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { SocialIconService } from 'src/app/services/social-icon/social-icon.service';
import { UserService } from 'src/app/services/user/user.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FIELD_LABELS } from 'src/app/shared/constants/field-labels';
@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule, DragDropModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  uid!: string;
  editing = signal<string | null>(null);
  isOwner = false;
  isLoading = true;
  guardando = false;

  private toastr = inject(ToastrService);
  private socialIconService = inject(SocialIconService);
  fields: { key: string; label: string }[] = [];

  readonly FIELD_LABELS = FIELD_LABELS;

  form: FormGroup;

  get socialLinks(): FormArray {
    return this.form.get('socialLinks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.form = this.fb.group({
      nombre: [''],
      rol: [''],
      hobbies: [''],
      nacimiento: [''],
      email: [''],
      telefono: [''],
      whatsapp: [''],
      socialLinks: this.fb.array([]),
    });

    this.uid = this.userService.getIdentity()?.uid || '';
    this.loadInfoUser();
  }

  addSocialLink() {
    if (this.isOwner) {
      this.socialLinks.push(this.fb.group({ url: [''] }));
    }
  }

  removeSocialLink(index: number) {
    if (this.isOwner) {
      this.socialLinks.removeAt(index);
    }
  }

  async save() {
    if (!this.isOwner) return;
    this.guardando = true;
    this.form.disable();

    try {
      const data = {
        ...this.form.value,
        fieldOrder: this.fields.map((f) => f.key), // ⬅️ Guardamos el orden
      };
      await this.userService.saveInfoUser(this.uid, data);
      this.toastr.success('Información guardada correctamente', 'Éxito', { timeOut: 3000 });
    } catch (err) {
      this.toastr.error('Error al guardar la información', 'Error', { timeOut: 3000 });
    } finally {
      this.guardando = false;
      this.form.enable();
    }
  }

  async loadInfoUser() {
    try {
      const data = await this.userService.getFirstInfoUser();
      if (data) {
        this.form.patchValue(data);
        this.loadSocialLinks(data.socialLinks);

        const fieldOrder = data.fieldOrder ?? Object.keys(this.FIELD_LABELS);
        this.fields = fieldOrder.map((key) => ({
          key,
          label: this.FIELD_LABELS[key],
        }));
      }

      const identity = this.userService.getIdentity();
      this.isOwner = identity?.uid === data.id;

      if (!this.isOwner) {
        this.form.disable();
      }
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  }

  loadSocialLinks(links: any[] = []) {
    this.updateSocialLinks(links ?? []);
  }

  getIcon(url: string) {
    return this.socialIconService.getIcon(url);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    if (!this.isOwner) return;

    moveItemInArray(this.socialLinks.controls, event.previousIndex, event.currentIndex);
    const reorderedLinks = this.socialLinks.controls.map((ctrl) =>
      this.fb.group({ url: [ctrl.get('url')?.value || ''] }),
    );
    this.updateSocialLinks(reorderedLinks);
  }

  private updateSocialLinks(links: any[]) {
    const arr = links.map((link) => this.fb.group({ url: [link?.url || link] }));
    this.form.setControl('socialLinks', this.fb.array(arr));
  }

  dropField(event: CdkDragDrop<any[]>) {
    if (!this.isOwner) return;
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  }

  duplicatedSampleBlock() {
    const saludo = 'Hola mundo';
    const mensaje = `${saludo} desde jscpd`;
    for (let i = 0; i < 3; i++) {
      console.log(mensaje);
    }

    const resultado = mensaje.length + i;
    console.log('Resultado:', resultado);
  }
}
