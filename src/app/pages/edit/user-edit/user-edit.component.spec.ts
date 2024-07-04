import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserEditComponent } from './user-edit.component';
import { AppIoService } from 'src/app/services/app-io.service';
import { ApiConnectorService } from 'src/app/services/api-connector.service';
import { MatInputModule } from '@angular/material/input';
import { EditComponent } from '../edit.component';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let appIoService: AppIoService;
  let route: ActivatedRoute;
  let router: Router;

  const routes: Routes = [
    { path: 'edit', component: EditComponent}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        MatInputModule,
      ],
      providers: [
        { provide: AppIoService, useValue: jasmine.createSpyObj('AppIoService', ['saveDelaUserData']) },
        { provide: ApiConnectorService, useValue: jasmine.createSpyObj('ApiConnectorService', ['getDelaUserData']) }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    appIoService = TestBed.inject(AppIoService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isDirty if all user info is empty', () => {
    const formInput: any = { name: '', address: '', country: '', information: '' };
    const result = component.isDirty(formInput);
    expect(result).toBe(true);
  });

  it('should apply the edit changes if the submitted user data is valid', () => {
    const userData = <NgForm>{
      value: { name: 'aValidName', address: '', country: '', information: '' }
    }
    spyOn(component, 'trackChanges');
    component.onSubmit(userData);
    expect(component.trackChanges).toHaveBeenCalledWith(userData.value);
  });

  it('should redirect to /edit if invalid user data was submitted', () => {
    const userData = <NgForm>{
      value: { name: '', address: '', country: '', information: '' }
    }
    spyOn(router, 'navigate');
    component.onSubmit(userData);
    expect(router.navigate).toHaveBeenCalledWith(['/edit']);
  });

});
