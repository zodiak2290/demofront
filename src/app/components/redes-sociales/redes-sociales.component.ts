import { Component, effect, inject, OnInit } from '@angular/core';
import { SocialIconService } from 'src/app/services/social-icon/social-icon.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.css']
})
export class RedesSocialesComponent implements OnInit {
  data!: Record<string, any>;
  private userService = inject(UserService);
  private socialIconService = inject(SocialIconService);

  constructor() {
    effect(() => {
      this.data = this.userService.infoUser();
    });
  }

  ngOnInit() {}

  getSocialLinks(): string[] {
    return Array.isArray(this.data.socialLinks)
      ? this.data.socialLinks.map((s: any) => s.url)
      : [];
  }

  getSocialName(url: string): string {
    if (url.includes('linkedin')) return 'LinkedIn';
    if (url.includes('twitter')) return 'Twitter';
    if (url.includes('facebook')) return 'Facebook';
    if (url.includes('github')) return 'GitHub';
    return 'Link';
  }

  getIcon(url: string) {
    return this.socialIconService.getIcon(url);
  }


}

