import { Injectable } from '@angular/core';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class SocialIconService {
  getIcon(url: string) {
    if (url.includes('facebook.com')) {
      return faFacebook;
    } else if (url.includes('twitter.com')) {
      return faTwitter;
    } else if (url.includes('linkedin.com')) {
      return faLinkedin;
    } else if (url.includes('github.com')) {
      return faGithub;
    }

    return null;
  }
}
