import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FIELD_LABELS } from 'src/app/shared/constants/field-labels';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {
  data!: Record<string, any>;
  private userService = inject(UserService);
  orderedFields: { key: string; label: string; value: string }[] = [];

  readonly FIELD_LABELS = FIELD_LABELS;

  constructor() {
    effect(() => {
      this.data = this.userService.infoUser();
      this.showData();
    });
  }

  showData() {
    if (this.data) {
      this.orderedFields = (this.data.fieldOrder || []).map((key: string) => ({
        key,
        label: this.FIELD_LABELS[key] || key,
        value: this.data[key] || ''
      }));
    }
  }


  isPrimitive(value: any): boolean {
    return ['string', 'number', 'boolean'].includes(typeof value);
  }

  isFieldVisible(key: string): boolean {
    return key !== 'socialLinks';
  }

  get whatsappUrl(): string | null {
    const num = this.data?.whatsapp?.replace(/\s+/g, '');
    return num ? `https://wa.me/52${num}` : null;
  }


  formatKey(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
  }
}
