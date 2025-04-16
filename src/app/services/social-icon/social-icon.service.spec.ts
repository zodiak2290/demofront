import { TestBed } from '@angular/core/testing';

import { SocialIconService } from './social-icon.service';
import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

describe('SocialIconService', () => {
  let service: SocialIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return faFacebook for a Facebook URL', () => {
    const icon = service.getIcon('https://www.facebook.com/somepage');
    expect(icon).toBeTruthy();
    expect(icon).toBe(faFacebook);
  });

  it('should return faTwitter for a Twitter URL', () => {
    const icon = service.getIcon('https://www.twitter.com/somepage');
    expect(icon).toBeTruthy();
    expect(icon).toBe(faTwitter);
  });

  it('should return faLinkedin for a LinkedIn URL', () => {
    const icon = service.getIcon('https://www.linkedin.com/in/someprofile');
    expect(icon).toBeTruthy();
    expect(icon).toBe(faLinkedin);
  });

  it('should return faGithub for a GitHub URL', () => {
    const icon = service.getIcon('https://www.github.com/someuser');
    expect(icon).toBeTruthy();
    expect(icon).toBe(faGithub);
  });

  it('should return null for an unknown URL', () => {
    const icon = service.getIcon('https://www.unknown.com/somepage');
    expect(icon).toBeNull();
  });
});
