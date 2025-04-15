import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [UserService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should be created', () => {
    const service = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('should have a register method', () => {
    const service = TestBed.inject(UserService);
    expect(service.register).toBeDefined();
  });


  it('should have a getIdentity method', () => {
    const service = TestBed.inject(UserService);
    expect(service.getIdentity).toBeDefined();
  });

  it('should return identity from localStorage', () => {
    const service = TestBed.inject(UserService);
    const mockIdentity = { id: 1, name: 'Test User' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockIdentity));
    const identity = service.getIdentity();
    expect(identity).toEqual(mockIdentity);
  });

});
