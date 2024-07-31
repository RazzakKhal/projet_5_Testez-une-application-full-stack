import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authService: AuthService;

  /**
   * Mock des Injections de dépendances
   */

  // Mock du Router

  const routerMock ={
      navigate : jest.fn()
    }

  // Mock du AuthService

  const authServiceMock = {
      register : jest.fn()
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers : [
        {provide : Router, useValue : routerMock},
        {provide : AuthService, useValue : authServiceMock}
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)
    authService = TestBed.inject(AuthService);
    (authService.register as jest.Mock).mockReturnValue(of('test'))
  });

  afterEach(()=> {
    jest.resetAllMocks();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

   /**
   * tests de la méthode submit
   */

   it('should submit with success', () =>{
    const navigateSpy = jest.spyOn(router, 'navigate')
    const loginSpy = jest.spyOn(authService, 'register');
    component.submit();
    // mock router , session service, login
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(loginSpy).toHaveBeenCalledWith(component.form.value)
  })

  it('should submit with error', () => {
    jest.spyOn(authService, 'register').mockReturnValueOnce(throwError(() => new Error('Login Error')));
    const navigateSpy = jest.spyOn(router, 'navigate')
    component.submit();

    expect(navigateSpy).not.toHaveBeenCalled()
    expect(component.onError).toBe(true)

  })


  /**
   * test validators form
   */

  it('should invalidate form', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['password'].setValue('');
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();

  });

  it('should validate form', () => {
    component.form.controls['email'].setValue('khalfallah.razzak@gmail.com');
    component.form.controls['firstName'].setValue('razzak');
    component.form.controls['lastName'].setValue('khalfallah');
    component.form.controls['password'].setValue('abdel2020');
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

  });



});
