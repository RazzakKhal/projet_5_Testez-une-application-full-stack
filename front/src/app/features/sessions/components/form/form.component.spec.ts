import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';
import { FormComponent } from './form.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

const sessionCreated = {
  "id": 2,
  "name": "sessiontest",
  "date": "2024-08-16T00:00:00.000+00:00",
  "teacher_id": 1,
  "description": "session test pour les tu",
  "users": [],
  "createdAt": "2024-08-01T19:33:43.3327565",
  "updatedAt": "2024-08-01T19:33:43.3467375"
}


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionService : SessionService
  let sessionApiService : SessionApiService

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockRouter = {
    navigate: jest.fn(),
    url : 'create'
  }

  const mockActivateRoute = {

  }

  const mockSessionApi = {
    create: jest.fn().mockReturnValue(of(sessionCreated))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule.withConfig({ disableAnimations : true })
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService }
        ,
        { provide: SessionApiService, useValue: mockSessionApi },
        {provide : Router , useValue: mockRouter},
        {provide : ActivatedRoute, useValue : mockActivateRoute}
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    sessionApiService = TestBed.inject(SessionApiService)
    sessionService = TestBed.inject(SessionService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
   * tests sur la creation de la session
   */

  it('should create session', () => {
    const spyCreate = jest.spyOn(sessionApiService, 'create')
    component.onUpdate = false;
    component.sessionForm!.controls['name'].setValue(sessionCreated.name)
    component.sessionForm!.controls['date'].setValue(sessionCreated.date)
    component.sessionForm!.controls['description'].setValue(sessionCreated.description)
    component.sessionForm!.controls['teacher_id'].setValue(sessionCreated.teacher_id)

    fixture.detectChanges()
    expect(component.sessionForm!.valid).toBe(true)

    component.submit()
    expect(spyCreate).toBeCalledWith(component.sessionForm!.value)

  })

  it('should not valid due to an empty input',() => {
    const spyCreate = jest.spyOn(sessionApiService, 'create')
    component.onUpdate = false;
    component.sessionForm!.controls['name'].setValue('')
    component.sessionForm!.controls['date'].setValue(sessionCreated.date)
    component.sessionForm!.controls['description'].setValue(sessionCreated.description)
    component.sessionForm!.controls['teacher_id'].setValue(sessionCreated.teacher_id)

    fixture.detectChanges()
    expect(component.sessionForm!.valid).not.toBe(true)

    const saveButton : HTMLButtonElement = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;

    expect(saveButton.disabled).toBe(true)

    component.sessionForm!.controls['name'].setValue(sessionCreated.name)
    fixture.detectChanges()
    expect(saveButton.disabled).not.toBe(true)


  })
});
