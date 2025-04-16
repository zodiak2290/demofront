import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  uid!: string;
  editing = signal<string | null>(null);
  isOwner = false;
  isLoading = true;
  guardando = false;

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  private toastr = inject(ToastrService);
  fields = [
    { key: 'nombre', label: 'Nombre completo' },
    { key: 'rol', label: 'Rol profesional' },
    { key: 'hobbies', label: 'Hobbies' },
    { key: 'nacimiento', label: 'Fecha y lugar de nacimiento' },
    { key: 'email', label: 'Email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'whatsapp', label: 'Whatsapp' }
  ];

  form: FormGroup;

  get socialLinks(): FormArray {
    return this.form.get('socialLinks') as FormArray;
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      nombre: [''],
      rol: [''],
      hobbies: [''],
      nacimiento: [''],
      email: [''],
      telefono: [''],
      whatsapp: [''],
      socialLinks: this.fb.array([])
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
      const data = this.form.value;
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
      }

      const identity = this.userService.getIdentity();
      this.isOwner = identity?.uid === this.uid;

      if (!this.isOwner) {
        this.form.disable();
      }
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  }

  loadSocialLinks(links: any[] = []) {
    const arr = links.map(link => this.fb.group({ url: [link.url || link] }));
    this.form.setControl('socialLinks', this.fb.array(arr));
  }

  getIcon(url: string) {
    if (url.includes('facebook.com')) {
      return this.faFacebook;
    } else if (url.includes('twitter.com')) {
      return this.faTwitter;
    } else if (url.includes('linkedin.com')) {
      return this.faLinkedin;
    } else if( url.includes('github.com') ){
      return this.faGithub;
    }

    return null;
  }


}
