import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import {HarnessLoader} from '@angular/cdk/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { of, throwError } from 'rxjs';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authService: AuthService;
  let loader: HarnessLoader;
  /**
   * Mock des Injections de dépendances
   */

  // Mock du Router

  const routerMock = {
    navigate: jest.fn()
  }

  // Mock du AuthService

  const authServiceMock = {
    register: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock }
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
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    router = TestBed.inject(Router)
    authService = TestBed.inject(AuthService);
    (authService.register as jest.Mock).mockReturnValue(of('test'))
  });

  afterEach(() => {
    jest.resetAllMocks();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
  * tests de la méthode submit
  */

  it('should submit with success', () => {
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
   * test d'integrations
   *
   * https://angularexperts.io/blog/material-component-testing  pour tester les composants angular material car ils ne se chargent pas de suite
   * exemple ici: https://github.com/angular/components/blob/main/src/components-examples/material/card/card-harness/card-harness-example.spec.ts
   *
   *  (await loader.getAllHarnesses(MatInputHarness)).forEach((item : any) => console.log(item))    FONCTIONNE
   *  fixture.debugElement.query(By.css('input')).nativeElement.forEach((item : any) => {console.log(item)})    NE FONCTIONNE PAS
   */
  it('should invalidate form',async () => {
    const firstNameInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'First name' }));
    const lastNameInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Last name' }));
    const emailInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Email' }));
    const passwordInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password' }));

    await firstNameInput.setValue('');
    await lastNameInput.setValue('');
    await emailInput.setValue('');
    await passwordInput.setValue('');

    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();


  });

  it('should validate form',async () => {

    const firstNameInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'First name' }));
    const lastNameInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Last name' }));
    const emailInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Email' }));
    const passwordInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Password' }));

    await firstNameInput.setValue('razzak');
    await lastNameInput.setValue('khalfallah');
    await emailInput.setValue('khalfallah.razzak@gmail.com');
    await passwordInput.setValue('abdel2020');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

  });






});
