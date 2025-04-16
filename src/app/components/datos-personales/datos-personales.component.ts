import { Component, effect, inject, input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  data!: Record<string, any>;
  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.data = this.userService.infoUser();
    });
  }

  ngOnInit() {}


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

  get emailEscaped(): string {
    return this.data?.email?.replace('@', '&#64;') ?? '';
  }


  formatKey(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
  }
}
