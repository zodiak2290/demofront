import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Se importa el módulo que provee HttpClient en modo testing
      imports: [HttpClientTestingModule],
      providers: [UserService]
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

  it('should have a signUp method', () => {
    const service = TestBed.inject(UserService);
    expect(service.signUp).toBeDefined();
  });

  it('should have a getIdentity method', () => {
    const service = TestBed.inject(UserService);
    expect(service.getIdentity).toBeDefined();
  });

  it('should have a getToken method', () => {
    const service = TestBed.inject(UserService);
    expect(service.getToken).toBeDefined();
  });

  it('should call postUser when register is invoked', () => {
    const service = TestBed.inject(UserService);
    const spy = spyOn(service, 'postUser').and.callThrough();
    const user = { name: 'Test User' } as any;
    service.register(user);
    expect(spy).toHaveBeenCalledWith('registrar', user);
  });

  it('should call postUser when signUp is invoked', () => {
    const service = TestBed.inject(UserService);
    const spy = spyOn(service, 'postUser').and.callThrough();
    const user = { name: 'Test User' } as any;
    service.signUp(user);
    expect(spy).toHaveBeenCalledWith('login', user);
  });

  it('should return identity from localStorage', () => {
    const service = TestBed.inject(UserService);
    const mockIdentity = { id: 1, name: 'Test User' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockIdentity));
    const identity = service.getIdentity();
    expect(identity).toEqual(mockIdentity);
  });

  it('should return token from localStorage', () => {
    const service = TestBed.inject(UserService);
    const mockToken = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    const token = service.getToken();
    expect(token).toEqual(mockToken);
  });
});
