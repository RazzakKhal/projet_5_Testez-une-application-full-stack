import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let sessionService: SessionService;
  let loader: HarnessLoader;


  /**
   * Mock des Injections de dépendances
   */

  // Mock du SessionService
  const sessionServiceMock ={
      logIn : jest.fn()
    }



  // Mock du Router

  const routerMock ={
      navigate : jest.fn()
    }

  // Mock du AuthService

  const authServiceMock = {
      login : jest.fn()
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide :SessionService, useValue : sessionServiceMock},
        {provide : Router, useValue : routerMock},
        {provide : AuthService, useValue : authServiceMock}
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    // récupération des services injectés dans mon composant
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    (authService.login as jest.Mock).mockReturnValue(of('test'))
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
    const loginSpy = jest.spyOn(authService, 'login');
    const logInSpy = jest.spyOn(sessionService, 'logIn')
    component.submit();
    // mock router , session service, login
    expect(navigateSpy).toHaveBeenCalledWith(['/sessions']);
    expect(logInSpy).toHaveBeenCalledWith('test')
    expect(loginSpy).toHaveBeenCalledWith(component.form.value)
  })

  it('should submit with error', () => {
    jest.spyOn(authService, 'login').mockReturnValueOnce(throwError(() => new Error('Login Error')));
    const navigateSpy = jest.spyOn(router, 'navigate')
    const logInSpy = jest.spyOn(sessionService, 'logIn')
    component.submit();

    expect(logInSpy).not.toHaveBeenCalled()
    expect(navigateSpy).not.toHaveBeenCalled()
    expect(component.onError).toBe(true)

  })

  /**
   * test d'integrations
   *
   * https://angularexperts.io/blog/material-component-testing  pour tester les composants angular material car ils ne se chargent pas de suite
   * exemple ici: https://github.com/angular/components/blob/main/src/components-examples/material/card/card-harness/card-harness-example.spec.ts
   */
  it('should invalidate form',async () => {

    const emailInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Email' }));
    const passwordInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password' }));


    await emailInput.setValue('');
    await passwordInput.setValue('');

    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should validate form',async () => {


    const emailInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Email' }));
    const passwordInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password' }));


    await emailInput.setValue('khalfallah.razzak@gmail.com');
    await passwordInput.setValue('abdel2020');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

  });


});
