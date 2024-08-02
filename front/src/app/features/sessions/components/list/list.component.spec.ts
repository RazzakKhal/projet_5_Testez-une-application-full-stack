import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { ListComponent } from './list.component';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionService : SessionService;
  let sessionApiService : SessionApiService;

  const sessionsData = [
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
  ];

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockSessionApiService = {
    all: jest.fn().mockReturnValue(of(sessionsData))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule, RouterTestingModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sessionService = TestBed.inject(SessionService)
    sessionApiService = TestBed.inject(SessionApiService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * je vérifie que l'appel api a été fait gràce à la pipe async coté html
   * je vérifie qu'il y a bien une session (car mon mock contient une session)
   */
  it('should display sessions', () => {
    fixture.detectChanges();
    const sessions = fixture.debugElement.queryAll(By.css('.item'));
    const allSpy = jest.spyOn(sessionApiService, 'all');
    expect(allSpy).toHaveBeenCalled();
    expect(sessions.length).toEqual(1);

  })


  it('should display Create and Detail button',() => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.ml1'));
    expect(buttons.length).toEqual(3);

  })

  it('should not display Create and Detail button',() => {
    sessionService.sessionInformation!.admin = false;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.ml1'));
    expect(buttons.length).toEqual(1);

  })

});
