import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect } from '@jest/globals';
import { MatCardHarness } from '@angular/material/card/testing';
import { MeComponent } from './me.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatButtonHarness } from '@angular/material/button/testing';
import { ActivatedRoute, Router } from '@angular/router';


const user = {
  "id": 1,
  "email": "yoga@studio.com",
  "lastName": "Admin",
  "firstName": "Admin",
  "admin": true,
  "createdAt": "2024-07-29T14:07:32",
  "updatedAt": "2024-07-29T14:07:32"
}

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService : UserService
  let loader : HarnessLoader
  let router: Router;
  let matSnackBar : MatSnackBar;
  let sessionService : SessionService

  const mockActivatedRoute = {}

  const mockRouter = {
    navigate: jest.fn()
  }

  const mockMatSnackBar = {
    open : jest.fn()
  }

  const mockUserService = {
    getById : jest.fn().mockReturnValue(of(user)),
    delete : jest.fn().mockReturnValue(of({}))
  }

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut : jest.fn()
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide : UserService, useValue : mockUserService},
        { provide : MatSnackBar, useValue : mockMatSnackBar},
        { provide : Router , useValue : mockRouter},
        { provide : ActivatedRoute, useValue : mockActivatedRoute}


      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    userService = TestBed.inject(UserService)
    sessionService = TestBed.inject(SessionService)
    component = fixture.componentInstance;
    matSnackBar = TestBed.inject(MatSnackBar)
    router = TestBed.inject(Router)
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  /**
   * tests sur l'affichage de l'utilisateur
   */

  it('should display user informations',async () => {
    await loader.getHarness(MatCardHarness)
    const paragraphs : DebugElement[] = fixture.debugElement.queryAll(By.css('p'))

    const nameText =  paragraphs[0].nativeElement.textContent;
    const emailText = paragraphs[1].nativeElement.textContent;
    const adminText = paragraphs[2].nativeElement.textContent;
    const createdAtText = paragraphs[paragraphs.length - 2].nativeElement.textContent;
    const updatedAtText = paragraphs[paragraphs.length - 1].nativeElement.textContent;


    expect(nameText).toContain("Name: Admin ADMIN")
    expect(adminText).toContain("You are admin")
    expect(emailText).toContain("Email: yoga@studio.com")
    expect(updatedAtText).toContain("Last update:  July 29, 2024")
    expect(createdAtText).toContain("Create at:  July 29, 2024")
  })


  /**
   * tests sur la suppression de l'utilisateur
   */
  it('should delete user',async () => {
    component.user!.admin = false;
    fixture.detectChanges()
    const spyDelete = jest.spyOn(userService, 'delete')
    const spyNavigate = jest.spyOn(router, 'navigate')
    const spyOpen = jest.spyOn(matSnackBar, 'open')
    const spyLogOut = jest.spyOn(sessionService,'logOut')
    const deleteButton =await loader.getHarness(MatButtonHarness.with({ selector: 'button[color="warn"]' }))
    await deleteButton.click()

    expect(spyDelete).toHaveBeenCalledWith("1")
    expect(spyOpen).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 })
    expect(spyNavigate).toHaveBeenCalledWith(['/'])
    expect(spyLogOut).toHaveBeenCalled()

  })

});
