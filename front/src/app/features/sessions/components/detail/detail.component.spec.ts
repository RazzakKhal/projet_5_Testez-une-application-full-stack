import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';
import { MatButtonHarness } from '@angular/material/button/testing';
import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TeacherService } from 'src/app/services/teacher.service';
import { By } from '@angular/platform-browser';


const sessionData =
  {
    "id": 1,
    "name": "testttt",
    "date": "2024-07-10T00:00:00.000+00:00",
    "teacher_id": 1,
    "description": "test",
    "users": [
      2
    ],
    "createdAt": "2024-07-29T19:24:57",
    "updatedAt": "2024-07-29T19:24:58"
  }


const teacher = {
  "id": 1,
  "lastName": "DELAHAYE",
  "firstName": "Margot",
  "createdAt": "2024-07-29T14:07:32",
  "updatedAt": "2024-07-29T14:07:32"
}


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;
  let loader: HarnessLoader;
  let sessionApiService : SessionApiService;
  let teacherService : TeacherService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  const mockSessionApiService = {
    detail: jest.fn().mockReturnValue(of(sessionData))
  }

  const mockTeacherService = {
    detail: jest.fn().mockReturnValue(of(teacher))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      declarations: [DetailComponent],
      providers: [{ provide: SessionService, useValue: mockSessionService },
      { provide: SessionApiService, useValue: mockSessionApiService },
      {provide : TeacherService, useValue : mockTeacherService}


      ],
    }).compileComponents();
    service = TestBed.inject(SessionService);
    sessionApiService = TestBed.inject(SessionApiService)
    teacherService = TestBed.inject(TeacherService)
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests la session a bien été chargée
   */

  it('should have fetch sessions at intialization', () => {
    const spyDetailsSessionApi = jest.spyOn(sessionApiService, 'detail')
    const spyDetailsTeacher = jest.spyOn(teacherService, 'detail')
    expect(spyDetailsSessionApi).toHaveBeenCalled()
    expect(spyDetailsTeacher).toHaveBeenCalledWith('1')
  })

  /**
   * tests sur l'apparation du bouton Delete en fonction d'admin ou non
   */

  it('should display the delete button if isAdmin is true', async () => {
    const deleteButton = await loader.getHarness(MatButtonHarness.with({ text: /Delete/i }));
    expect(deleteButton).toBeTruthy();

    const buttonText = await deleteButton.getText();
    expect(buttonText).toContain('Delete');
  });

  it('should not display the delete button if isAdmin is false', async () => {
    component.isAdmin = false;
    fixture.detectChanges();

    const deleteButtons = await loader.getAllHarnesses(MatButtonHarness.with({ text: /Delete/i }));
    expect(deleteButtons.length).toBe(0);
  });


  /**
   * tests sur l'affichage des informations de session
   */

  it('should display session information', async () => {
    const dom = fixture.nativeElement;
    const createdDiv = fixture.debugElement.query(By.css('.created')).nativeElement;
    const updatedDiv = fixture.debugElement.query(By.css('.updated')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;
    const spans = dom.querySelectorAll('span');

    expect(spans[0].textContent).toEqual("Delete")
    expect(spans[1].textContent).toEqual("Margot DELAHAYE")
    expect(spans[2].textContent).toEqual("1 attendees")
    expect(spans[3].textContent).toEqual("July 10, 2024")
    expect(createdDiv.textContent).toContain('Create at:  July 29, 2024');
    expect(updatedDiv.textContent).toContain('Last update:  July 29, 2024');
    expect(description.textContent).toContain('test');

  })


});

